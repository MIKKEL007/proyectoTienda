<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        if (isset($_GET['id'])) {
            // Obtener un solo producto por ID
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT * FROM categorias WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            echo json_encode($result->fetch_assoc());
        } else {
        $result = $conn->query("SELECT * FROM categorias");
        $categorias = [];
        while ($row = $result->fetch_assoc()) {
            $categorias[] = $row;
        }
        echo json_encode($categorias);
    }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $nombre = $data['nombre'];

        $stmt = $conn->prepare("INSERT INTO categorias (nombre) VALUES (?)");
        $stmt->bind_param("s", $nombre);
        $stmt->execute();

        echo json_encode(["message" => "Categoría creada"]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $nombre = $data['nombre'];

        $stmt = $conn->prepare("UPDATE categorias SET nombre = ? WHERE id = ?");
        $stmt->bind_param("si", $nombre, $id);
        $stmt->execute();

        echo json_encode(["message" => "Categoría actualizada"]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];

        $stmt = $conn->prepare("DELETE FROM categorias WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        echo json_encode(["message" => "Categoría eliminada"]);
        break;
}

$conn->close();
?>
