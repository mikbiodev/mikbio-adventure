const startButton = document.getElementById('start-game');
const playerNameInput = document.getElementById('player-name');
const characterOptions = document.querySelectorAll('.character');
const gameContainer = document.getElementById('game-container');
const hud = document.getElementById('hud');
const playerNameDisplay = document.getElementById('player-name-display');

const character = document.getElementById('character');
const platforms = document.querySelectorAll('.platform');
const scripts = document.getElementById('scripts');
const obstacle = document.getElementById('obstacle');

let selectedCharacter = null;
let playerName = '';
let xp = 0;
let level = 1;

// Character Selection
characterOptions.forEach(option => {
  option.addEventListener('click', () => {
    // Clear previous selection
    characterOptions.forEach(opt => opt.classList.remove('selected'));
    // Highlight selected character
    option.classList.add('selected');
    // Store the selected character type
    selectedCharacter = option.dataset.character;
  });
});

// Start Game Button
startButton.addEventListener('click', () => {
  const playerNameValue = playerNameInput.value.trim();

  // Ensure both a name and character are selected
  if (!playerNameValue) {
    alert('Please enter your name!');
    return;
  }
  if (!selectedCharacter) {
    alert('Please select a character!');
    return;
  }

  // Store player name and display it in the HUD
  playerName = playerNameValue;
  playerNameDisplay.textContent = playerName;

  // Hide selection screen and show game container
  document.getElementById('player-selection').classList.add('hidden');
  gameContainer.classList.remove('hidden');
  hud.classList.remove('hidden');
});

// Game Logic
let isJumping = false;
let velocity = 0;
const gravity = 0.5;

// Character Movement
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') moveRight();
  if (e.key === 'ArrowLeft') moveLeft();
  if (e.key === ' ') jump();
});

function moveRight() {
  const currentLeft = parseInt(character.style.left || '50');
  character.style.left = `${currentLeft + 5}px`;
}

function moveLeft() {
  const currentLeft = parseInt(character.style.left || '50');
  character.style.left = `${currentLeft - 5}px`;
}

function jump() {
  if (isJumping) return;
  isJumping = true;
  velocity = -10;
}

function update() {
  const currentBottom = parseInt(character.style.bottom || '50');
  velocity += gravity;
  character.style.bottom = `${Math.max(0, currentBottom - velocity)}px`;

  platforms.forEach(platform => {
    const platformRect = platform.getBoundingClientRect();
    const characterRect = character.getBoundingClientRect();
    if (
      characterRect.bottom >= platformRect.top &&
      characterRect.left < platformRect.right &&
      characterRect.right > platformRect.left
    ) {
      velocity = 0;
      isJumping = false;
      character.style.bottom = `${platform.offsetTop - 50}px`;
    }
  });
}

setInterval(update, 20);
