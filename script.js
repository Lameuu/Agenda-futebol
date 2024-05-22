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

    // Verifica se o nome contém apenas letras e espaços
    if (!/^[a-zA-Z\s]+$/.test(nome)) {
        alert('O campo nome só pode conter letras e espaços.');
        return false;
    }

    // Verifica se o sobrenome contém apenas letras e espaços
    if (!/^[a-zA-Z\s]+$/.test(sobrenome)) {
        alert('O campo sobrenome só pode conter letras e espaços.');
        return false;
    }

    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
        alert('CPF inválido. Certifique-se de que contém 11 dígitos numéricos.');
        return false;
    }

    // Verifica se o email possui um formato válido
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Email inválido.');
        return false;
    }

    // Verifica se o telefone possui apenas números e tem entre 10 e 11 dígitos
    if (!/^\d{10,11}$/.test(telefone)) {
        alert('Telefone inválido. Certifique-se de que contém apenas números e tem entre 10 e 11 dígitos.');
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
