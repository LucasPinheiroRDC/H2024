const countdownElement = document.getElementById('countdown');
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


document.getElementById('photosBtn').addEventListener('click', () => {
    showMessage('Aqui você veria as fotos da festa! 📸');
});

document.getElementById('voteBtn').addEventListener('click', () => {
    showMessage('Aqui você seria levado ao formulário de votação! 🗳️');
});

