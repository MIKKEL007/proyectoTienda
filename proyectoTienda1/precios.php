<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // $producto_id = $_GET['producto_id'];
        // $stmt = $conn->prepare("SELECT * FROM precios WHERE producto_id = ?");
        // $stmt->bind_param("i", $producto_id);

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
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $producto_id = $data['producto_id'];
        $concepto = $data['concepto'];
        $valor = $data['valor'];

        $stmt = $conn->prepare("INSERT INTO precios (producto_id, concepto, valor) VALUES (?, ?, ?)");
        $stmt->bind_param("isd", $producto_id, $concepto, $valor);
        $stmt->execute();

        echo json_encode(["message" => "Precio creado"]);
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
