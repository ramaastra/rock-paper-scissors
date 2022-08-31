const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-btn')
const rules = document.querySelector('.rules');
const options = document.querySelector('.options');
const versus = document.querySelector('.versus');
const player = document.querySelector('.player .option');
const house = document.querySelector('.house .option');
const scoreText = document.querySelector('.score span');
const arena = document.querySelector('.arena');
const result = document.querySelector('.result');
const resultText = document.querySelector('.result span');
const playAgainBtn = document.querySelector('.play-again-btn');

let desktopWidth = window.matchMedia("(min-width: 769px)");

if (desktopWidth.matches) arena.insertBefore(result, house.parentElement);

desktopWidth.addEventListener('change', (e) => {
  e.target.matches ? arena.insertBefore(result, house.parentElement) : versus.appendChild(result);
});

const optionsList = ['scissors', 'spock', 'paper', 'lizard', 'rock'];

const boxShadows = {
  scissors: `0 4px 0 0px hsl(40, 84%, 35%)`,
  spock: `0 4px 0 0px hsl(189, 58%, 39%)`,
  paper: `0 4px 0 0px hsl(230, 89%, 50%)`,
  lizard: `0 4px 0 0px hsl(261, 72%, 48%)`,
  rock: `0 4px 0 0px hsl(349, 70%, 33%)`
};

const winnerEffect = [
  `, 0 0 0 10px rgba(255, 255, 255, 0.025)`,
  `, 0 0 0 25px rgba(255, 255, 255, 0.025)`,
  `, 0 0 0 45px rgba(255, 255, 255, 0.025)`
];

let playerChoice, houseChoice;
let score = 0;
let delay = 500;

const resetElements = () => {
  resultText.style.visibility = playAgainBtn.style.visibility = 'hidden';
  resultText.style.opacity = playAgainBtn.style.opacity = 0;
  house.classList.add('blank');
  player.id = house.id =
    player.children[0].src = house.children[0].src =
    player.style.boxShadow =
    house.style.boxShadow = '';
}

const show = (section) => {
  section === versus ? options.style.display = 'none' : versus.style.display = 'none';
  section.style.display = 'flex';
}

const setPlayerChoice = (choice) => {
  player.id = choice;
  player.children[0].src = `images/icon-${choice}.svg`;
}

const setHouseChoice = () => {
  let houseChoice = optionsList[Math.floor(Math.random() * 5)];

  setTimeout(() => {
    house.classList.remove('blank');
    house.id = houseChoice;
    house.children[0].src = `images/icon-${houseChoice}.svg`;
  }, delay)

  return houseChoice;
}

const getResult = (playerChoice, houseChoice) => {
  let result;

  switch (playerChoice) {
    case houseChoice:
      result = 'DRAW';
      break;
    case 'scissors':
      houseChoice === 'paper' || houseChoice === 'lizard' ? result = 'YOU WIN' : result = 'YOU LOSE';
      break;
    case 'paper':
      houseChoice === 'rock' || houseChoice === 'spock' ? result = 'YOU WIN' : result = 'YOU LOSE';
      break;
    case 'rock':
      houseChoice === 'lizard' || houseChoice === 'scissors' ? result = 'YOU WIN' : result = 'YOU LOSE';
      break;
    case 'lizard':
      houseChoice === 'spock' || houseChoice === 'paper' ? result = 'YOU WIN' : result = 'YOU LOSE';
      break;
    case 'spock':
      houseChoice === 'scissors' || houseChoice === 'rock' ? result = 'YOU WIN' : result = 'YOU LOSE';
      break;
  }

  setTimeout(() => {
    resultText.innerHTML = result;

    if (result === 'YOU WIN') {
      scoreText.innerText = ++score;
      player.style.boxShadow = boxShadows[player.id];
      addWinnerEffect(player);
    } else if (result === 'YOU LOSE') {
      house.style.boxShadow = boxShadows[house.id];
      addWinnerEffect(house);
    }

    setTimeout(() => {
      resultText.style.visibility = 'visible';
      resultText.style.opacity = 1;
    }, delay);

    setTimeout(() => {
      playAgainBtn.style.visibility = 'visible';
      playAgainBtn.style.opacity = 1;
    }, delay * 2);

  }, delay);
}

const addWinnerEffect = (winner) => {
  for (let i = 0; i < winnerEffect.length; i++) {
    setTimeout(() => {
      winner.style.boxShadow += winnerEffect[i];
    }, 70 * i);
  }
}

rulesBtn.addEventListener('click', () => {
  rules.style.visibility = 'visible';
  rules.style.opacity = 1;
});

closeBtn.addEventListener('click', () => {
  rules.style.visibility = 'hidden';
  rules.style.opacity = 0;
});

options.addEventListener('click', (e) => {
  if (e.target.classList.contains('option')) {
    show(versus);

    let playerChoice = e.target.id;
    setPlayerChoice(playerChoice);
    let houseChoice = setHouseChoice();

    getResult(playerChoice, houseChoice);
  }
});

playAgainBtn.addEventListener('click', () => {
  show(options);
  resetElements();
});