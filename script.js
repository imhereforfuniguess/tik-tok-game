// Make reset game come back to player promts

const statusPanel = document.querySelector('[data-panel="statusDisplay"]');
let isFirstNameFirst = 0;
let isGameActive = 1;
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let checkSum = 0;
let player1Score = 0;
let player2Score = 0;

const displayControl = (function displayControl() {
  const spawnResetBoardButton = () => {
    const resetGameButton = document.createElement('button');
    resetGameButton.setAttribute('data-button', 'reset');
    resetGameButton.textContent = 'Reset board';

    const statusDisplay = document.querySelector(
      '[data-panel="statusDisplay"]',
    );
    statusDisplay.appendChild(resetGameButton);

    resetGameButton.addEventListener('click', () => {
      resetGame();
    });
  };

  const spawnInputFields = () => {
    const player1Label = document.createElement('label');
    const player1Input = document.createElement('input');
    const player2Label = document.createElement('label');
    const player2Input = document.createElement('input');
    const inputForm = document.querySelector('form');

    player1Label.textContent = 'player1:';
    player2Label.textContent = 'player2:';

    player1Label.setAttribute('for', 'player1');
    player2Label.setAttribute('for', 'player2');

    player1Input.setAttribute('type', 'text');
    player1Input.setAttribute('id', 'player1');
    player1Input.setAttribute('name', 'player1');
    player2Input.setAttribute('type', 'text');
    player2Input.setAttribute('id', 'player2');
    player2Input.setAttribute('name', 'player2');

    inputForm.appendChild(player1Label);
    inputForm.appendChild(player1Input);
    inputForm.appendChild(player2Label);
    inputForm.appendChild(player2Input);
  };

  const spawnInputButton = () => {
    const inputButton = document.createElement('button');
    const inputButtonHolder = document.querySelector('.buttonHolder');

    inputButton.textContent = 'Submit';
    inputButton.setAttribute('type', 'submit');
    inputButton.setAttribute('id', 'submitButton');

    inputButtonHolder.appendChild(inputButton);
  };
  spawnInputButton();
  spawnInputFields();
  const displayTurnDiv = document.createElement('div');

  const spawnNextRoundButton = () => {
    const nextRoundButton = document.createElement('button');
    nextRoundButton.setAttribute('class', 'nextRoundButton');
    const inputButtonHolder = document.querySelector('.buttonHolder');
    nextRoundButton.textContent = 'Next Round';

    inputButtonHolder.appendChild(nextRoundButton);

    nextRoundButton.addEventListener('click', () => {
      board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      gameBoard.updateBoard();
      isGameActive = 1;
      checkSum = 0;
      nextRoundButton.remove();
      displayControl.playerName1.remove();
    });
  };

  const displayTurn = (name) => {
    displayTurnDiv.textContent = `it's ${name}'s turn`;
    statusPanel.appendChild(displayTurnDiv);
  };

  const playerName1 = document.getElementById('player1');
  const playerName2 = document.getElementById('player2');
  const label = document.querySelectorAll('label');

  const displayVersusNames = (e) => {
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

  const displayVersusScore = () => {
    const versusScore = document.createElement('div');
    versusScore.setAttribute('class', 'scoreBoard');
    statusPanel.appendChild(versusScore);
    versusScore.textContent = `${player1Score}:${player2Score}`;
  };

  const displayGameEnd = (message) => {
    const roundEndMessage = document.createElement('div');
    roundEndMessage.textContent = message;
    roundEndMessage.setAttribute('class', 'roundEndMessage');
    statusPanel.appendChild(roundEndMessage);
  };

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

    const turnSelectors = document.querySelectorAll(
      '[data-button="turnSelector"]',
    );
    turnSelectors.forEach((e) => {
      e.addEventListener('click', () => {
        displayVersusNames(e);
        turnSelector2.remove();
        turnSelector1.remove();
        turnPrompt.remove();
        spawnBoard();
        spawnResetBoardButton();
        displayVersusScore();
      });
    });
  });

  return {
    displayTurn,
    playerName1,
    playerName2,
    displayGameEnd,
    displayVersusPrompt: displayVersusNames,
    isFirstNameFirst,
    displayVersusScore,
    spawnNextRoundButton,
  };
}());

