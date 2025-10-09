const countdownElement = document.getElementById('countdown');
const batContainer = document.getElementById('bat-container');
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

const numberOfBats = 8;

function createBat() {
    const bat = document.createElement('div');
    bat.classList.add('bat');
    batContainer.appendChild(bat);

    const startX = -10 - (Math.random() * 20);
    const startY = Math.random() * 100;
    const endX = 110 + (Math.random() * 20);
    const endY = Math.random() * 100;

    bat.style.setProperty('--start-x', startX);
    bat.style.setProperty('--start-y', startY);
    bat.style.setProperty('--end-x', endX);
    bat.style.setProperty('--end-y', endY);
    bat.style.setProperty('--rotation', `${Math.random() * 30 - 15}deg`);
    bat.style.setProperty('--animation-duration', `${Math.random() * 5 + 8}s`);
    bat.style.animationDelay = `-${Math.random() * 5}s`;

    bat.addEventListener('animationend', () => {
        bat.remove();
        createBat();
    });
}

for (let i = 0; i < numberOfBats; i++) {
    createBat();
}

document.getElementById('photosBtn').addEventListener('click', () => {
    showMessage('Aqui você veria as fotos da festa! 📸');
});

document.getElementById('voteBtn').addEventListener('click', () => {
    showMessage('Aqui você seria levado ao formulário de votação! 🗳️');
});
