document.addEventListener('DOMContentLoaded', function() {
    const dataInput = document.getElementById('data-reserva');
    const today = new Date().toISOString().split('T')[0];
    dataInput.setAttribute('min', today);

    // Fechar o popup ao pressionar "Esc"
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeReservaPopup();
        }
    });

    // Inicializar autenticação do Google após o carregamento da página
    onLoad();

    // Adicionar evento de submissão ao formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            login();
        });
    }

    // Adicionar evento de submissão ao formulário de cadastro de empresa
    const empresaForm = document.getElementById('empresa-form');
    if (empresaForm) {
        empresaForm.addEventListener('submit', function(event) {
            event.preventDefault();
            cadastrarEmpresa();
        });
    }
});

// Objeto para armazenar as reservas
const reservas = {};

function openReservaPopup(quadraNome) {
    document.getElementById('quadra-nome').textContent = quadraNome;
    document.getElementById('reserva-popup').style.display = 'flex';
    populateAvailableTimes();
}

function closeReservaPopup() {
    document.getElementById('reserva-popup').style.display = 'none';
}

function populateAvailableTimes() {
    const timeSelect = document.getElementById('hora-reserva');
    const data = document.getElementById('data-reserva').value;
    const quadra = document.getElementById('quadra-nome').textContent;

    // Verificar se já existem reservas para a data e quadra selecionadas
    const reservasQuadraData = reservas[quadra]?.[data] || [];

    timeSelect.innerHTML = '';
    const times = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00',
                   '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00', '22:00 - 23:00', '23:00 - 00:00'];
    times.forEach(time => {
        if (!reservasQuadraData.includes(time)) {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        }
    });

    // Verificar se não há horários disponíveis e desativar a data se necessário
    if (timeSelect.options.length === 0) {
        alert(`Todos os horários para ${data} estão reservados. Por favor, escolha outra data.`);
        document.getElementById('data-reserva').value = '';
    }
}

function reservar() {
    const data = document.getElementById('data-reserva').value;
    const hora = document.getElementById('hora-reserva').value;
    const quadra = document.getElementById('quadra-nome').textContent;

    if (!data || !hora) {
        alert('Por favor, selecione uma data e horário válidos.');
        return;
    }

    // Armazenar a reserva
    if (!reservas[quadra]) {
        reservas[quadra] = {};
    }
    if (!reservas[quadra][data]) {
        reservas[quadra][data] = [];
    }
    reservas[quadra][data].push(hora);

    alert(`Quadra ${quadra} reservada para ${data} às ${hora}.`);
    closeReservaPopup();

    // Atualizar as opções disponíveis
    populateAvailableTimes();
}

function validateCadastroForm() {
    const nome = document.getElementById('nome-cadastro').value;
    const sobrenome = document.getElementById('sobrenome-cadastro').value;
    const cpf = document.getElementById('cpf-cadastro').value;
    const email = document.getElementById('email-cadastro').value;
    const telefone = document.getElementById('telefone-cadastro').value;
    const senha = document.getElementById('senha-cadastro').value;
    const senhaRepetida = document.getElementById('senha-repetida-cadastro').value;

    if (!nome || !sobrenome || !cpf || !email || !telefone || !senha || !senhaRepetida) {
        alert('Todos os campos são obrigatórios.');
        return false;
    }

    if (senha !== senhaRepetida) {
        alert('As senhas não coincidem.');
        return false;
    }

    alert('Cadastro realizado com sucesso!');
    return true;
}

function navigateTo(page) {
    window.location.href = page;
}

function signInWithGoogle() {
    auth2.signIn().then(function (googleUser) {
        const profile = googleUser.getBasicProfile();
        document.getElementById('nome-cadastro').value = profile.getGivenName();
        document.getElementById('sobrenome-cadastro').value = profile.getFamilyName();
        document.getElementById('email-cadastro').value = profile.getEmail();
    });
}

function onLoad() {
    gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID', // Substitua pelo seu Client ID
            scope: 'profile email'
        });
    });
}

// Função para realizar login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Por favor, preencha todos os campos de login.');
        return;
    }

    // Simulação de autenticação
    alert(`Usuário ${username} logado com sucesso!`);
    // Aqui você pode adicionar a lógica de autenticação real
}

// Função para cadastrar empresa
function cadastrarEmpresa() {
    const nomeEmpresa = document.getElementById('empresa-nome').value;
    const endereco = document.getElementById('empresa-endereco').value;
    const telefone = document.getElementById('empresa-telefone').value;
    const email = document.getElementById('empresa-email').value;
    const quantidadeQuadras = document.getElementById('empresa-quadras').value;
    const valorAluguel = document.getElementById('empresa-valor').value;

    if (!nomeEmpresa || !endereco || !telefone || !email || !quantidadeQuadras || !valorAluguel) {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    // Simulação de cadastro
    alert(`Empresa ${nomeEmpresa} cadastrada com sucesso!`);
    // Aqui você pode adicionar a lógica de cadastro real
}
