<?php
// include 'db.php';

// $method = $_SERVER['REQUEST_METHOD'];

// switch ($method) {
//     case 'GET':
//         // Obtener todos los productos con su categoría
//         $sql = "SELECT p.id, p.nombre, p.stock, c.nombre AS categoria_nombre
//         FROM productos p
//         JOIN categorias c ON p.categoria_id = c.id";
//         $result = $conn->query($sql);

//         // $result = $conn->query("SELECT * FROM productos");
//         $productos = [];
//         while ($row = $result->fetch_assoc()) {
//             $productos[] = $row;
//         }
//         echo json_encode($productos);
//         break;

//     case 'POST':
//         $data = json_decode(file_get_contents("php://input"), true);
//         $nombre = $data['nombre'];
//         $categoria_id = $data['categoria_id'];
//         $quintales = $data['quintales'];

//         $stmt = $conn->prepare("INSERT INTO productos (nombre, categoria_id, quintales) VALUES (?, ?, ?)");
//         $stmt->bind_param("sii", $nombre, $categoria_id, $quintales);
//         $stmt->execute();

//         echo json_encode(["message" => "Producto creado"]);
//         break;

//     case 'PUT':
//         $data = json_decode(file_get_contents("php://input"), true);
//         $id = $data['id'];
//         $nombre = $data['nombre'];
//         $categoria_id = $data['categoria_id'];
//         $quintales = $data['quintales'];

//         $stmt = $conn->prepare("UPDATE productos SET nombre = ?, categoria_id = ?, quintales = ? WHERE id = ?");
//         $stmt->bind_param("siii", $nombre, $categoria_id, $quintales, $id);
//         $stmt->execute();

//         echo json_encode(["message" => "Producto actualizado"]);
//         break;

//     case 'DELETE':
//         $data = json_decode(file_get_contents("php://input"), true);
//         $id = $data['id'];

//         $stmt = $conn->prepare("DELETE FROM productos WHERE id = ?");
//         $stmt->bind_param("i", $id);
//         $stmt->execute();

//         echo json_encode(["message" => "Producto eliminado"]);
//         break;
// }

// $conn->close();
?> 


<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Obtener un solo producto por ID
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT id, nombre, categoria_id, quintales FROM productos WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            echo json_encode($result->fetch_assoc());
        } else {
            // Obtener todos los productos con su categoría
            $sql = "SELECT p.id, p.nombre, p.stock, p.quintales, c.nombre AS categoria_nombre, p.categoria_id
                    FROM productos p
                    JOIN categorias c ON p.categoria_id = c.id";
            $result = $conn->query($sql);

            $productos = [];
            while ($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
            echo json_encode($productos);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['nombre'], $data['categoria_id'], $data['quintales'])) {
            echo json_encode(["error" => "Datos incompletos"]);
            http_response_code(400);
            exit;
        }

        $nombre = $data['nombre'];
        $categoria_id = intval($data['categoria_id']);
        $quintales = intval($data['quintales']);

        $stmt = $conn->prepare("INSERT INTO productos (nombre, categoria_id, quintales, stock) VALUES (?, ?, ?, 0)");
        $stmt->bind_param("sii", $nombre, $categoria_id, $quintales);
        $stmt->execute();

        echo json_encode(["message" => "Producto creado"]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id'], $data['nombre'], $data['categoria_id'])) {
            echo json_encode(["error" => "Datos incompletos"]);
            http_response_code(400);
            exit;
        }

        $id = intval($data['id']);
        $nombre = $data['nombre'];
        $categoria_id = intval($data['categoria_id']);

        $stmt = $conn->prepare("UPDATE productos SET nombre = ?, categoria_id = ? WHERE id = ?");
        $stmt->bind_param("sii", $nombre, $categoria_id, $id);
        $stmt->execute();

        echo json_encode(["message" => "Producto actualizado"]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id'])) {
            echo json_encode(["error" => "ID no proporcionado"]);
            http_response_code(400);
            exit;
        }

        $id = intval($data['id']);

        $stmt = $conn->prepare("DELETE FROM productos WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        echo json_encode(["message" => "Producto eliminado"]);
        break;
}

$conn->close();
?>

