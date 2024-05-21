// Validação de formulário de cadastro local
function validateCadastroForm() {
    const nome = document.getElementById('nome-cadastro').value.trim();
    const sobrenome = document.getElementById('sobrenome-cadastro').value.trim();
    const cpf = document.getElementById('cpf-cadastro').value.trim();
    const email = document.getElementById('email-cadastro').value.trim();
    const telefone = document.getElementById('telefone-cadastro').value.trim();
    const senha = document.getElementById('senha-cadastro').value.trim();
    const senhaRepetida = document.getElementById('senha-repetida-cadastro').value.trim();

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
            auth2.signIn().then(function (googleUser) {
                console.log('Usuário autenticado com sucesso:', googleUser);
                localStorage.setItem('googleUser', 'true');
                navigateTo('quadras');
            }, function (error) {
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

    checkGoogleLoginStatus();
});

// Função para verificar o status do login do Google
function checkGoogleLoginStatus() {
    const googleUser = localStorage.getItem('googleUser');
    if (googleUser) {
        console.log('Usuário está autenticado com o Google.');
    } else {
        console.log('Usuário não está autenticado com o Google.');
    }
}

// Função para salvar as informações de cadastro localmente
function saveCadastroInfo(nome, sobrenome, cpf, email, telefone, senha) {
    const user = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        senha: senha
    };
    localStorage.setItem('cadastroUsuario', JSON.stringify(user));
    console.log('Informações de cadastro salvas:', user);
}

// Função para redirecionar para uma página
function navigateTo(page) {
    console.log('Redirecionando para a página:', page);
    window.location.href = `${page}.html`; // Redireciona para a página especificada
}
