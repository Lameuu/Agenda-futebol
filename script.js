// Validação de formulário de cadastro local
function validateCadastroForm() {
    const nome = document.getElementById('nome-cadastro').value;
    const sobrenome = document.getElementById('sobrenome-cadastro').value;
    const cpf = document.getElementById('cpf-cadastro').value;
    const email = document.getElementById('email-cadastro').value;
    const telefone = document.getElementById('telefone-cadastro').value;
    const senha = document.getElementById('senha-cadastro').value;
    const senhaRepetida = document.getElementById('senha-repetida-cadastro').value;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !sobrenome || !cpf || !email || !telefone || !senha || !senhaRepetida) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    // Verifica se as senhas coincidem
    if (senha !== senhaRepetida) {
        alert('As senhas não coincidem.');
        return false;
    }

    // Salva as informações de cadastro localmente
    saveCadastroInfo(nome, sobrenome, cpf, email, telefone, senha);

    // Exibe o popup de cadastro realizado com sucesso
    showCadastroPopup();

    // Redireciona para a página de quadras após o cadastro com sucesso
    navigateTo('quadras');

    return true;
}

// Função para exibir popup de cadastro realizado com sucesso
function showCadastroPopup() {
    alert('Cadastro realizado com sucesso!');
}

// Adiciona eventos de clique aos botões
document.addEventListener('DOMContentLoaded', function () {
    const verQuadrasBtn = document.getElementById('ver-quadras-btn');
    if (verQuadrasBtn) {
        verQuadrasBtn.addEventListener('click', function () {
            navigateTo('quadras');
        });
    }

    const cadastrarBtn = document.getElementById('cadastrar-btn');
    if (cadastrarBtn) {
        cadastrarBtn.addEventListener('click', function () {
            validateCadastroForm();
        });
    }

    const cadastrarGoogleBtn = document.getElementById('btn-google-cadastro');
    if (cadastrarGoogleBtn) {
        cadastrarGoogleBtn.addEventListener('click', function () {
            // Chama a função de login do Google
            auth2.signIn().then(function(googleUser) {
                console.log('Usuário autenticado com sucesso:', googleUser);
                // Após o login com sucesso, salva o status no Local Storage
                localStorage.setItem('googleUser', 'true');
                // Redireciona para a página de quadras após o login com sucesso
                navigateTo('quadras');
            }, function(error) {
                console.error('Erro ao autenticar usuário:', error);
            });
        });
    }

    const submitCadastroForm = document.getElementById('form-cadastro');
    if (submitCadastroForm) {
        submitCadastroForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita o envio do formulário
            validateCadastroForm();
        });
    }

    // Verifica o status do login do Google ao carregar a página
    checkGoogleLoginStatus();
});
