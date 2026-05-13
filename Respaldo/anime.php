<?php
include "conexion.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $sql = "INSERT INTO anime (descripcionanime, numtemporadas, capitulos, fechalanzam, empresalanzam)
            VALUES ('{$data['descripcionanime']}', {$data['numtemporadas']},
                    {$data['capitulos']}, '{$data['fechalanzam']}', '{$data['empresalanzam']}')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => $conn->error,
            "sql" => $sql
        ]);
    }
} else {
    echo json_encode(["error" => "Método no permitido"]);
}
?>
