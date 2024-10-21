<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/login.css">
    <link rel="icon" href=" ./img/logo.png">
    <title>Help Me</title>
</head>

<body>

   
    <div class="content">
        <div class="logo">
            <img id="id-img" src="img/logo.png">
        </div>
        <div class="login">
        <form method="post" action="login.php">
            <div class="form">
                <label for="nome_login" id="nome_label">Email:</label> <br>
                <input id="nome_login" name="nome_login" required="required" type="text"
                    placeholder="Usuário de cadastro" />

            </div>
            <div class="form">
                <label for="senha_login">Senha</label> <br>
                <input id="senha_login" name="senha_login" required="required" type="password"
                    placeholder="Digite sua senha" />

            </div>

            <a class="cadastro" href="redSenha.php">Esqueceu sua senha?
                 Clique aqui!</a>

            <div id="linhas">
                <div class="line"></div>
            </div>
            <div>
                <input id="botao_login" type="submit" value="Logar">
            </div>
            <a class="cadastro" href="escolha.php">Não tem uma conta?
                 Clique aqui!</a>
                    
                </form>
            </div> 
        </div>
    </div>
    <footer>
        
    </footer>
</body>
<style>
    nav {
   width: 100%; 
   height: 90px; 
   background-color: #ffffff;
   overflow: hidden;
   display: flex;
   justify-content: space-between;
   align-items: center;
}
nav img {
   width: 120px;
   float: left; 
   margin-left: 55px;
}
.contate a {
   text-decoration: none;
   padding: 14px 16px;
   text-align: center;
   display: inline-block; 
   font-weight: bold;
   color: #301934;
}

.contate a:hover {
   border-radius: 20px;
   background-color: #f3efef;
   color: #857dd1;
   font-weight: bold;
}
.contate{
   display: flex;
   flex-direction: row ;
   align-items: center;
}
</style>
</html>