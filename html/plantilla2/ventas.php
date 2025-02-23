<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT v.id, v.fecha, p.nombre AS producto, v.precio_venta, v.cantidad 
                                FROM ventas v 
                                JOIN productos p ON v.producto_id = p.id");
        $ventas = [];
        while ($row = $result->fetch_assoc()) {
            $ventas[] = $row;
        }
        echo json_encode($ventas);
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        
        $producto_id = $data['producto_id'];
        $precio_venta = $data['precio_venta'];
        $cantidad_vendida = $data['cantidad'];
        $precio_id = $data['precio_id']; // Precio seleccionado

        // Obtener si el producto se compra por quintales
        $stmt = $conn->prepare("SELECT quintales FROM productos WHERE id = ?");
        $stmt->bind_param("i", $producto_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $producto = $result->fetch_assoc();

        if ($producto) {
            if ($producto['quintales']) {
                // Obtener la conversión según la tabla precios
                $stmt = $conn->prepare("SELECT concepto, valor FROM precios WHERE id = ?");
                $stmt->bind_param("i", $precio_id);
                $stmt->execute();
                $result = $stmt->get_result();
                $precio = $result->fetch_assoc();

                if ($precio) {
                    // Conversión a quintales
                    $concepto = strtolower($precio['concepto']);
                    $conversion = 0;

                    if ($concepto === "libra") {
                        $conversion = $cantidad_vendida / 100; // 100 libras = 1 quintal
                    } elseif ($concepto === "arroba") {
                        $conversion = $cantidad_vendida / 4; // 4 arrobas = 1 quintal
                    } else {
                        $conversion = $cantidad_vendida / $precio['valor']; // Conversión según la base de datos
                    }
                } else {
                    echo json_encode(["error" => "Precio no encontrado"]);
                    exit;
                }
            } else {
                $conversion = $cantidad_vendida; // No hay conversión si no se compra por quintales
            }

            // Verificar stock
            $stmt = $conn->prepare("SELECT stock FROM productos WHERE id = ?");
            $stmt->bind_param("i", $producto_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $stock = $result->fetch_assoc()['stock'];

            if ($stock >= $conversion) {
                // Registrar la venta
                $stmt = $conn->prepare("INSERT INTO ventas (producto_id, precio_venta, cantidad) VALUES (?, ?, ?)");
                $stmt->bind_param("idf", $producto_id, $precio_venta, $cantidad_vendida);
                $stmt->execute();

                // Actualizar stock
                $stmt = $conn->prepare("UPDATE productos SET stock = stock - ? WHERE id = ?");
                $stmt->bind_param("di", $conversion, $producto_id);
                $stmt->execute();

                echo json_encode(["message" => "Venta registrada"]);
            } else {
                echo json_encode(["error" => "Stock insuficiente"]);
            }
        }
        break;
}

$conn->close();
?>