const gameBoard = (function gameBoard() {
  // Updates based on array
  const updateBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      const cell = document.querySelector(`[data-cell="${i}"].cell`);
      cell.textContent = board[i];

      const cellDisplay = document.querySelector(
        `[data-cell="${i}"].cellDisplay`,
      );
      if (board[i] === 1) {
        cellDisplay.textContent = 'X';
      }
      if (board[i] === 2) {
        cellDisplay.textContent = 'O';
      }

      if (board[i] === 0) {
        cellDisplay.textContent = '';
      }
    }
  };

  // Add clicking
  // Implement clicking based on game state
  const assignCellsEvents = () => {
    const cell = document.querySelectorAll('.cell');
    cell.forEach((e) => {
      e.addEventListener('click', () => {
        if (e.textContent === '0' && isGameActive === 1) {
          board[e.getAttribute('data-cell')] = gameState.changeTurn();
          gameState.checkForWin();
        }
        updateBoard();
      });
    });
  };

  // Spawns board based on array
  const spawnBoard = () => {
    const gameBoardDisplay = document.querySelector(
      '[data-div="gameBoardDisplay"]',
    );

    for (let i = 0; i < 9; i += 1) {
      const cellDisplay = document.createElement('div');
      cellDisplay.setAttribute('class', 'cellDisplay');
      cellDisplay.setAttribute('data-cell', i);
      gameBoardDisplay.appendChild(cellDisplay);
    }

    const gameBoard = document.createElement('div');
    gameBoard.setAttribute('data-div', 'gameBoard');
    gameBoardDisplay.appendChild(gameBoard);

    for (let i = 0; i < 9; i += 1) {
      const cellDisplay = document.createElement('div');
      cellDisplay.setAttribute('class', 'cell');
      cellDisplay.setAttribute('data-cell', i);
      gameBoard.appendChild(cellDisplay);
    }

    updateBoard();
    assignCellsEvents();
  };

  return {
    updateBoard,
    spawnBoard,
    assignCellsEvents,

  };
}());

const { spawnBoard } = gameBoard;
const { displayTurn } = displayControl;

const gameState = (function gameState() {
  const displayVersusScoreUpdate = () => {
    const versusScore = document.querySelector('.scoreBoard');
    versusScore.textContent = `${player1Score}:${player2Score}`;
  };
  // Have to start from opposite player cause you change even at first turn
  let currentPlayer = 0;

  // Change player update interface to reflect that
  const changeTurn = () => {
    if (currentPlayer === 1) {
      currentPlayer = 2;
    } else if (currentPlayer === 2) {
      currentPlayer = 1;
    } else if (currentPlayer === 0 && isFirstNameFirst === 0) {
      currentPlayer = 1;
    } else if (currentPlayer === 0 && isFirstNameFirst === 1) {
      currentPlayer = 2;
    }

    displayTurn(displayControl[`playerName${currentPlayer}`].value);
    return currentPlayer;
  };

  const checkForDraw = () => {
    if (board.includes(0) === false) {
      isGameActive = 0;
    }
  };

  const removeRoundEndText = () => {
    const nextRoundButton = document.querySelector('.nextRoundButton');
    nextRoundButton.addEventListener('click', () => {
      const gameEndMessage = document.querySelector('.roundEndMessage');
      gameEndMessage.remove();
    });
  };
  // Win / Draw check
  const checkForWin = () => {
    // Compares sums to
    const compareCheckSum = () => {
      if (checkSum === 3) {
        displayControl.displayGameEnd(
          `${displayControl.playerName1.value} wins`,
        );
        player1Score += 1;
        isGameActive = 0;
        displayVersusScoreUpdate();
        displayControl.spawnNextRoundButton();
        removeRoundEndText();
      }
      if (checkSum === -6) {
        displayControl.displayGameEnd(
          `${displayControl.playerName2.value} wins`,
        );
        player2Score += 1;
        isGameActive = 0;
        displayVersusScoreUpdate();
        displayControl.spawnNextRoundButton();
        removeRoundEndText();
      }
      checkSum = 0;
    };

    // Check who wins rows and columns
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 3; j += 1) {
        checkSum += board[i + j] * board[i + j] - 3;
      }
      compareCheckSum();
      for (let j = 0; j < 3; j += 1) {
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

  const resetGame = () => {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    gameBoard.updateBoard();
    isGameActive = 1;
    checkSum = 0;

    // reset board and reset all the labels
  };

  return {
    changeTurn,
    currentPlayer,
    checkForWin,
    resetGame,
  };
}());

const { resetGame } = gameState;
