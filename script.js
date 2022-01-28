'use strict';

const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll')
const playerOne = document.querySelector('.player--0')
const playerTwo = document.querySelector('.player--1')
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
const bothPlayers = document.querySelectorAll('.player')
const divCurrent = document.querySelectorAll('.current')


let activePlayer = 0
let currentScore = 0
let totalScore = [0, 0]
let play = true

btnHold.disabled = true
dice.classList.add('hidden')

btnRoll.addEventListener('click', rollTheDice)
btnHold.addEventListener('click', leaveGlasses)

btnNew.addEventListener('click', newGame)

function rollTheDice() {
   if (play) {
      const randomNumber = Math.trunc(Math.random() * 6) + 1
      const currentPlayer = document.getElementById(`current--${activePlayer}`)
      dice.src = `img/dice${randomNumber}.png`
      dice.classList.remove('hidden')
      if (randomNumber !== 1) {
         currentScore += randomNumber
         currentPlayer.textContent = currentScore
         btnHold.disabled = false
      }
      else
      { 
         changePlayer(currentPlayer)
      }
   }
}

function leaveGlasses() {
   if (play) {
      totalScore[activePlayer] += currentScore
      const currentTotalScorePlayer = document.getElementById(`score--${activePlayer}`);
      currentTotalScorePlayer.textContent = totalScore[activePlayer]
      const currentPlayer = document.getElementById(`current--${activePlayer}`)

      if (totalScore[activePlayer] >= 200) {
         for (let i = 0; i < divCurrent.length; i++) {
            divCurrent[i].classList.remove('active')
         }
         dice.classList.add('hidden')
         for (let i = 0; i < bothPlayers.length; i++) {
            bothPlayers[i].classList.remove('player--active')
         }
         
         const aPlayerWhoHasFallen = document.querySelector(`.player--${activePlayer}`)
            aPlayerWhoHasFallen.classList.add('player--winner')
         const winner = document.querySelector(`.winner--${activePlayer}`)
            winner.style.display = 'block'
            activePlayer = activePlayer === 0 ? 1 : 0
         const losingPlayer = document.querySelector(`.player--${activePlayer}`)
            losingPlayer.classList.add('player--losing')
         const losing = document.querySelector(`.losing--${activePlayer}`)
            losing.style.display = 'block'

            btnRoll.style.display = 'none'
            btnHold.style.display = 'none'
         play = false
      }
      else 
      {
         changePlayer(currentPlayer)
      }
   }
}

function changePlayer(player) {
   currentScore = 0
   player.textContent =  currentScore
   playerOne.classList.toggle('player--active')
   playerTwo.classList.toggle('player--active')
   activePlayer = activePlayer === 0 ? 1 : 0
}

function newGame() {
   document.querySelector(`.winner--0`).style.display = 'none'
   document.querySelector(`.winner--1`).style.display = 'none'
   document.querySelector(`.losing--0`).style.display = 'none'
   document.querySelector(`.losing--1`).style.display = 'none'
   activePlayer = 0
   currentScore = 0
   totalScore = [0, 0]

      document.getElementById('score--0').textContent = currentScore
      document.getElementById('score--1').textContent = currentScore
      document.getElementById('current--0').textContent = currentScore
      document.getElementById('current--1').textContent = currentScore
      for (let i = 0; i < bothPlayers.length; i++) {
         bothPlayers[i].classList.remove('player--winner', 'player--losing')
      }

      bothPlayers[0].classList.add('player--active')

      for (let i = 0; i < divCurrent.length; i++) {
         divCurrent[i].classList.add('active')
      }

      btnRoll.style.display = 'block'
      btnHold.style.display = 'block'
      play = true
}