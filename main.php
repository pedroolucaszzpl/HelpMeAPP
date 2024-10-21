<?php
session_start();

if (!isset($_SESSION["usuario_id"]) && !isset($_SESSION["funcionario_id"])) {
    header('location: index.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Foldit:wght@300&family=Oswald:wght@200&family=Quicksand:wght@500&family=Space+Grotesk:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="icon" href=" ./img/logo.png">
    <title>Help Me</title>
</head>

<body>
    <header>
        <div class="head">
            <div class="logo">
                <a href="index.php">
                    <img src="img/logo.png" alt="Logo Help Me">
                </a>
            </div>
            <div class='logout'>
                <a href='logout.php'>Sair</a>
            </div>
            <div class="avatar">
                <img src="img/avatar.png" alt="Avatar">
                <?php

                if (isset($_SESSION['nome_user'])) {
                    echo $_SESSION['nome_user'];
                } else {
                    include 'conexao.php'; // Certifique-se de incluir o arquivo de conexão

                    // Faça uma consulta para obter o nome de usuário com base no usuário logado
                    $usuario_id = isset($_SESSION['usuario_id']) ? $_SESSION['usuario_id'] : (isset($_SESSION['funcionario_id']) ? $_SESSION['funcionario_id'] : null);

                    if ($usuario_id) {
                        // Consulta para verificar se o usuário está na tabela funcionario
                        $sql_funcionario = "SELECT nome_user FROM funcionario WHERE id_user = $usuario_id";

                        // Consulta para verificar se o usuário está na tabela usuario
                        $sql_usuario = "SELECT nome_user FROM usuario WHERE id_user = $usuario_id";

                        // Executar a consulta para funcionário
                        $resultado_funcionario = $mysqli->query($sql_funcionario);

                        if ($resultado_funcionario && $resultado_funcionario->num_rows > 0) {
                            $row_funcionario = $resultado_funcionario->fetch_assoc();
                            echo "<p class='name'>" . $row_funcionario['nome_user'] . "</p>";
                        } else {
                            // Executar a consulta para usuário
                            $resultado_usuario = $mysqli->query($sql_usuario);

                            if ($resultado_usuario && $resultado_usuario->num_rows > 0) {
                                $row_usuario = $resultado_usuario->fetch_assoc();
                                echo "<p class='name'>" . $row_usuario['nome_user'] . "</p>";
                            } else {
                                echo "Nome de usuário não encontrado";
                            }
                        }
                    } else {
                        echo "ID de usuário não encontrado na sessão";
                    }
                }
                ?>

            </div>
        </div>
        <div class="navigation">
            <div class="items-bar">
                <div class="item">
                    <a href="">Contratações +50</a>
                </div>
                <div class="item">
                    <a href="">Serviços</a>
                </div>
                <div class="item">
                    <a href="">Histórico</a>
                </div>
                <div class="item">
                    <a href="">Salvos</a>
                </div>
            </div>
            <div class="search">
                <form class="formss" action="pesquisa.php" method="post">
                    <input type="image" id="lupa" src="img/lupa.png" alt="lupa">
                    <input name='termo' type="text" placeholder=" O que você precisa?" class="ask">
                </form>
            </div>
        </div>
    </header>
    <main>
        <div class="container">
            <div class="title">
                <h1>Profissões mais procuradas!</h1>
                <div class="linha"></div>
            </div>
            <div class="categorias">
                <?php
                // Supondo que você já tenha uma conexão com o banco de dados
                include 'conexao.php';
                // Consulta SQL para selecionar funções distintas da tabela funcionario
                $query = "SELECT DISTINCT funcao_user FROM funcionario LIMIT 10";

                // Executar a consulta
                $result = mysqli_query($mysqli, $query);

                // Verificar se a consulta retornou algum resultado
                if (mysqli_num_rows($result) > 0) {
                    // Loop pelos resultados e exibir cada função dentro de uma div
                    while ($row = mysqli_fetch_assoc($result)) {
                        echo "<div class='profissao'>";
                        echo "<p>" . $row['funcao_user'] . "</p>";
                        echo "</div>";
                    }
                } else {
                    // Se não houver funções na tabela, exibir uma mensagem
                    echo "Nenhuma profissão encontrada.";
                }

                // Fechar a conexão com o banco de dados
                mysqli_close($mysqli);
                ?>

            </div>
            <div class="profissionais">
                <div class="title">
                    <h1>Profissionais da sua região</h1>
                    <div class="linha"></div>
                    <div class="perfis">
                        <div class="person">
                            <div>
                                <img src="img/avatar.png" alt="">
                            </div>
                            <p class="nome">PROFISSIONAL</p>
                            <P class="desc">Profissão</P>
                            <p class="desc">Cidade</p>
                        </div>
                        <div class="person">
                            <div>
                                <img src="img/avatar.png" alt="">
                            </div>
                            <p class="nome">PROFISSIONAL</p>
                            <P class="desc">Profissão</P>
                            <p class="desc">Cidade</p>
                        </div>
                        <div class="person">
                            <div>
                                <img src="img/avatar.png" alt="">
                            </div>
                            <p class="nome">PROFISSIONAL</p>
                            <P class="desc">Profissão</P>
                            <p class="desc">Cidade</p>
                        </div>
                        <div class="person">
                            <div>
                                <img src="img/avatar.png" alt="">
                            </div>
                            <p class="nome">PROFISSIONAL</p>
                            <P class="desc">Profissão</P>
                            <p class="desc">Cidade</p>
                        </div>
                        <div class="person">
                            <div>
                                <img src="img/avatar.png" alt="">
                            </div>
                            <p class="nome">PROFISSIONAL</p>
                            <P class="desc">Profissão</P>
                            <p class="desc">Cidade</p>
                        </div>
                        <div class="person">
                            <div>
                                <img src="img/avatar.png" alt="">
                            </div>
                            <p class="nome">PROFISSIONAL</p>
                            <P class="desc">Profissão</P>
                            <p class="desc">Cidade</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>

</html>