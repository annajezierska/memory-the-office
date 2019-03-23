const cards = document.querySelectorAll(".memoryCard");
let cardIsFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
const button = document.querySelector('.play')

button.addEventListener('click', shuffle)
const checkForMatch = () => {
  let isMatch = firstCard.dataset.frame === secondCard.dataset.frame
  isMatch ? disableCards() : unflipCards();
  }

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard()
};
function unflipCards() {
    lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 1500);
};
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  this.classList.toggle("flip");
  if (!cardIsFlipped) {
    cardIsFlipped = true;
    firstCard = this;
  } else {
    cardIsFlipped = false;
    secondCard = this;
    checkForMatch();
  }
}
function resetBoard(){
    [cardIsFlipped, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}
function shuffle() {
    cards.forEach(card => {
      card.classList.remove("flip");
    let randomPosition = Math.floor(Math.random() * 12)
    card.style.order = randomPosition
    card.addEventListener("click", flipCard)
    })
}
cards.forEach(card => card.addEventListener("click", flipCard));
shuffle()
