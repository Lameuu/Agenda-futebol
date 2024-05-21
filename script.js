// Validação de formulário de cadastro
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

    // Se a validação passar, o formulário é enviado
    alert('Cadastro realizado com sucesso!');
    return true;
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
            navigateTo('cadastro');
        });
    }

    const cadastrarGoogleBtn = document.getElementById('btn-google-cadastro');
    if (cadastrarGoogleBtn) {
        cadastrarGoogleBtn.addEventListener('click', function () {
            // Aqui você pode adicionar a lógica para cadastro com conta do Google
            alert('Cadastro com Google em breve disponível.');
        });
    }

    const submitCadastroForm = document.getElementById('form-cadastro');
    if (submitCadastroForm) {
        submitCadastroForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita o envio do formulário
            validateCadastroForm();
        });
    }
});
