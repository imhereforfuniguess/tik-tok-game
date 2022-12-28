// To-do
// Game over function
// Spawn 


const statusPanel = document.querySelector('[data-panel="statusDisplay"]');
let isFirstNameFirst = 0;
let isGameActive = 1;
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let checkSum = 0;


const displayControl = (() => {
  const displayVersusPrompt = (e) => {
    const versus = document.createElement('div');
    if (e.textContent === playerName1.value) {
      versus.textContent = `${e.textContent} vs ${playerName2.value}`;
      isFirstNameFirst = 1;
    } else {
      versus.textContent = `${e.textContent} vs ${playerName1.value}`;
    }
    statusPanel.appendChild(versus);
    displayTurn(e.textContent);
  };

  displayTurn = (name) => {
    displayTurnDiv.textContent = `it's ${name}gi's turn`;
    statusPanel.appendChild(displayTurnDiv);
  };

  displayGameEnd = (message) => {
    const gameEndMessage = document.createElement('div');
    gameEndMessage.textContent = message;
    statusPanel.appendChild(gameEndMessage);
  };

  const displayTurnDiv = document.createElement('div');

  let playerName1 = document.getElementById('player1');
  let playerName2 = document.getElementById('player2');
  const label = document.querySelectorAll('label');
  const submitButton = document.querySelector('#submitButton');
  
  submitButton.addEventListener('click', () => {
    playerName1.remove();
    playerName2.remove();

    // Remove player labels
    label.forEach((e) => {
      e.remove();
    });
    submitButton.remove();

    const turnPrompt = document.createElement('div');
    const turnSelector1 = document.createElement('button');
    const turnSelector2 = document.createElement('button');
    turnSelector1.setAttribute('data-button', 'turnSelector');
    turnSelector2.setAttribute('data-button', 'turnSelector');
    turnSelector1.textContent = `${playerName1.value}`;
    turnSelector2.textContent = `${playerName2.value}`;
    turnPrompt.textContent = 'who goes first?';
    statusPanel.appendChild(turnPrompt);
    statusPanel.appendChild(turnSelector1);
    statusPanel.appendChild(turnSelector2);

    const turnSelectors = document.querySelectorAll('[data-button="turnSelector"]');
    turnSelectors.forEach((e) => {
      e.addEventListener('click', () => {
        displayVersusPrompt(e);
        turnSelector2.remove();
        turnSelector1.remove();
        turnPrompt.remove();
        spawnBoard()
      });
    });
  });

  return {
    displayTurn, playerName1, playerName2, displayGameEnd, displayVersusPrompt, isFirstNameFirst,
  };
})();

const gameBoard = (function () {

  // Spawns board based on array
  const spawnBoard = () => {
    const gameBoardDisplay = document.querySelector('[data-div="gameBoardDisplay"]')

    for (let i = 0; i < 9; i++){
      const cellDisplay = document.createElement('div')
      cellDisplay.setAttribute('class','cellDisplay')
      cellDisplay.setAttribute('data-cell', i)
      gameBoardDisplay.appendChild(cellDisplay)
    }

    const gameBoard = document.createElement('div')
    gameBoard.setAttribute('data-div','gameBoard')
    gameBoardDisplay.appendChild(gameBoard)

    for (let i = 0; i < 9; i++){
      const cellDisplay = document.createElement('div')
      cellDisplay.setAttribute('class','cell')
      cellDisplay.setAttribute('data-cell', i)
      gameBoard.appendChild(cellDisplay)
    }
  }
  

  // Updates based on array
  const updateBoard = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.querySelector(`[data-cell="${i}"].cell`);
      cell.textContent = board[i];

      const cellDisplay = document.querySelector(`[data-cell="${i}"].cellDisplay`)
      if (board[i] === 1) {
        cellDisplay.textContent = "X"
      }
      if (board[i] === 2) {
        cellDisplay.textContent = "O"
      }

      if (board[i] === 0) {
        cellDisplay.textContent = ""
      }
    }
  };
  // updateBoard();



  // Add clicking
  // Implement clicking based on game state
  cell = document.querySelectorAll('.cell');
  
  // Cells react to clicks
  cell.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (cell.textContent == 0 && isGameActive === 1) {
        board[cell.getAttribute('data-cell')] = gameState.changeTurn();
        gameState.checkForWin();
      }
      updateBoard();
    });
  });

  return { board, updateBoard, spawnBoard};
}());

const gameState = (function () {
  // Have to start from opposite player cause you change even at first turn
  let currentPlayer = 0;


  // Change player update interface to reflect that
  const changeTurn = () => {

    if (currentPlayer === 1) {
      currentPlayer = 2;
    } else if (currentPlayer === 2) {
      currentPlayer = 1;
    } else if (currentPlayer === 0 && isFirstNameFirst == 0) {
      currentPlayer = 1;
    } else if (currentPlayer === 0 && isFirstNameFirst == 1) {
      currentPlayer = 2;
    }

    displayTurn(displayControl[`playerName${currentPlayer}`].value);
    return currentPlayer;
  };


  // Win / Draw check
  const checkForWin = () => {

    // Compares sums to
    const compareCheckSum = () => {
      console.log(checkSum)
      if (checkSum == 3) {
        displayControl.displayGameEnd(`${displayControl.playerName1.value} wins`);
        isGameActive = 0;
      }
      if (checkSum == -6) {
        displayControl.displayGameEnd(`${displayControl.playerName2.value} wins`);
        isGameActive = 0;
      }
      checkSum = 0;
    };

    // Check who wins rows and columns
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 3; j++) {
        checkSum += board[i + j] * board[i + j] - 3;
      }
      compareCheckSum();
      for (let j = 0; j < 3; j++) {
        checkSum += board[i / 3 + j * 3] * board[i / 3 + j * 3] - 3;
      }
      compareCheckSum();
    }

    // Check who wins diagonals
    for (let i = 0; i < 9; i += 4) {
      checkSum += board[i] * board[i] - 3;
    }
    compareCheckSum();
    for (let i = 2; i < 8; i += 2) {
      checkSum += board[i] * board[i] - 3;
    }
    compareCheckSum();

    checkForDraw();
  };

  const checkForDraw = () => {
    if (board.includes(0) == false) {
      console.log('DRAW');
      isGameActive = 0
    }
  };

  const resetButton = document.querySelector('[data-button="reset"]')
  resetButton.addEventListener('click', () => {
    resetGame()
  })

  const resetGame = () => {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    gameBoard.updateBoard();
    isGameActive = 1;
    checkSum = 0

    // reset board and reset all the labels
  }

  return { changeTurn, currentPlayer, checkForWin };
}());

const {spawnBoard} = gameBoard