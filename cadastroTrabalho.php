<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href='css/cad.css'>
    <link rel="icon" href=" ./img/logo.png">
    <title>Help Me</title>
</head>

<body>
    <div class='content'>
        <div class='logo'>
            <img id=id-img src="img/logo.png">
        </div>
        <div class="login">
            <form method="post" action="cadastrocodT.php" class="class-alinhar">
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
                    <label for="nascimento">Data de Nascimento:</label></br>
                    <input type="date" id="nascimento" name="nascimento_user" required>
                </div>

                <div class='cliente_cad'>
                    <label for="cpf">CPF:</label></br>
                    <input type="text" id="cpf" name="cpf_user" required>
                </div>

                <div class="functionSelect">
                    <label for="tipo_servico">Tipo de Serviço:</label>
                    <select class="function class-centralize" name="setor_user" id="setor">
                        <option value="" disabled selected hidden>Qual seu setor?</option>
                        <option value="domestico">Serviço Doméstico</option>
                        <option value="empresarial">Serviço Empresarial</option>
                    </select>
                </div>
                <div class="functionSelect">
                    <label for="tipo_servico">Profissão:</label>
                    <select class="function class-centralize" name="funcao_user" id="funcao">
                        <option value="" disabled selected hidden>Selecione um setor antes</option>
                    </select>
                </div>
                <div id="linhas">
                    <div class="line"></div>
                </div>
                <input id="botao_login" type="submit" value="Cadastrar">
                <p class="cadastro">Já tem uma conta? <a class="navigate" href="logar.php">Clique aqui!</a></p>
            </form>

        </div>
    </div>
    <input type="hidden" name="funcao_user_hidden" id="funcao_user_hidden">
    <script>
        document.getElementById('setor').addEventListener('change', function() {
            var setorSelecionado = this.value;
            var funcaoSelect = document.getElementById('funcao');
            var funcaoHidden = document.getElementById('funcao_user_hidden');

            // Limpar opções de profissão
            funcaoSelect.innerHTML = '';

            // Adicionar opções de profissão baseadas no setor escolhido
            if (setorSelecionado === 'domestico') {
                var optionBaba = document.createElement('option');
                optionBaba.textContent = 'Babá';
                optionBaba.value = 'Babá';
                funcaoSelect.appendChild(optionBaba);

                var optionFaxineira = document.createElement('option');
                optionFaxineira.textContent = 'Faxineira';
                optionFaxineira.value = 'Faxineira';
                funcaoSelect.appendChild(optionFaxineira);

                var optionJardineiro = document.createElement('option');
                optionJardineiro.textContent = 'Jardineiro';
                optionJardineiro.value = 'Jardineiro';
                funcaoSelect.appendChild(optionJardineiro);

                var optionManutencao = document.createElement('option');
                optionManutencao.textContent = 'Manutenção de Eletrodomésticos';
                optionManutencao.value = 'Manutenção de Eletrodomésticos';
                funcaoSelect.appendChild(optionManutencao);

                var optionMecanico = document.createElement('option');
                optionMecanico.textContent = 'Mecânico';
                optionMecanico.value = 'Mecânico';
                funcaoSelect.appendChild(optionMecanico);

                var optionMotorista = document.createElement('option');
                optionMotorista.textContent = 'Motorista';
                optionMotorista.value = 'Motorista';
                funcaoSelect.appendChild(optionMotorista);

                var optionPintor = document.createElement('option');
                optionPintor.textContent = 'Pintor';
                optionPintor.value = 'Pintor';
                funcaoSelect.appendChild(optionPintor);

                var optionPedreiro = document.createElement('option');
                optionPedreiro.textContent = 'Pedreiro';
                optionPedreiro.value = 'Pedreiro';
                funcaoSelect.appendChild(optionPedreiro);
            } else if (setorSelecionado === 'empresarial') {
                // Adicione aqui as opções para o setor empresarial
                var optionGerenteProjetos = document.createElement('option');
                optionGerenteProjetos.textContent = 'Gerente de Projetos';
                optionGerenteProjetos.value = 'Gerente de Projetos';
                funcaoSelect.appendChild(optionGerenteProjetos);

                var optionContador = document.createElement('option');
                optionContador.textContent = 'Contador(a)';
                optionContador.value = 'Contador(a)';
                funcaoSelect.appendChild(optionContador);

                var optionAnalistaDeDados = document.createElement('option');
                optionContador.textContent = 'Analista de Dados';
                optionContador.value = 'Analista de Dados';
                funcaoSelect.appendChild(optionAnalistaDeDados);
            }
        }
        );

        document.getElementById('funcao').addEventListener('change', function() {
            var funcaoSelect = document.getElementById('funcao');
            var funcaoHidden = document.getElementById('funcao_user_hidden');

            // Atualize o campo oculto com o valor selecionado
            funcaoHidden.value = funcaoSelect.value;
        });
    </script>

</body>

</html>