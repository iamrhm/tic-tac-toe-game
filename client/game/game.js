var gameData = {
  username: null,
  gameScore: null,
}
var huSelection, cpuSelection, turn;
var ticTakToeBoard = []

window.onload = function () {
  init()
}

function init() {
  if (checkUser()) {
    var userData = getUserData()
    gameData = {
      username: userData.username,
      gameScore: 0,
    }
    startGame()
  }
  else {
    window.history.back() //Redirecting
  }
}

function checkUser() {
  if (!getUserData()) {
    return false
  }
  else
    return true
}

function getUserData() {
  var user = window.localStorage.getItem('user')
  user = JSON.parse(user)
  if (user === undefined || user === null)
    return false
  else
    return user
}

function startGame() {
  document.querySelector('.selection-button-container').addEventListener('click', clickEvent)
  document.querySelector('.game-board').addEventListener('click', clickEvent)
  createBoard()
}

function clickEvent(e) {
  if (e.target.className === 'selection-button') {
    setUserPreference(e.target.value)
  }
  else if (e.target.className === 'tic-tak-toe-button') {
    setUserIput(e.target.value)
  }
}

function setUserPreference(selection) {
  if (selection === 'X') {
    huSelection = 'X'
    cpuSelection = 'O'
    hideModal()
  }
  else if (selection === 'O') {
    huSelection = 'O'
    cpuSelection = 'X'
    hideModal()
  }
}

function hideModal() {
  var modal = document.querySelector('.select-modal')
  modal.parentElement.removeChild(modal)
}

function createBoard() {
  var buttonElement;
  var gameBoard = document.querySelector('.game-board');
  for (var i = 0; i < 9; i++) {
    ticTakToeBoard.push(i)
    buttonElement = document.createElement("BUTTON")
    buttonElement.setAttribute("class", "tic-tak-toe-button")
    buttonElement.setAttribute('id', 'button-' + i)
    buttonElement.setAttribute('value', i)
    gameBoard.append(buttonElement)
  }
  if (huSelection === 'O') {
    setCpuInput()
  }
}

function setUserIput(inputPosition) {
  updateGameBoard(inputPosition, huSelection)
  if(!checkGameComplited(ticTakToeBoard,huSelection))
    setCpuInput()
  else{
    //End Game Logic
    console.log( 'Hooman')
  }
}

function setCpuInput() {
  var cpuMove = findOptimalPosition(ticTakToeBoard.slice(), cpuSelection)
  console.log(cpuMove)
  updateGameBoard(cpuMove.index,cpuSelection)
  if(checkGameComplited(ticTakToeBoard,cpuSelection)){
    //End Game Logic
    console.log( 'Machine')
  }else{
    // wait for user input
  }
}

function findOptimalPosition(board,selection){
  var result ={
    index:'',
    score:''
  };
  var results = [];
  var availablePositions = getAvailablePositions(board);

  if(checkWinner(board,huSelection)){
    result = {
      index: -1,
      score: -10
    }
    return result
  }else if(checkWinner(board,cpuSelection)){
    result = {
      index: -1,
      score: 10
    }
    return result
  }else if(availablePositions.length === 0 ){
    result = {
      index: -1,
      score: 0
    }
    return result
  }

  for(var i=0;i<availablePositions.length;i++){
    var move={}
    move.index = board[availablePositions[i]];
    board[availablePositions[i]] = selection;
    if(selection === cpuSelection){
      move.score = findOptimalPosition(board,huSelection).score
    }else{
      move.score = findOptimalPosition(board,cpuSelection).score
    }
    board[availablePositions[i]] = move.index;
    results.push(move)
  }
  result = bestMove(results,selection)
  return result
}

function getAvailablePositions(board){
  var availableSpace = [];
  for(var i=0;i<board.length;i++){
    if(board[i] !== 'X' && board[i] !== 'O'){
      availableSpace.push(i)
    }
  };
  return availableSpace;
}

function updateGameBoard(inputPosition, selection) {
  if(inputPosition !== -1 ){
    ticTakToeBoard[inputPosition] = selection
    var el = document.querySelector('#button-' + inputPosition)
    el.innerHTML = selection
  }
}

function checkWinner(board,selection) {
  if (
    (board[0] == selection && board[1] == selection && board[2] == selection) ||
    (board[3] == selection && board[4] == selection && board[5] == selection) ||
    (board[6] == selection && board[7] == selection && board[8] == selection) ||
    (board[0] == selection && board[3] == selection && board[6] == selection) ||
    (board[1] == selection && board[4] == selection && board[7] == selection) ||
    (board[2] == selection && board[5] == selection && board[8] == selection) ||
    (board[0] == selection && board[4] == selection && board[8] == selection) ||
    (board[2] == selection && board[4] == selection && board[6] == selection)
  ) {
    return true;
  } else {
    return false;
  }

}

function checkRow(board) {
  for (var i = 0; i < board.length; i = +3) {
    if (board[i] === board[i + 1] && board[i + 1] === board[i + 2])
      return true
    else
      return false
  }
}

function checkColumn(board) {
  for (var i = 0; i < 3; i++) {
    if (board[i] === board[i + 3] && board[i + 3] === board[i + 6])
      return true;
    else
      return false
  }
}

function checkDiagonal(board) {
  if (board[0] === board[4] && board[4] === board[8]) 
    return true
  else if (board[2] === board[4] && board[4] === board[6])
    return true;
  else
    return false
}

function checkGameComplited(ticTakToeBoard,selection){
  if(checkWinner(ticTakToeBoard,selection))
    return true
  else{
    if(getAvailablePositions(ticTakToeBoard).length === 0){
      return true
    }
    return false
  }
}

function bestMove(results,selection){
  var moveScore, moveIndex;
  if(selection === cpuSelection){
    moveScore = -100;
    for(var i=0;i<results.length;i++){
      if(moveScore < results[i].score){
        moveScore = results[i].score
        moveIndex = i
      }
    }
  }else{
    moveScore = 100;
    for(var i=0;i<results.length;i++){
      if(moveScore > results[i].score){
        moveScore = results[i].score
        moveIndex = i
      }
    }
  }
  return results[moveIndex];
}