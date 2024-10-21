<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/rec_senha.css">
    
    <title>Document</title>
</head>

<body>
    <div class="content">
        <div class="logo">
            <img id="id-img" src="img/logo.png">
        </div>
        <div class="login">
        <form method="post" action="redefinir.php">
            <div class="form">
            <label for="funcionario_email">Usuário:</label>
            <input type="email" id="nome_login" name="email_user" required>
            </div>
            <div class="form">
            <label for="funcionario_senha">Nova Senha:</label>
            <input type="password" name="senha_user" required>

            </div>
            <div id="linhas">
                <div class="line"></div>
            </div>
            <div>
                <input id="botao_login" type="submit" value="Redefinir Senha">
            </div>


            <a class="cadastro" href="index.php">Não tem uma conta?
                 Clique aqui!</a>
                    
                </form>
            </div> 
        </div>
    </div>
    <footer>
        
    </footer>
</body>

</html>