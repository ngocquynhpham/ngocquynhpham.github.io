let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = true;
let message = "Want to play a round?";

let player = {
  name: "Ngoc Quynh",
  chips: 145
}

const messageEl = document.getElementById("messageEl");
const sumEl = document.getElementById("sumEl");
const cardEl = document.getElementById("cardEl");
const startGameBtn = document.getElementById("startGameBtn");
const newCardBtn = document.getElementById("newCardBtn");
const playerEl = document.getElementById("player-el");

playerEl.textContent = player.name + ": $" + player.chips;

const updateStateBtn =  () => {
  if (isAlive && !hasBlackJack) {
    newCardBtn.disabled = false;
    startGameBtn.disabled = true;
  }
  else if (hasBlackJack || !isAlive) {
    newCardBtn.disabled = true;
    startGameBtn.disabled = false;
  }
}
const startGame = () => {
  isAlive = true
  let firstCard = getRandomCard()
  let secondCard = getRandomCard()
  cards = [firstCard, secondCard]
  sum = firstCard + secondCard
  renderGame();
};

const updateMess = (mess) => {
  if (!mess) return;
  messageEl.textContent = mess;
};
function getRandomCard () {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
};
const updateCard = (cards) => {
  if (cards.length === 0) return;
  cardEl.textContent = cards.join(" ");
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
     startGameBtn.disabled = false;
  }
  updateMess(message);
  updateSum(sum);
  updateCard(cards);
  updateStateBtn();
};

const newCard = () => {
 if(isAlive && !hasBlackJack) {
    let newCard = getRandomCard();
    sum += newCard;
    cards.push(newCard);
    renderGame();
  }
};
