<?php
include 'conexao.php';
session_start(); // Inicie a sessão (se já não estiver iniciada)

session_unset();
    
session_destroy();

// Verifique se o usuário está logado
if (isset($_SESSION['funcionario_id'])) {
    // Se estiver logado, destrua a sessão (logout)
    session_unset();

    session_destroy();
    
    // Redirecione o usuário para a página de login ou outra página desejada
    header("Location: logar.php");
    exit();
} else {
    // Se o usuário não estiver logado, redirecione-o para a página de login
    header("Location: logar.php");
    exit();
}
?>