const countdownElement = document.getElementById('countdown');
const spiderContainer = document.getElementById('spider-container');
const messageModal = document.getElementById('message-modal');
const modalText = document.getElementById('modal-text');

function showMessage(message) {
    modalText.textContent = message;
    messageModal.classList.add('show');
    setTimeout(() => {
        messageModal.classList.remove('show');
    }, 3000);
}

function updateCountdown() {
    const now = new Date();
    let targetYear = now.getFullYear();
    let targetDate = new Date(targetYear, 9, 31);

    if (now > targetDate) {
        targetYear++;
        targetDate.setFullYear(targetYear);
    }

    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
        countdownElement.innerHTML = "<span>É Halloween! 🎃</span>";
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
        <span>${days} Dias</span>
        <span>${hours} Horas</span>
        <span>${minutes} Minutos</span>
        <span>${seconds} Segundos</span>
    `;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Aranhas descendo do topo com linha de teia
const numberOfSpiders = 4;

function createSpider() {
    const thread = document.createElement('div');
    thread.classList.add('spider-thread');
    spiderContainer.appendChild(thread);

    const spider = document.createElement('div');
    spider.classList.add('spider');
    spider.textContent = '🕷️';
    spiderContainer.appendChild(spider);

    const leftPos = Math.random() * 30 + 35;
    const duration = Math.random() * 2 + 3;
    const threadLength = 170;

    thread.style.left = `${leftPos}%`;
    thread.style.top = '0';
    thread.style.setProperty('--thread-length', `${threadLength}px`);
    thread.style.animation = `threadGrow ${duration}s ease-in-out`;

    spider.style.left = `${leftPos}%`;
    spider.style.setProperty('--spider-start', '0px');
    spider.style.setProperty('--spider-end', `${threadLength - 10}px`);
    spider.style.animation = `spiderDrop ${duration}s ease-in-out`;

    spider.addEventListener('animationend', () => {
        spider.remove();
        thread.remove();
    });
}

// Criar aranhas iniciais
for (let i = 0; i < numberOfSpiders; i++) {
    setTimeout(() => createSpider(), i * 2500);
}

// Continuar criando aranhas
setInterval(() => {
    createSpider();
}, 2500);

document.getElementById('photosBtn').addEventListener('click', () => {
    showMessage('Aqui você veria as fotos da festa! 📸');
});

document.getElementById('voteBtn').addEventListener('click', () => {
    showMessage('Aqui você seria levado ao formulário de votação! 🗳️');
});
