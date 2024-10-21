<?php
include 'conexao.php';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Receba o email do formulário
        $usuario_email = $_POST['email_user'];
        $usuario_senha = $_POST['senha_user'];

    // Recupere os dados do formulário
    $usuario_email = $_POST["email_user"];
    $usuario_senha = $_POST["senha_user"];
    $senha_hash = password_hash($usuario_senha, PASSWORD_DEFAULT);

    // Execute uma consulta para atualizar a senha
    $sql = "UPDATE usuario SET senha_user = ? WHERE email_user = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ss", $senha_hash , $usuario_email);

    if ($stmt->execute()) {
        echo "Senha redefinida com sucesso!";
        header("Location: logar.php");
    } else {
        echo "Erro ao redefinir a senha: " . $mysqli->error;
    }

    // Feche a conexão com o banco de dados
    $mysqli->close();
    }
?>

<?php
include 'conexao.php';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Receba o email do formulário
        $funcionario_email = $_POST['email_user'];
        $funcionario_senha = $_POST['senha_user'];

    // Recupere os dados do formulário
    $funcionario_email = $_POST["email_user"];
    $funcionario_senha = $_POST["senha_user"];
    $senha_hash = password_hash($funcionario_senha, PASSWORD_DEFAULT);


    // Execute uma consulta para atualizar a senha
    $sql = "UPDATE funcionario SET senha_user = ? WHERE email_user = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ss", $senha_hash, $funcionario_email);

    if ($stmt->execute()) {
        echo "Senha redefinida com sucesso!";
        header("Location: logar.php");
    } else {
        echo "Erro ao redefinir a senha: " . $mysqli->error;
    }

    // Feche a conexão com o banco de dados
    $mysqli->close();
    }
?>