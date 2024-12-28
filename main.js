import Cartas from './dataCards.js';

const spearr = Cartas.spearr
const horsee = Cartas.horsee
const archer = Cartas.archer

let grid = [
  {position: 0},
  {position: 1},
  {position: 2},
  {position: 3},
  {position: 4},
  {position: 5},
  {position: 6},
  {position: 7},
  {position: 8},
]

const adjacencyMap = {
  0: { leste: 1, sul: 3 },
  1: { oeste: 0, leste: 2, sul: 4 },
  2: { oeste: 1, sul: 5 },
  3: { norte: 0, leste: 4, sul: 6 },
  4: { norte: 1, oeste: 3, leste: 5, sul: 7 },
  5: { norte: 2, oeste: 4, sul: 8 },
  6: { norte: 3, leste: 7 },
  7: { norte: 4, oeste: 6, leste: 8 },
  8: { norte: 5, oeste: 7 }
};

function createDiv(quant, name, where) {
  for (let i = 0; i < quant; i++) {
    let divGrid = document.createElement('div')
    divGrid.className = `${name}${i}`
    /* div.style.width = "100px";
    div.style.height = "100px";
    divGrid.style.border = "thick solid #ffffff";
    div.style.color = "white"; */ 
    document.querySelector(`${where}`).appendChild(divGrid)
  }
}

createDiv(9, 'grid', '#main-board')
createDiv(5, 'hand', '#player-hand')

let playerHand = document.querySelector('#player-hand')
playerHand.addEventListener('click', cardFromHand) 
let selectedCard = null

function cardFromHand(eventOrigin) {
  let divTarget = eventOrigin.target

  if (divTarget.style.backgroundImage) {
    const backgroundImage = window.getComputedStyle(divTarget).backgroundImage
    let url = backgroundImage.slice(34,44)
    selectedCard = `url('./images/${url}')`
    divTarget.removeAttribute('style')

  } else {
    alert("Este espaço da sua mão está vazio")
  }
}

const insertCardOnBoard = document.querySelector('#main-board')
insertCardOnBoard.addEventListener('click', function(eventOrigin) {
  let currentPositionBoard = eventOrigin.target.className.slice(-1)

  if (Object.keys(grid[currentPositionBoard])[0] == 'position') {
    if (selectedCard) {
      eventOrigin.target.style.background = selectedCard
      eventOrigin.target.style.backgroundSize = "cover";
  
      let character = selectedCard.slice(14, 20)
      if (character == 'spearr') {
        character = spearr
      } else if (character == 'horsee') {
        character = horsee
      } else {
        character = archer
      }
  
      grid[currentPositionBoard] = {character: character.nome, norte: character.norte, leste: character.leste, sul: character.sul, oeste: character.oeste}
     /*  for (let i = 0; i < 9; i++) {
        console.log(grid[i])
      } */
  
      compareAdjacentCards(currentPositionBoard, eventOrigin)


      selectedCard = null
    } else {
      /* alert("Nenhuma carta selecionada") */
      alert("Selecione uma carta da mão antes de coloca-lá no Board")
    }

  } else {
    alert('Esta posição já possui uma carta')
  }
})

function compareAdjacentCards(current, eventOrigin) {
  const adjacents = adjacencyMap[current]
  //console.log(adjacents)

  for (const direction in adjacents) {
    const adjacentPosition = adjacents[direction]
    const adjacentCard = grid[adjacentPosition] // Obtem as cartas adjacentes
    //console.log('Onde a carta colocada tem adjacente:', direction)

    //console.log(Object.keys(grid[adjacentPosition])[0])
    if (Object.keys(grid[adjacentPosition])[0] !== 'position') {
      const oppositeDirection = {
        norte: "sul",
        sul: "norte",
        leste: "oeste",
        oeste: "leste"
      }[direction];

      const currentCardClass = grid[current]['character']
      console.log(currentCardClass)
      const adjacentCardClass = adjacentCard['character']
      console.log(adjacentCardClass)

      let currentCardValue = grid[current][direction]
      let adjacentCardValue = adjacentCard[oppositeDirection]

      if (currentCardClass == 'spearr' && adjacentCardClass == 'horsee') {
        currentCardValue *= 2
        console.log(currentCardValue)
      } else if (currentCardClass == 'horse' && adjacentCardClass == 'archer') {
        currentCardValue *= 2
        console.log(currentCardValue)
      } else if (currentCardClass == 'archer' && adjacentCardClass == 'spearr') {
        currentCardValue *= 2
        console.log(currentCardValue)
      }

      const adjacentElement = document.querySelector(`.grid${adjacentPosition}`)
      if (currentCardValue > adjacentCardValue) {
        eventOrigin.target.style.border = "thick solid #0000FF"
        adjacentElement.style.border = "thick solid #0000FF"
      }
    }
  }
}

let randomCards = [spearr, horsee, archer]
function randomCard() {
  let n = Math.floor(Math.random() * randomCards.length)
  // randomCards.splice(n, 1)
  return randomCards[n]
}

function cardsOnPlayerHand() {
  let hand0 = document.querySelector(".hand0").style.backgroundImage = `url('${spearr.imagem}')`
  let hand1 = document.querySelector(".hand1").style.backgroundImage = `url('${horsee.imagem}')`
  let hand2 = document.querySelector(".hand2").style.backgroundImage = `url('${archer.imagem}')`
  let hand3 = document.querySelector(".hand3").style.backgroundImage = `url('${randomCard().imagem}')`
  let hand4 = document.querySelector(".hand4").style.backgroundImage = `url('${randomCard().imagem}')`

}

cardsOnPlayerHand()





