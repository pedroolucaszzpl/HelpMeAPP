<?php

$conn = new mysqli("localhost", "root", "", "db_helpme");

if ($conn->connect_error) {
    die("erro na conexão: " . $conn->connect_error);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $nome = $_POST['nome_user'];
    $email = $_POST['email_user'];
    $senha = $_POST['senha_user'];
    $nascimento = $_POST['nascimento_user'];
    $cpf = $_POST['cpf_user'];

    // Hash da senha usando password_hash()
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuario (nome_user,email_user,senha_user,nascimento_user,cpf_user) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt-> bind_param("sssss", $nome, $email, $senha_hash, $nascimento, $cpf);
    $stmt->execute();

    header ('Location: logar.php ');
    exit();
    
}
$conn->close();
?>