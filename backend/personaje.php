<?php
include "conexion.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);
$op = $data['op'] ?? $_GET['op'] ?? '';

/* ===== CREATE ===== */
if ($method === 'POST' && $op === 'create') {
    $sql = "INSERT INTO personaje (nombre, edad, rol, fecha_aparicion, idanime)
            VALUES (
              '{$data['nombre']}',
              {$data['edad']},
              '{$data['rol']}',
              '{$data['fecha_aparicion']}',
              {$data['idanime']}
            )";

    echo json_encode(["success" => $conn->query($sql)]);
}

/* ===== READ ===== */
if ($method === 'GET') {
    $res = $conn->query("SELECT * FROM personaje ORDER BY idpersonaje DESC");
    $rows = [];
    while ($row = $res->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
}

/* ===== UPDATE ===== */
if ($method === 'POST' && $op === 'update') {
    $sql = "UPDATE personaje SET
              nombre='{$data['nombre']}',
              edad={$data['edad']},
              rol='{$data['rol']}',
              fecha_aparicion='{$data['fecha_aparicion']}',
              idanime={$data['idanime']}
            WHERE idpersonaje={$data['idpersonaje']}";

    echo json_encode(["success" => $conn->query($sql)]);
}

/* ===== DELETE ===== */
if ($method === 'POST' && $op === 'delete') {
    $sql = "DELETE FROM personaje WHERE idpersonaje={$data['idpersonaje']}";

    echo json_encode(["success" => $conn->query($sql)]);
}
?>
