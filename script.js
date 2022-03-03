'use strict'

const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll')
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')

let scores, activePlayer, currentScore, playing

const init = () => {
  scores = [0, 0]
  activePlayer = 0
  currentScore = 0
  playing = true

  current0El.textContent = 0
  current1El.textContent = 0
  score0El.textContent = 0
  score1El.textContent = 0

  diceEl.classList.add('hidden')
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
}

init()

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

//Roll dice logic
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate random number
    const dice = Math.trunc(Math.random() * 6) + 1

    //Display dice roll
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${dice}.png`

    //checked for rolled dice
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore
      // current0El.textContent = currentScore
    } else {
      //switch to next player
      switchPlayer()
    }
  }
})

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add currentscore to global score
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]

    //check if score >= 100
    //finish game
    if (scores[activePlayer] >= 100) {
      playing = false
      diceEl.classList.add('hidden')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active')
    } else {
      //switch player
      switchPlayer()
    }
  }
})

btnNew.addEventListener('click', init)
