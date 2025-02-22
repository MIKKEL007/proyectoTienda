<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Obtener todos los productos con su categoría
        $sql = "SELECT p.id, p.nombre, p.stock, c.nombre AS categoria_nombre
        FROM productos p
        JOIN categorias c ON p.categoria_id = c.id";
        $result = $conn->query($sql);

        // $result = $conn->query("SELECT * FROM productos");
        $productos = [];
        while ($row = $result->fetch_assoc()) {
            $productos[] = $row;
        }
        echo json_encode($productos);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $nombre = $data['nombre'];
        $categoria_id = $data['categoria_id'];
        $quintales = $data['quintales'];

        $stmt = $conn->prepare("INSERT INTO productos (nombre, categoria_id, quintales) VALUES (?, ?, ?)");
        $stmt->bind_param("sii", $nombre, $categoria_id, $quintales);
        $stmt->execute();

        echo json_encode(["message" => "Producto creado"]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $nombre = $data['nombre'];
        $categoria_id = $data['categoria_id'];
        $quintales = $data['quintales'];

        $stmt = $conn->prepare("UPDATE productos SET nombre = ?, categoria_id = ?, quintales = ? WHERE id = ?");
        $stmt->bind_param("siii", $nombre, $categoria_id, $quintales, $id);
        $stmt->execute();

        echo json_encode(["message" => "Producto actualizado"]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];

        $stmt = $conn->prepare("DELETE FROM productos WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        echo json_encode(["message" => "Producto eliminado"]);
        break;
}

$conn->close();
?>
