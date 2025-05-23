<?php
require('fpdf/fpdf.php');
include 'db.php';

$inicio = $_GET['inicio'];
$fin = $_GET['fin'];

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, 'Reporte de Ventas', 0, 1, 'C');
$pdf->SetFont('Arial', '', 12);
$pdf->Cell(0, 10, "Desde: $inicio hasta $fin", 0, 1, 'C');
$pdf->Ln(5);

// Encabezados
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(40, 10, 'Fecha', 1);
$pdf->Cell(60, 10, 'Producto', 1);
$pdf->Cell(30, 10, 'Cantidad', 1);
$pdf->Cell(30, 10, 'Precio', 1);
$pdf->Cell(30, 10, 'Total', 1);
$pdf->Ln();

$totalGeneral = 0;

$sql = "SELECT v.fecha, p.nombre, v.cantidad, v.precio_venta, (v.cantidad * v.precio_venta) as total 
        FROM ventas v 
        JOIN productos p ON v.producto_id = p.id 
        WHERE v.fecha BETWEEN '$inicio' AND '$fin'";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(40, 10, $row['fecha'], 1);
    $pdf->Cell(60, 10, $row['nombre'], 1);
    $pdf->Cell(30, 10, $row['cantidad'], 1, 0, 'C');
    $pdf->Cell(30, 10, "$" . number_format($row['precio_venta'], 2), 1, 0, 'R');
    $pdf->Cell(30, 10, "$" . number_format($row['total'], 2), 1, 0, 'R');
    $pdf->Ln();
    $totalGeneral += $row['total'];
}

// Total
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(160, 10, 'Total General:', 1);
$pdf->Cell(30, 10, "$" . number_format($totalGeneral, 2), 1, 0, 'R');

$pdf->Output();
$conn->close();
?>
