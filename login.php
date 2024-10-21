<?php
include 'conexao.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Suponhamos que você já tenha recebido o nome de usuário e senha do usuário
    $email = $_POST['nome_login']; // Suponha que esses valores sejam recebidos de um formulário HTML
    $password = $_POST['senha_login'];

    // Consulta o banco de dados para verificar as credenciais do usuário
    $query_usuario = "SELECT * FROM usuario WHERE email_user = '$email'";
    $result_usuario = $mysqli->query($query_usuario);

    if ($result_usuario->num_rows == 1) {
        $row_usuario = $result_usuario->fetch_assoc();
        $db_password = $row_usuario['senha_user'];
        $_SESSION["usuario_id"] = $row_usuario['id_user'];

        // Verifica se a senha fornecida corresponde à senha no banco de dados
        if (password_verify($password, $db_password)) {
            // Senha válida, você pode continuar com a autenticação no site
            // Use cURL ou outras bibliotecas para acessar o site
            echo "Login bem-sucedido!";
            header('location: main.php');
        } else {
            echo "Senha incorreta";
        }
    } else {
        // Caso o usuário não seja encontrado na tabela de usuários, verifica na tabela de funcionários
        $query_funcionario = "SELECT * FROM funcionario WHERE email_user = '$email'";
        $result_funcionario = $mysqli->query($query_funcionario);

        if ($result_funcionario->num_rows == 1) {
            $row_funcionario = $result_funcionario->fetch_assoc();
            $db_password = $row_funcionario['senha_user'];
            $_SESSION["funcionario_id"] = $row_funcionario['id_user'];

            // Verifica se a senha fornecida corresponde à senha no banco de dados
            if (password_verify($password, $db_password)) {
                // Senha válida, você pode continuar com a autenticação no site
                // Use cURL ou outras bibliotecas para acessar o site
                echo "Login bem-sucedido!";
                header('location: main.php');
            } else {
                echo "Senha incorreta";
            }
        } else {
            echo "Nome de usuário não encontrado";
        }
    }
} else {
    echo 'Dados não inseridos';
}
?>
