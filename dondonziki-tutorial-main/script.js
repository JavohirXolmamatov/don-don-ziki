window.addEventListener('DOMContentLoaded', () => {

    const restart = document.querySelector('#restart'),
        score = document.querySelector('#score'),
        choices = document.querySelector('.choices'),
        modal = document.querySelector('.modal');

    let player = null;
    let computer = null;
    let result = '';  // Result o'zgaruvchisini e'lon qilamiz

    let scorePlayer = 0;
    let scoreComputer = 0;

    // Player tanlovi
    function playerChoice () {
        choices.addEventListener('click', (event) => {
            if (event.target.tagName) {  // Faqat rasm elementlariga ishlov berish
                player = event.target;  // Player tanlagan element
                computer = computerChoice();  // Kompyuter tanlovini chaqirish

                // Ikkala tanlovni ko'rsatish
                console.log('Player choice:', player);
                console.log('Computer choice:', computer);

                // Natijalarni solishtirish
                checkWinner(player, computer);

                // modalga qushish va natijani ko'rsatish
                modal.innerHTML = `
                    <div id="result" class="modal-content">
                        <h1>${result}</h1>
                        <span class="fas fa-hand-${computer.id} fa-10x"></span>
                        <p>Computer choice: ${computer.id}</p>
                    </div>
                `;

                // Skorni yangilash
                score.innerHTML = `
                    <p>Player: ${scorePlayer}</p>
                    <p>Computer: ${scoreComputer}</p>
                `;

                // Modalni ko'rsatish
                modal.style.display = 'block';

                // Restart tugmasini ko'rsatish
                restart.style.display = 'block';
            }
        });
    }

    // Kompyuter tanlovi
    function computerChoice () {
        const randomNumber = Math.floor(Math.random() * 3);  // Tasodifiy son olish (0, 1, 2)
        return choices.children[randomNumber];  // Kompyuter tasodifiy element tanlaydi
    }

    // G'olibni aniqlash uchun funksiya
    function checkWinner(player, computer) {
        if (player.id === computer.id) {
            result = "It's a draw!";
        } else if ((player.id === 'rock' && computer.id === 'scissors') 
                    || (player.id === 'scissors' && computer.id === 'paper') 
                    || (player.id === 'paper' && computer.id === 'rock')) {
            result = 'Player wins!';
            scorePlayer++;
        } else {
            result = 'Computer wins!';
            scoreComputer++;
        }
    }

    // Modal oynasini yopish uchun windowga click hodisasini qo'shamiz
    window.addEventListener('click', (event) => {
        // Agar bosilgan joy modalning ichida bo'lmasa, modalni yopamiz
        if (!choices.contains(event.target) && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    // Restart tugmasi uchun hodisani bir marta o'rnatish
    restart.addEventListener('click', () => {
        scorePlayer = 0;
        scoreComputer = 0;
        score.innerHTML = `
            <p>Player: ${scorePlayer}</p>
            <p>Computer: ${scoreComputer}</p>
        `;
        modal.style.display = 'none';
        restart.style.display = 'none'; // Restart tugmasini yana yashirish
    });

    // O'yinni boshlash uchun playerChoice funksiyasini chaqiramiz
    playerChoice();

});
