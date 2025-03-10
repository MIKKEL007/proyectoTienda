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
            $fecha = $data['fecha'];
            $cantidad_vendida = $data['cantidad'];
            $precio_id = $data['precio_id']; // Precio seleccionado
    
            // Obtener si el producto se compra por quintales y el stock actual
            $stmt = $conn->prepare("SELECT quintales, stock FROM productos WHERE id = ?");
            $stmt->bind_param("i", $producto_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $producto = $result->fetch_assoc();
    
            if (!$producto) {
                echo json_encode(["error" => "Producto no encontrado"]);
                exit;
            }
    
            $quintales = $producto['quintales'];
            $stock = $producto['stock'];
            $conversion = $cantidad_vendida; // Por defecto, si no es por quintales, la conversión es 1:1
    
            // Obtener el precio de la tabla precios
            $stmt = $conn->prepare("SELECT concepto, valor FROM precios WHERE id = ?");
            $stmt->bind_param("i", $precio_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $precio = $result->fetch_assoc();
    
            if (!$precio) {
                echo json_encode(["error" => "Precio no encontrado"]);
                exit;
            }
    
            if ($quintales) {
                // Si el producto se compra por quintales, hacer la conversión
                $concepto = strtolower($precio['concepto']);
    
                if ($concepto === "libra") {
                    $conversion = $cantidad_vendida / 100; // 100 libras = 1 quintal
                } elseif ($concepto === "arroba") {
                    $conversion = $cantidad_vendida / 4; // 4 arrobas = 1 quintal
                }
            } 
            
            // Calcular el precio de la venta
            $precio_venta = $cantidad_vendida * $precio['valor'];
    
            if ($stock >= $conversion) {
                // Registrar la venta
                $stmt = $conn->prepare("INSERT INTO ventas (producto_id, precio_venta, cantidad, fecha) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("idds", $producto_id, $precio_venta, $cantidad_vendida, $fecha);
                $stmt->execute();
    
                // Actualizar stock
                $stmt = $conn->prepare("UPDATE productos SET stock = stock - ? WHERE id = ?");
                $stmt->bind_param("di", $conversion, $producto_id);
                $stmt->execute();
                
                echo json_encode(["message" => "Venta registrada", "success" => true]);
            } else {
                echo json_encode(["error" => "Stock insuficiente"]);
            }
            break;
    }
    

$conn->close();
?>
