<?php
include "conexion.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);
$op = $data['op'] ?? $_GET['op'] ?? '';

/* ================= CREAR ================= */
if ($method === 'POST' && $op === 'create') {
    $sql = "INSERT INTO anime (descripcionanime, numtemporadas, capitulos, fechalanzam, empresalanzam)
            VALUES (
              '{$data['descripcionanime']}',
              {$data['numtemporadas']},
              {$data['capitulos']},
              '{$data['fechalanzam']}',
              '{$data['empresalanzam']}'
            )";

    echo json_encode([
        "success" => $conn->query($sql)
    ]);
}

/* ================= LISTAR ================= */
if ($method === 'GET') {
    $res = $conn->query("SELECT * FROM anime ORDER BY idanime DESC");
    $rows = [];
    while ($row = $res->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
}

/* ================= EDITAR ================= */
if ($method === 'POST' && $op === 'update') {
    $sql = "UPDATE anime SET
              descripcionanime='{$data['descripcionanime']}',
              numtemporadas={$data['numtemporadas']},
              capitulos={$data['capitulos']},
              fechalanzam='{$data['fechalanzam']}',
              empresalanzam='{$data['empresalanzam']}'
            WHERE idanime={$data['idanime']}";

    echo json_encode([
        "success" => $conn->query($sql)
    ]);
}

/* ================= ELIMINAR ================= */
if ($method === 'POST' && $op === 'delete') {
    $sql = "DELETE FROM anime WHERE idanime={$data['idanime']}";
    echo json_encode([
        "success" => $conn->query($sql)
    ]);
}