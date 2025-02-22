<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT c.id, c.fecha, p.nombre AS producto, c.precio_compra, c.cantidad 
                                FROM compras c 
                                JOIN productos p ON c.producto_id = p.id");
        $compras = [];
        while ($row = $result->fetch_assoc()) {
            $compras[] = $row;
        }
        echo json_encode($compras);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Insertar compra
        $stmt = $conn->prepare("INSERT INTO compras (producto_id,fecha, precio_compra, cantidad) VALUES (?,?, ?, ?)");
        $stmt->bind_param("isdi", $data['producto_id'], $data['fecha'], $data['precio_compra'], $data['cantidad']);
        $stmt->execute();

        // Actualizar stock del producto
        $stmt = $conn->prepare("UPDATE productos SET stock = stock + ? WHERE id = ?");
        $stmt->bind_param("di", $data['cantidad'], $data['producto_id']);
        $stmt->execute();

        echo json_encode(["message" => "Compra registrada"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];

        // Obtener la cantidad comprada antes de eliminar
        $stmt = $conn->prepare("SELECT producto_id, cantidad FROM compras WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $compra = $result->fetch_assoc();

        if ($compra) {
            // Restar del stock
            $stmt = $conn->prepare("UPDATE productos SET stock = stock - ? WHERE id = ?");
            $stmt->bind_param("di", $compra['cantidad'], $compra['producto_id']);
            $stmt->execute();

            // Eliminar la compra
            $stmt = $conn->prepare("DELETE FROM compras WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
        }

        echo json_encode(["message" => "Compra eliminada"]);
        break;
}

$conn->close();
?>
