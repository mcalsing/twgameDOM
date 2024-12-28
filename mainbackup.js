import Cartas from './dataCards';

let gridBoard1 = document.querySelector('#grid1')
let gridBoard2 = document.querySelector('#grid2')
let gridBoard3 = document.querySelector('#grid3')
let gridBoard4 = document.querySelector('#grid4')
let gridBoard5 = document.querySelector('#grid5')
let gridBoard6 = document.querySelector('#grid6')
let gridBoard7 = document.querySelector('#grid7')
let gridBoard8 = document.querySelector('#grid8')
let gridBoard9 = document.querySelector('#grid9')

let gridHand1 = document.querySelector('#hand1')

let currentCard = ''

function createGridBoard() {
  let divGrid = document.createElement('div')
  divGrid.className = `grid${i}`
  document.getElementById('main-board').appendChild(divGrid)
  return divGrid
}

for (let i = 1; i <= 9; i++) {
  console.log("criando a grid", i)
  createGridBoard(i)
}

function grid1() {
  gridBoard1.style.background = "url('/images/Archer.png')"
  gridBoard1.style.backgroundSize = "cover";
}

function grid2() {
  gridBoard2.style.background = "url('/images/Horse.png')"
  gridBoard2.style.backgroundSize = "cover";
}

function grid3() {
  gridBoard3.style.background = "url('/images/Spear.png')"
  gridBoard3.style.backgroundSize = "cover";
}

function grid4() {
  console.log("clicou no grid 4")
}

function grid5() {
  console.log("clicou no grid 5")
}

function grid6() {
  console.log("clicou no grid 6")
}

function grid7() {
  console.log("clicou no grid 7")
}

function grid8() {
  console.log("clicou no grid 8")
}

function grid9() {
  console.log("clicou no grid 9")
}

function hand1() {
  currentCard = gridHand1.style.backgroundImage
  console.log(currentCard)
}

function hand2() {
  console.log("clicou na hand 2")  
}

function hand3() {
  console.log("clicou na hand 3")
}

function hand4() {
  console.log("clicou na hand 4")
}

function hand5() {
  console.log("clicou na hand 5")
}