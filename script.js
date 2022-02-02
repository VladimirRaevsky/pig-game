'use strict';

const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const bothPlayers = document.querySelectorAll('.player');
const divCurrent = document.querySelectorAll('.current');
const totalDiv = document.querySelector('.total');

let activePlayer, currentScore, totalScore, play, total;

newGame();

btnRoll.addEventListener('click', rollTheDice);
btnHold.addEventListener('click', leaveGlasses);
btnNew.addEventListener('click', newGame);

function rollTheDice() {
  if (play) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    const currentPlayer = document.getElementById(`current--${activePlayer}`);

    dice.src = `img/dice${randomNumber}.png`;
    dice.classList.remove('hidden');

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      currentPlayer.textContent = currentScore;
      btnHold.disabled = false;
    } else {
      changePlayer(currentPlayer);
    }
  }
}

function leaveGlasses() {
  if (play) {
    totalScore[activePlayer] += currentScore;
    const currentTotalScorePlayer = document.getElementById(
      `score--${activePlayer}`
    );
    const currentPlayer = document.getElementById(`current--${activePlayer}`);
    const itRemainsToScorePoints = document.querySelector(
      `.points-left--${activePlayer}`
    );

    if ((total - totalScore[activePlayer]) <= 20) {
      itRemainsToScorePoints.style.backgroundColor = 'rgb(77, 230, 31)';
    } 
    if ((total - totalScore[activePlayer]) <= 10) {
      itRemainsToScorePoints.style.backgroundColor = 'red';
    }

    itRemainsToScorePoints.textContent = total - totalScore[activePlayer];
    currentTotalScorePlayer.textContent = totalScore[activePlayer];

    if (totalScore[activePlayer] >= total) {
      for (let i = 0; i < divCurrent.length; i++) {
        divCurrent[i].classList.remove('active');
      }

      aquamarineBackground();
      dice.classList.add('hidden');

      for (let i = 0; i < bothPlayers.length; i++) {
        bothPlayers[i].classList.remove('player--active');
      }

      const aPlayerWhoHasFallen = document.querySelector(
        `.player--${activePlayer}`
      );
      const winner = document.querySelector(`.winner--${activePlayer}`);

      aPlayerWhoHasFallen.classList.add('player--winner');
      winner.style.display = 'block';

      activePlayer = activePlayer === 0 ? 1 : 0;

      const losingPlayer = document.querySelector(`.player--${activePlayer}`);
      const losing = document.querySelector(`.losing--${activePlayer}`);

      losingPlayer.classList.add('player--losing');
      losing.style.display = 'block';

      btnRoll.style.display = 'none';
      btnHold.style.display = 'none';
      play = false;
    } else {
      changePlayer(currentPlayer);
    }
  }
}

function changePlayer(player) {
  currentScore = 0;
  player.textContent = currentScore;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function newGame() {
  total = 0;
  totalDiv.textContent = total;
  activePlayer = 0;
  currentScore = 0;
  totalScore = [0, 0];
  play = true;
  btnHold.disabled = true;
  dice.classList.add('hidden');

  document.querySelector(`.winner--0`).style.display = 'none';
  document.querySelector(`.winner--1`).style.display = 'none';
  document.querySelector(`.losing--0`).style.display = 'none';
  document.querySelector(`.losing--1`).style.display = 'none';
  document.getElementById('score--0').textContent = currentScore;
  document.getElementById('score--1').textContent = currentScore;
  document.getElementById('current--0').textContent = currentScore;
  document.getElementById('current--1').textContent = currentScore;
  aquamarineBackground();

  for (let i = 0; i < bothPlayers.length; i++) {
    bothPlayers[i].classList.remove('player--winner', 'player--losing');
  }

  bothPlayers[0].classList.add('player--active');

  for (let i = 0; i < divCurrent.length; i++) {
    divCurrent[i].classList.add('active');
  }

  btnRoll.style.display = 'block';
  btnHold.style.display = 'block';

  setTimeout(() => {
    total = Number(prompt('Введите число до которого играем!'));
    if (total) {
      totalDiv.textContent = total;
      play = true;
      return;
    }
    play = false;
  }, 2000);
}

function aquamarineBackground() {
  document.querySelector(`.points-left--0`).style.backgroundColor =
    'Aquamarine';
  document.querySelector(`.points-left--1`).style.backgroundColor =
    'Aquamarine';
  document.querySelector(`.points-left--0`).textContent = 0;
  document.querySelector(`.points-left--1`).textContent = 0;
}
