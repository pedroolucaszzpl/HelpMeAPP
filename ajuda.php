<?php
// Inicializa a variável de mensagem
$msg = "";

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'conexao.php';

    // Prepara e executa a inserção da solicitação no banco de dados
    $assunto = $_POST['assunto'];
    $mensagem = $_POST['mensagem'];
    $autor = $_POST['autor'];
    $email = $_POST['email'];

    $sql = "INSERT INTO solicitacao (solicitacao_assunto, solicitacao_mensagem, solicitacao_autor, solicitacao_email) VALUES ('$assunto', '$mensagem', '$autor', '$email')";

    if ($mysqli->query($sql) === TRUE) {
        $msg = "Sua solicitação foi enviada com sucesso!";
    } else {
        $msg = "Erro ao enviar sua solicitação: " . $mysqli->error;
    }

    // Fecha a conexão
    $mysqli->close();
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
    <link rel="stylesheet" href="css/main.css">
    <link rel="icon" href=" ./img/logo.png">
    <title>Help Me - Fale Conosco</title>
    <title>Document</title>
</head>

<body class="page-ajuda">
    <header>
        <div class="head">
            <div class="logo">
                <a href="index.php">
                    <img src="img/logo.png" alt="Logo Help Me">
                </a>
            </div>
            <div class="efetualog">
                <img src="img/avatar.png" alt="Avatar">
                <a href="logar.php">Fazer Login</a>
            </div>
        </div>
    </header>
    <main>
        <div class="container content">
            <div class="title">
                <h1>Olá, nós somos a equipe de suporte da Help Me!</h1>
                <p>Como podemos te ajudar?</p>
            </div>
            <div class="session">
                <div class="s1">
                    <img src="img/icon_help.png" alt="Icon">
                    <p>Serviços Domésticos</p>
                </div>
                <div class="s1">
                    <img src="img/icon_help.png" alt="Icon">
                    <p>Como agendar um serviço?</p>
                </div>
                <div class="s1">
                    <img src="img/icon_help.png" alt="Icon">
                    <p>Onde encontrar contratos prontos?</p>
                </div>
                <div class="s1">
                    <img src="img/icon_help.png" alt="Icon">
                    <p>Onde acessar dados da empresa contratante?</p>
                </div>
                <div class="s1">
                    <img src="img/icon_help.png" alt="Icon">
                    <p>Como aumentar a alcançabilidade do meu perfil?</p>
                </div>
            </div>
            <div class="title-doubt" onclick="openModal()">
                <h2>Deixe uma dúvida</h2>
            </div>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <div class="duvida"><!-- Formulário de envio de pergunta -->
                    <div class="form-container">
                        <form class="duvida form-duvida" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                            <span class="close" onclick="closeModal()">&times;</span>
                            <div class="logo-solicitacao"><img src="img/logo.png" alt=""></div>
                                <div class="linha"></div>
                                <h2 class="title-duvida">Solicite sua ajuda!</h2>
                                <label for="assunto">Assunto:</label><br>
                                <input type="text" id="assunto" name="assunto" required><br><br>

                                <label for="mensagem">Mensagem:</label><br>
                                <textarea id="mensagem" name="mensagem" rows="4" cols="50" required></textarea><br><br>

                                <label for="autor">Seu Nome:</label><br>
                                <input type="text" id="autor" name="autor" required><br><br>

                                <label for="email">Seu Email:</label><br>
                                <input type="text" id="email" name="email" required><br><br>
                                <div class="botao">
                                    <input type="submit" value="Enviar">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
    <script>
        // Função para abrir o modal
        function openModal() {
            document.getElementById("myModal").style.display = "flex";
        }

        // Função para fechar o modal
        function closeModal() {
            document.getElementById("myModal").style.display = "none";
        }
    </script>
</body>

</html>