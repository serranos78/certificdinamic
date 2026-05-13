<?php
$host = "localhost";
$user = "root";       // tu usuario de MySQL
$pass = "Gcra1978*";           // tu contraseña
$db   = "anime";      // nombre de tu base de datos

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}


header("Content-Type: application/json");
?>