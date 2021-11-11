"use strict";
const player0E1 = document.querySelector(".player--0");
const player1E1 = document.querySelector(".player--1");

const score0E1 = document.querySelector("#score--0");
const score1E2 = document.getElementById("score--1");
const current0E1 = document.getElementById("current--0");
const current0E2 = document.getElementById("current--1");
const diceE1 = document.querySelector(".dice");
const BtnNew = document.querySelector(".btn--new");
const BtnRoll = document.querySelector(".btn--roll");
const BtnHold = document.querySelector(".btn--hold");

let score, currentScore, activePlayer, playing;
//starting conditions:

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0E1.textContent = 0;
  score1E2.textContent = 0;
  current0E1.textContent = 0;
  current0E2.textContent = 0;
  diceE1.classList.add("hidden");

  player0E1.classList.remove("player--winner");
  player1E1.classList.remove("player--winner");
  player0E1.classList.add("player--active");
  player1E1.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0E1.classList.toggle("player--active");
  player1E1.classList.toggle("player--active");
};
//rolling dice conditions

BtnRoll.addEventListener("click", function () {
  if (playing) {
    //1: generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2:Display the dice
    diceE1.classList.remove("hidden");
    diceE1.src = `dice-${dice}.PNG`;
    //3:Check for rolled 1,
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

BtnHold.addEventListener("click", function () {
  if (playing) {
    //Add current score to active player.
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //check score is >=100
    if (score[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceE1.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--active`);
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

BtnNew.addEventListener("click", init);
