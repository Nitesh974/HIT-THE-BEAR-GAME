const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
let score = 0;

const sound = new Audio('assets/Punch.mp3');
const timeUpSound = new Audio('assets/time-up.mp3');

function run() {
  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];
  let timer = null;

  const img = document.createElement('img');
  img.classList.add('mole');
  img.src = 'assets/happy.png';

  img.addEventListener('click', () => {
    score += 10;
    sound.play();
    scoreEl.textContent = score;
    img.src = 'assets/sad.png';
    clearTimeout(timer);
    setTimeout(() => {
      hole.removeChild(img);
      run();
    }, 500);
  });

  hole.appendChild(img);

  timer = setTimeout(() => {
    hole.removeChild(img);
    run();
  }, 1250);
}
run();

window.addEventListener('mousemove', (e) => {
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
});
window.addEventListener('mousedown', () => {
  cursor.classList.add('active');
});
window.addEventListener('mouseup', () => {
  cursor.classList.remove('active');
});

/* Timer and Page Refresh */
const startingMinutes = 0.5;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('countdown');
const scoreDisplay = document.getElementById('scoreDisplay');
const resetButton = document.getElementById('reset');
let intervalId;
function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  countdownEl.innerHTML = `${minutes}:${seconds}`;
  if (time > 0) {
    time--;
  } else {
    clearInterval(intervalId);
    timeUpSound.play();
    setTimeout(() => {
      alert(`Time's up!\nYour score: ${score}`);
      location.reload();
    }, 500);
  }
}
intervalId = setInterval(updateCountdown, 1000);
resetButton.addEventListener('click', function () {
  time = startingMinutes * 60;
});
