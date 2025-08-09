let firstCard = 10;
let secondCard = 11;
let sum = firstCard + secondCard;
let hasBlackJack = false;
let isAlive = true;
let message = "Want to play a round?";

const messageEl = document.getElementById("messageEl");
const sumEl = document.getElementById("sumEl");
const cardEl = document.getElementById("cardEl");
const startGame = () => {
  renderGame();
};
const updateMess = (mess) => {
  if (!mess) return;
  messageEl.textContent = mess;
};
const updateCard = (isFirstCard, isSecondCard) => {
  if (!isFirstCard && !isSecondCard) return;
  cardEl.textContent = `${isFirstCard} ${isSecondCard}`;
};
const updateSum = (isSum) => {
  if (!isSum) return;
  sumEl.textContent = isSum;
};
const renderGame = () => {
  if (sum <= 20) {
    message = "Do you want to draw a new card? 🙂";
  } else if (sum === 21) {
    message = "Wohoo! You've got Blackjack! 🥳";
    hasBlackJack = true;
  } else {
    message = "You're out of the game! 😭";
    isAlive = false;
  }
  updateMess(message);
  updateSum(sum);
  updateCard(firstCard, secondCard);
};

const newCard = () => {
  let newCard = 7;

  sum += newCard;

  renderGame();
};
