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
$pdf->Cell(70, 10, 'Producto', 1);
$pdf->Cell(40, 10, 'Cantidad', 1);
$pdf->Cell(40, 10, 'Precio Venta', 1);
$pdf->Ln();

$totalGeneral = 0;

$sql = "SELECT v.fecha, p.nombre, v.cantidad, v.precio_venta
        FROM ventas v 
        JOIN productos p ON v.producto_id = p.id 
        WHERE v.fecha BETWEEN '$inicio' AND '$fin'";

$result = $conn->query($sql);

if ($result->num_rows == 0) {
    $pdf->Cell(0, 10, 'No hay ventas en el rango seleccionado.', 1, 1, 'C');
} else {
    while ($row = $result->fetch_assoc()) {
        $pdf->SetFont('Arial', '', 12);
        $pdf->Cell(40, 10, date('Y-m-d', strtotime($row['fecha'])), 1);
        $pdf->Cell(70, 10, $row['nombre'], 1);
        $pdf->Cell(40, 10, $row['cantidad'], 1, 0, 'C');
        $pdf->Cell(40, 10, "$" . number_format(floatval($row['precio_venta']), 2), 1, 0, 'R');
        $pdf->Ln();

        $totalGeneral += floatval($row['precio_venta']);
    }

    // Total General (suma de precio_venta)
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(150, 10, 'Total General:', 1);
    $pdf->Cell(40, 10, "$" . number_format($totalGeneral, 2), 1, 0, 'R');
}

$pdf->Output();
$conn->close();
?>
