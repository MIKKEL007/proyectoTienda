<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':

        if (isset($_GET['id'])) {
            // Obtener un solo producto por ID
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT 
                precios.id AS precio_id, 
                precios.concepto, 
                precios.valor, 
                productos.nombre AS producto_nombre,
                productos.id AS producto_ids
            FROM precios 
            JOIN productos ON precios.producto_id = productos.id  WHERE precios.id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            echo json_encode($result->fetch_assoc());
        } else {
        $sql = "
            SELECT 
                precios.id AS precio_id, 
                precios.concepto, 
                precios.valor, 
                productos.nombre AS producto_nombre
            FROM precios
            JOIN productos ON precios.producto_id = productos.id
        ";

        $result = $conn->query($sql);
        // $result = $conn->query("SELECT * FROM precios");
        $precios = [];
        while ($row = $result->fetch_assoc()) {
            $precios[] = $row;
        }
        echo json_encode($precios);

    }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $producto_id = $data['producto_id'];
        $concepto = $data['concepto'];
        $valor = $data['valor'];

        $stmt = $conn->prepare("INSERT INTO precios (producto_id, concepto, valor) VALUES (?, ?, ?)");
        $stmt->bind_param("isd", $producto_id, $concepto, $valor);
        $stmt->execute();

        echo json_encode(["message" => "Precio creado","success" => true]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $concepto = $data['concepto'];
        $valor = $data['valor'];

        $stmt = $conn->prepare("UPDATE precios SET concepto = ?, valor = ? WHERE id = ?");
        $stmt->bind_param("sdi", $concepto, $valor, $id);
        $stmt->execute();

        echo json_encode(["message" => "Precio actualizado"]);
        break;
}

$conn->close();
?>
