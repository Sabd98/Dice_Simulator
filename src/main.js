import "./style.css";

// Fungsi angka random
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

document.querySelector("#app").innerHTML = `
 <div class="container">
      <h1>Silahkan Klik</h1>

      <div class="dice">
        <p>Player 1</p>
        <img class="dice-img" />
      </div>

      <div class="dice">
        <p>Player 2</p>
        <img class="dice-img"  />
      </div>
    </div>
    <footer>By: Sabda Avicenna</footer>
`;

// setupCounter(document.querySelector("#counter"));
const diceImages = document.querySelectorAll('.dice-img');

// Tambahkan event listener ke setiap gambar
diceImages.forEach(img => {
  // Roll awal saat pertama kali load
  img.src = `/public/dice${rollDice()}.svg`;
  
  // Event click untuk roll ulang
  img.addEventListener('click', function() {
    const newNumber = rollDice();
    this.src = `/public/dice${newNumber}.svg`;
    
    // Optional: Tambahkan efek animasi
    this.style.transform = 'rotate(360deg)';
    this.style.transition = 'transform 0.5s';
    
    setTimeout(() => {
      this.style.transform = 'rotate(0deg)';
    }, 500);

    // Update status pemenang
  const allNumbers = Array.from(diceImages).map(img => 
    parseInt(img.src.match(/dice(\d)\.svg/)[1])
  );
  
  const resultText = allNumbers[0] === allNumbers[1] 
    ? "Draw!" 
    : `Winner: Player ${allNumbers[0] > allNumbers[1] ? 1 : 2}`;
  
  document.querySelector('h1').textContent = resultText;
  });
});


// Jalankan game ketika DOM siap
document.addEventListener('DOMContentLoaded', initGame);
 