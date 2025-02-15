import "./style.css";

// Fungsi angka random
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Variabel state game
let currentPlayer = 1;
let player1Result = null;
let player2Result = null;

function InitGame() {
  document.querySelector("#app").innerHTML = `
 <div class="container">
       <h1>Player ${currentPlayer}'s Turn</h1>
      <div>
      <div class="dice">
        <p>Player 1</p>
        <img class="dice-img" data-player="1" src="/dice1.svg"/>
      </div>

      <div class="dice">
        <p>Player 2</p>
        <img class="dice-img"  data-player="2" src="/dice1.svg"/>
      </div>
      </div>
      
          <button class="restart-btn"> Ulang </button>

    </div>
    <footer>By: Sabda Avicenna</footer>
`;
initializeEventListeners();
}

function initializeEventListeners() {
  // Event listener untuk dadu
  const diceImages = document.querySelectorAll('.dice-img');
  diceImages.forEach(img => {
    img.addEventListener('click', handleDiceClick);
  });

  // Event listener untuk tombol restart
  document.querySelector('.restart-btn').addEventListener('click', Restart);
}

function handleDiceClick() {
  // Cek apakah ini giliran pemain yang benar
  const player = parseInt(this.getAttribute('data-player'));
  if (player !== currentPlayer) {
    alert(`Sekarang giliran Player ${currentPlayer}!`);
    return;
  }

  // Roll dadu
  const newNumber = rollDice();
  this.src = `/dice${newNumber}.svg`;
  
  // Simpan hasil
  if (player === 1) {
    player1Result = newNumber;
  } else {
    player2Result = newNumber;
  }

  // Animasi
  this.style.transform = 'rotate(360deg)';
  this.style.transition = 'transform 0.5s';
  setTimeout(() => {
    this.style.transform = 'rotate(0deg)';
  }, 500);

  // Cek apakah kedua pemain sudah roll
  if (player1Result !== null && player2Result !== null) {
    ShowResult();
    // Nonaktifkan klik dadu
    document.querySelectorAll('.dice-img').forEach(img => {
      img.style.pointerEvents = 'none';
    });
  } else {
    // Ganti giliran
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.querySelector('h1').textContent = `Player ${currentPlayer}'s Turn`;
  }
}



function ShowResult() {
  let resultText;
  if (player1Result === player2Result) {
    resultText = "Seri!";
  } else {
    resultText = `Pemenangnya: Player ${player1Result > player2Result ? 1 : 2}`;
  }

  document.querySelector("h1").textContent = resultText;
}

function Restart() {
  currentPlayer = 1;
  player1Result = null;
  player2Result = null;
  document.querySelector("h1").textContent = `Player ${currentPlayer}'s Turn`;
  document.querySelectorAll(".dice-img").forEach((img) => {
    img.src = "/dice1.svg";
  });
    // Hapus dan pasang kembali event listeners
    document.querySelectorAll('.dice-img').forEach(img => {
      img.removeEventListener('click', handleDiceClick);
      img.style.pointerEvents = 'auto';
    });
 
    initializeEventListeners();
}
document.addEventListener("DOMContentLoaded", InitGame);

