<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href='css/paginainicial.css'>
    <link rel="icon" href="./img/logo.png">
    <title>Help Me</title>
</head>
<body>
    <header>
        <nav>
            <div class="contate">
                <a href="index.php">
                    <img src="img/logo.png" alt="Logo Help Me">
                </a>
                <a href="ajuda.php">Fale Conosco!</a>
                <a href="sobrenos.php">Sobre</a>
            </div>
            <div class="tx-1">
                <a href="logar.php">Login</a>
            </div>
        </nav>
    </header>
    <div id="conteudo">
        <div>
            
            <h1>Help me</h1>
            <h2>Plataforma para Solicitação de Serviços</h2>
            <h3>Uma plataforma confiável para solicitar serviços de forma rápida e fácil.</h3>
            <div id="button">
                <a class="button" href="https://play.google.com/store/apps/details?id=br.senai.meusenai.dn&hl=pt">Nosso Aplicativo</a>
                <a class="button" href="escolha.php">Inscreva-se</a>
            </div>
            <video autoplay loop muted controls>
                <source src="img/TV.mp4" type="video/mp4">
                Seu navegador não suporta o elemento de vídeo.
            </video>
        </div>
    
        <div id="avaliacao">
            <img src="img/avaliação.png" alt="avaliacao">
        </div> 
        <div id="textinho">
            <h1 id="text5">Na Help Me, tornamos a solicitação de serviços simples:</h1>
        </div>
        <div id="textinho2" class="hidden">
            <h3 id="text4">Escolha o Serviço: Navegue e selecione o serviço desejado.</h3>
        </div>
        <div id="textinho3" class="hidden">
            <h3 id="text4">Personalize sua Solicitação: Adicione detalhes específicos.</h3>
        </div>
        <div id="textinho4" class="hidden">
            <h3 id="text4">Profissionais: Conecte-se com profissionais qualificados.</h3>
        </div>
        <div id="textinho5" class="hidden">
            <h3 id="text4">Conclua com Facilidade o serviço : Conclua e receba o contrato.</h3>
        </div>
    </div>
   <footer>
        <p>&copy; 2024 Help Me. Todos os direitos reservados.</p>
    </footer>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#cac1f3" fill-opacity="1" d="M0,256L48,250.7C96,245,192,235,288,224C384,213,480,203,576,192C672,181,768,171,864,176C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
</body>
</html>

<script>
    function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function checkVisibility() {
    var textinho2 = document.getElementById('textinho2');
    var textinho3 = document.getElementById('textinho3');
    var textinho4 = document.getElementById('textinho4');
    var textinho5 = document.getElementById('textinho5');

    if (isElementInViewport(textinho2)) {
        textinho2.classList.add('fadeIn');
        textinho2.classList.remove('hidden');
    }

    if (isElementInViewport(textinho3)) {
        textinho3.classList.add('fadeIn');
        textinho3.classList.remove('hidden');
    }

    if (isElementInViewport(textinho4)) {
        textinho4.classList.add('fadeIn');
        textinho4.classList.remove('hidden');
    }

    if (isElementInViewport(textinho5)) {
        textinho5.classList.add('fadeIn');
        textinho5.classList.remove('hidden');
    }
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('DOMContentLoaded', checkVisibility);
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateVideoWhenVisible() {
    var video = document.querySelector('video');

    if (isElementInViewport(video)) {
        video.play();
    } else {
        video.pause();
    }
}

window.addEventListener('scroll', animateVideoWhenVisible);
window.addEventListener('DOMContentLoaded', animateVideoWhenVisible);

</script>