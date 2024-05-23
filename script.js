document.addEventListener('DOMContentLoaded', function() {
    // Configurar a data mínima para o input de data de reserva
    const dataInput = document.getElementById('data-reserva');
    const today = new Date().toISOString().split('T')[0];
    dataInput.setAttribute('min', today);
});

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
    timeSelect.innerHTML = '';
    const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
    times.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

function reservar() {
    const data = document.getElementById('data-reserva').value;
    const hora = document.getElementById('hora-reserva').value;
    const quadra = document.getElementById('quadra-nome').textContent;
    
    if (!data || !hora) {
        alert('Por favor, selecione uma data e horário válidos.');
        return;
    }
    
    alert(`Quadra ${quadra} reservada para ${data} às ${hora}.`);
    closeReservaPopup();
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
    auth2.grantOfflineAccess().then(signInCallback);
}

function signInCallback(authResult) {
    if (authResult['code']) {
        // Enviar o código do authResult para o servidor
        console.log('Código de autenticação do Google:', authResult['code']);
        alert('Cadastro realizado com Google!');
    } else {
        alert('Falha na autenticação com Google.');
    }
}
