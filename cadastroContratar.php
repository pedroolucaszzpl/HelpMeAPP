<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href='css/cad.css'>
    <link rel="icon" href=" ./img/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Foldit:wght@300&family=Oswald:wght@200&family=Quicksand:wght@500&family=Space+Grotesk:wght@300&display=swap" rel="stylesheet">
    <title>Help Me</title>
</head>

<body>
    <div class='content'>
        <div class='logo'>
            <img id=id-img src="img/logo.png">
        </div>
        <div class="login">
            <form method="post" action="cadastrocodC.php" class="class-alinhar">
                <div class='cliente_cad'>
                    <label for="nome">Nome:</label></br>
                    <input type="text" id="nome" name="nome_user" required>
                </div>
                <div class='cliente_cad'>
                    <label for="email">E-mail:</label> </br>
                    <input type="email" id="email" name="email_user" required>
                </div>

                <div class='cliente_cad'>
                    <label for="senha">Senha:</label></br>
                    <input type="password" id="senha" name="senha_user" required>
                </div>

                <div class='cliente_cad'>
                    <label for="senha">Data de Nascimento:</label></br>
                    <input type="date" id="nascimento" name="nascimento_user" required>
                </div>

                <div class='cliente_cad'>
                    <label for="cpf">CPF:</label></br>
                    <input type="text" id="cpf" name="cpf_user" required>
                </div>
                <!-- <div class="functionSelect">
                    <label for="function">Função:</label>
                    <select class="function class-centralize" name="funcao_user" id="funcao">
                        <option value="" disabled selected hidden>Você é um cliente?</option>
                        <option value="cliente">Cliente</option>
                        <option value="administrador">Administrador</option>
                    </select><br>
                </div> -->
                <div id="linhas">
                    <div class="line"></div>
                </div>
                <input id="botao_login" type="submit" value="Cadastrar">
                <p class="cadastro">Já tem uma conta? <a class="navigate" href="logar.php">Clique aqui!</a></p>
            </form>

        </div>
    </div>
</body>

</html>