<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href='css/paginainicial.css'>
    <link rel="icon" href="./img/logo.png">
    <title>Help Me</title>
    <style>
        /* Estilos para o conteúdo principal */
        #conteudo {
            max-width: 800px;
            margin: 20px auto;
            padding: 90px;
            text-align: justify;
        }

        h1 {
            font-size: 36px;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2); /* Adiciona sombreamento ao texto */
        }

        h2 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #3f51b5;
        }

        h3 {
            font-size: 18px;
            line-height: 1.6;
            color: #666;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2); /* Adiciona sombreamento ao texto */
        }

        /* Estilos para os criadores */
        #criadores {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }

        .criador-container {
            position: relative;
            margin: 0 10px;
            overflow: hidden;
        }

        .criador {
            border-radius: 50%;
            width: 100px; /* Ajuste o tamanho conforme necessário */
            height: 100px; /* Ajuste o tamanho conforme necessário */
            transition: transform 0.3s ease-in-out;
        }

        .criador-container:hover .criador {
            transform: scale(1.1); /* Aumenta o tamanho da imagem ao passar o mouse */
        }

        .criador-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Cor da sobreposição */
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.3s ease-in-out;
        }

        .criador-container:hover .criador-overlay {
            opacity: 1;
        }

        .criador-text {
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }
    </style>
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
            <h1>Bem-vindo ao Help Me!</h1>
            <h2>Plataforma para Solicitação de Serviços</h2>
            <h3>Somos uma equipe apaixonada por soluções inovadoras e experiências excepcionais. Fundada em 2024, nossa empresa nasceu da visão de tornar a vida das pessoas mais fácil, proporcionando acesso a serviços de qualidade de forma rápida e conveniente.</h3>
            <h3>Desde o início, nos comprometemos em oferecer uma plataforma confiável e acessível, conectando clientes com profissionais qualificados em diversas áreas de atuação. Nossa missão é proporcionar uma experiência única, onde a confiança, a eficiência e a satisfação do cliente são prioridades absolutas.</h3>
            <h3>Aqui na <strong>Help Me</strong>, valorizamos a transparência, a ética e o profissionalismo em todas as interações. Nosso time é composto por indivíduos dedicados e talentosos, sempre empenhados em superar as expectativas e em oferecer soluções personalizadas para cada necessidade.</h3>
        </div>
        <div id="criadores">
            <div class="criador-container">
                <img class="criador" src="img/pl.jpeg" alt="Nome do Criador 1">
                <div class="criador-overlay">
                    <p class="criador-text">Pedro Lucas </p>
                </div>
            </div>
            <div class="criador-container">
                <img class="criador" src="img/yas.jpeg" alt="Nome do Criador 2">
                <div class="criador-overlay">
                    <p class="criador-text">Yasmin</p>
                </div>
            </div>
            <div class="criador-container">
                <img class="criador" src="img/tai.jpeg" alt="Nome do Criador 3">
                <div class="criador-overlay">
                    <p class="criador-text">Tainá</p>
                </div>
            </div>
            <div class="criador-container">
                <img class="criador" src="img/jp .jpeg" alt="Nome do Criador 4">
                <div class="criador-overlay">
                    <p class="criador-text">João Paulo</p>
                </div>
            </div>
            <div class="criador-container">
                <img class="criador" src="img/cibs.jpeg" alt="Nome do Criador 5">
                <div class="criador-overlay">
                    <p class="criador-text">Cibeli</p>
                </div>
            </div>
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
