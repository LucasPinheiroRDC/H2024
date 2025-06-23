// Seleciona o elemento HTML onde a contagem regressiva será exibida
const countdownElement = document.getElementById('countdown');
// Seleciona o container onde os morcegos serão adicionados
const batContainer = document.getElementById('bat-container');
// Seleciona o modal de mensagens e o texto dentro dele
const messageModal = document.getElementById('message-modal');
const modalText = document.getElementById('modal-text');

// ===============================================
// FUNÇÃO PARA EXIBIR MENSAGENS TEMPORÁRIAS (substitui alert())
// ===============================================
function showMessage(message) {
    modalText.textContent = message; // Define o texto da mensagem
    messageModal.classList.add('show'); // Adiciona a classe 'show' para exibir o modal

    // Define um tempo para esconder o modal após 3 segundos (tempo da animação fadeInOut)
    setTimeout(() => {
        messageModal.classList.remove('show'); // Remove a classe 'show' para esconder o modal
    }, 3000);
}


// ===============================================
// LÓGICA DA CONTAGEM REGRESSIVA
// ===============================================
function updateCountdown() {
    const now = new Date(); // Pega a data e hora atuais
    // Define o dia 27 de Outubro. O mês é 9 porque é 0-indexado (Janeiro = 0, Outubro = 9)
    let targetYear = now.getFullYear(); // Começa com o ano atual
    let targetDate = new Date(targetYear, 9, 31);

    // Se a data atual já passou de 31 de Outubro deste ano,
    // a contagem regressiva é para 31 de Outubro do próximo ano.
    if (now > targetDate) {
        targetYear++;
        targetDate.setFullYear(targetYear);
    }

    // Calcula a diferença de tempo em milissegundos
    const timeDifference = targetDate - now;

    // Se o tempo acabou (chegou o Halloween)
    if (timeDifference <= 0) {
        countdownElement.innerHTML = "É Halloween! 🎃"; // Mensagem de Halloween
        return; // Sai da função
    }

    // Calcula dias, horas, minutos e segundos restantes
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Atualiza o conteúdo do elemento da contagem regressiva
    // Formatação vertical com quebras de linha
    countdownElement.innerHTML = `
        <span>${days} Dias</span>
        <span>${hours} Horas</span>
        <span>${minutes} Minutos</span>
        <span>${seconds} Segundos</span>
    `;
}

// Atualiza a contagem regressiva a cada segundo (1000 milissegundos)
setInterval(updateCountdown, 1000);
// Chama a função uma vez imediatamente para exibir a contagem ao carregar a página
updateCountdown();

// ===============================================
// LÓGICA DA ANIMAÇÃO DOS MORCEGOS
// ===============================================
const numberOfBats = 8; // Define quantos morcegos aparecerão na tela

function createBat() {
    const bat = document.createElement('div'); // Cria um novo elemento div
    bat.classList.add('bat'); // Adiciona a classe 'bat' para aplicar o estilo CSS
    batContainer.appendChild(bat); // Adiciona o morcego ao container de morcegos

    // Define as posições iniciais e finais aleatórias para o voo dos morcegos
    // Morcegos começam fora da tela à esquerda (-10 a -30vw) e terminam à direita (110 a 130vw)
    const startX = -10 - (Math.random() * 20);
    const startY = Math.random() * 100; // Posição vertical aleatória (0 a 100vh)
    const endX = 110 + (Math.random() * 20);
    const endY = Math.random() * 100; // Posição vertical aleatória (0 a 100vh)

    // Define variáveis CSS personalizadas para cada morcego, permitindo animações variadas
    bat.style.setProperty('--start-x', startX);
    bat.style.setProperty('--start-y', startY);
    bat.style.setProperty('--end-x', endX);
    bat.style.setProperty('--end-y', endY);
    // Rotação aleatória para dar mais naturalidade ao voo (-15 a 15 graus)
    bat.style.setProperty('--rotation', `${Math.random() * 30 - 15}deg`);
    // Duração da animação do voo aleatória (8 a 13 segundos)
    bat.style.setProperty('--animation-duration', `${Math.random() * 5 + 8}s`);
    // Atraso inicial negativo para que os morcegos apareçam em momentos diferentes desde o início
    bat.style.animationDelay = `-${Math.random() * 5}s`;

    // Quando a animação de um morcego termina, ele é removido e um novo é criado
    // Isso cria um ciclo contínuo de morcegos voando
    bat.addEventListener('animationend', () => {
        bat.remove(); // Remove o morcego atual do DOM
        createBat(); // Cria um novo morcego para continuar a animação
    });
}

// Cria o número inicial de morcegos ao carregar a página
for (let i = 0; i < numberOfBats; i++) {
    createBat();
}

// ===============================================
// FUNCIONALIDADE DOS BOTÕES
// ===============================================

// Event listener para o botão "Ver Fotos da Festa"
document.getElementById('photosBtn').addEventListener('click', () => {
    // Exibe uma mensagem temporária
    showMessage('Aqui você veria as fotos da festa! 📸 (Funcionalidade a ser implementada)');
    // Para realmente levar para uma página de fotos, você usaria:
    // window.location.href = 'fotos.html';
});

// Event listener para o botão "Votar na Melhor Fantasia"
document.getElementById('voteBtn').addEventListener('click', () => {
    // Exibe uma mensagem temporária
    showMessage('Aqui você seria levado ao formulário de votação! 🗳️ (Funcionalidade a ser implementada)');
    // Para realmente levar para uma página de votação, você usaria:
    // window.location.href = 'votacao.html';
});
