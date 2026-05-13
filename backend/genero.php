<?php
include "conexion.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);
$op = $data['op'] ?? $_GET['op'] ?? '';

/* CREATE */
if ($method === 'POST' && $op === 'create') {

    $sql = "INSERT INTO genero (nombre, descripcion, popularidad)
            VALUES (
              '{$data['nombre']}',
              '{$data['descripcion']}',
              '{$data['popularidad']}'
            )";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => $conn->error,
            "sql" => $sql
        ]);
    }
}

/* READ */
if ($method === 'GET') {
    $res = $conn->query("SELECT * FROM genero ORDER BY idgenero DESC");
    $rows = [];
    while ($row = $res->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
}

/* UPDATE */
if ($method === 'POST' && $op === 'update') {
    $sql = "UPDATE genero SET
              nombre='{$data['nombre']}',
              descripcion='{$data['descripcion']}',
              popularidad='{$data['popularidad']}'
            WHERE idgenero={$data['idgenero']}";

    echo json_encode([
        "success" => $conn->query($sql),
        "error" => $conn->error
    ]);
}

/* DELETE */
if ($method === 'POST' && $op === 'delete') {
    $sql = "DELETE FROM genero WHERE idgenero={$data['idgenero']}";

    echo json_encode([
        "success" => $conn->query($sql),
        "error" => $conn->error
    ]);
}
?>
