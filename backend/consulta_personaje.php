<?php
include "conexion.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$idanime = $data['idanime'] ?? 0;

$sql = "SELECT p.*, a.descripcionanime 
        FROM personaje p
        INNER JOIN anime a ON p.idanime = a.idanime
        WHERE a.idanime = $idanime";

$res = $conn->query($sql);

$rows = [];
while ($row = $res->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);
?>
