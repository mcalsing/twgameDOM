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

createDiv(9, 'grid', '#board')
createDiv(5, 'playerH', '#player-hand')
createDiv(5, 'pcH', '#computer-hand')

let computerScore = 0
let playerScore = 0
 
let computerHand = document.querySelector('#computer-hand')
let playerHand = document.querySelector('#player-hand')

let selectedCard = null
let currentHand = null
computerHand.addEventListener('click', function(eventOrigin) {
  currentHand = 'computer'
  let divTarget = eventOrigin.target

  if (divTarget.style.backgroundImage) {
    const backgroundImage = window.getComputedStyle(divTarget).backgroundImage
    let url = backgroundImage.slice(34,44)
    selectedCard = `url('./images/${url}')`
    divTarget.removeAttribute('style')

  } else {
    alert("Este espaço da sua mão está vazio")
  }
})

playerHand.addEventListener('click', function(eventOrigin) {
  currentHand = 'player'
  let divTarget = eventOrigin.target

  if (divTarget.style.backgroundImage) {
    const backgroundImage = window.getComputedStyle(divTarget).backgroundImage
    let url = backgroundImage.slice(34,44)
    selectedCard = `url('./images/${url}')`
    divTarget.removeAttribute('style')

  } else {
    alert("Este espaço da sua mão está vazio")
  }
})

const insertCardOnBoard = document.querySelector('#board')
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
    
      compareAdjacentCards(currentPositionBoard, eventOrigin)

      selectedCard = null
    } else {
      alert("Selecione uma carta da mão antes de coloca-lá no Board")
    }

  } else {
    alert('Esta posição já possui uma carta')
  }

  parent = document.querySelectorAll('#board')
  playerScore = 0
  document.querySelector('#player-score').innerHTML = playerScore
  computerScore = 0
  document.querySelector('#computer-score').innerHTML = computerScore
  for (let i = 0; i < 9; i++) {
    let colorsForScore = parent[0].children[i].style.border.slice(-4)
    //console.log('true', colorsForScore)
    if (colorsForScore.includes('blue')) {
      playerScore += 1
      document.querySelector('#player-score').innerHTML = playerScore

    } else if (colorsForScore.includes('red')) {
      computerScore += 1
      document.querySelector('#computer-score').innerHTML = computerScore
    }
  }
})

let parent = null

function compareAdjacentCards(current, eventOrigin) {
  const adjacents = adjacencyMap[current]
  //console.log(adjacents)

  for (const direction in adjacents) {
    const adjacentPosition = adjacents[direction]
    const adjacentCard = grid[adjacentPosition] // Obtem as cartas adjacentes

    // define a cor da borda quando o jogador colocar a carta no tabuleiro
    if (Object.keys(adjacentCard) == 'position') {
      if (currentHand === 'player') {
        eventOrigin.target.style.border = "thick solid blue"
      } else {
        eventOrigin.target.style.border = "thick solid red"
      }
    }

    if (Object.keys(grid[adjacentPosition])[0] !== 'position') {
      const oppositeDirection = {
        norte: "sul",
        sul: "norte",
        leste: "oeste",
        oeste: "leste"
      }[direction];

      const currentCardClass = grid[current]['character']
      //console.log(currentCardClass)
      const adjacentCardClass = adjacentCard['character']
      //console.log(adjacentCardClass)

      let currentCardValue = grid[current][direction]
      let adjacentCardValue = adjacentCard[oppositeDirection]

      if (currentCardClass == 'spearr' && adjacentCardClass == 'horsee') {
        currentCardValue *= 2
  
      } else if (currentCardClass == 'horsee' && adjacentCardClass == 'archer') {
        currentCardValue *= 2
        
      } else if (currentCardClass == 'archer' && adjacentCardClass == 'spearr') {
        currentCardValue *= 2
      }

      const adjacentElement = document.querySelector(`.grid${adjacentPosition}`)
      if (currentCardValue > adjacentCardValue) {
        if (currentHand === 'player') {
          eventOrigin.target.style.border = "thick solid blue"
          adjacentElement.style.border = "thick solid blue"
          
        } else {
          eventOrigin.target.style.border = "thick solid red"
          adjacentElement.style.border = "thick solid red"
        }
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
  document.querySelector(".playerH0").style.backgroundImage = `url('${spearr.imagem}')`
  document.querySelector(".playerH1").style.backgroundImage = `url('${horsee.imagem}')`
  document.querySelector(".playerH2").style.backgroundImage = `url('${archer.imagem}')`
  document.querySelector(".playerH3").style.backgroundImage = `url('${randomCard().imagem}')`
  document.querySelector(".playerH4").style.backgroundImage = `url('${randomCard().imagem}')`

  document.querySelector(".pcH0").style.backgroundImage = `url('${spearr.imagem}')`
  document.querySelector(".pcH1").style.backgroundImage = `url('${horsee.imagem}')`
  document.querySelector(".pcH2").style.backgroundImage = `url('${archer.imagem}')`
  document.querySelector(".pcH3").style.backgroundImage = `url('${randomCard().imagem}')`
  document.querySelector(".pcH4").style.backgroundImage = `url('${randomCard().imagem}')`
}

cardsOnPlayerHand()





