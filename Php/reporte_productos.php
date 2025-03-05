<?php
require('fpdf/fpdf.php');
include 'db.php';

$categoria = $_GET['categoria'];

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, 'Reporte de Productos', 0, 1, 'C');
$pdf->Ln(5);

// Encabezados
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(60, 10, 'Producto', 1);
$pdf->Cell(60, 10, 'Categoria', 1);
$pdf->Cell(30, 10, 'Stock', 1);
$pdf->Ln();

if ($categoria == "TODOS") {
    $sql = "SELECT p.nombre, c.nombre AS categoria, p.stock FROM productos p 
            JOIN categorias c ON p.categoria_id = c.id";
    $stmt = $conn->prepare($sql);
} else {
    $sql = "SELECT p.nombre, c.nombre AS categoria, p.stock FROM productos p 
            JOIN categorias c ON p.categoria_id = c.id 
            WHERE p.categoria_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $categoria);  // "i" para indicar que la variable es un entero
}

$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(60, 10, $row['nombre'], 1);
    $pdf->Cell(60, 10, $row['categoria'], 1);
    $pdf->Cell(30, 10, $row['stock'], 1, 0, 'C');
    $pdf->Ln();
}

$pdf->Output();
$conn->close();
?>
