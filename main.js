import Cartas from './dataCards.js';

const spearr = Cartas.spearr
const horsee = Cartas.horsee
const archer = Cartas.archer

function createDiv(quant, name, where) {
  for (let i = 0; i < quant; i++) {
    let divGrid = document.createElement('div')
    divGrid.className = `${name}${i}`
    /* div.style.width = "100px";
    div.style.height = "100px";
    div.style.background = "red";
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

let grid = [
  {position: 0, },
  {position: 1},
  {position: 2},
  {position: 3},
  {position: 4},
  {position: 5},
  {position: 6},
  {position: 7},
  {position: 8},
]

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
      for (let i = 0; i < 9; i++) {
        console.log(grid[i])
      }
  
      selectedCard = null
    } else {
      /* alert("Nenhuma carta selecionada") */
      alert("Nenhuma carta selecionada")
    }

  } else {
    alert('Esta posição já possui uma carta')
  }

})

let randomCards = [spearr, horsee, archer]
function randomCard() {
  let n = Math.floor(Math.random() * randomCards.length)
  // randomCards.splice(n, 1)
  return randomCards[n]
}

function cardsOnPlayerHand() {

  console.log(`"url('${spearr.imagem}')"`)
  let hand0 = document.querySelector(".hand0").style.backgroundImage = `url('${spearr.imagem}')`
  let hand1 = document.querySelector(".hand1").style.backgroundImage = `url('${horsee.imagem}')`
  let hand2 = document.querySelector(".hand2").style.backgroundImage = `url('${archer.imagem}')`
  let hand3 = document.querySelector(".hand3").style.backgroundImage = `url('${randomCard().imagem}')`
  let hand4 = document.querySelector(".hand4").style.backgroundImage = `url('${randomCard().imagem}')`

}

cardsOnPlayerHand()





