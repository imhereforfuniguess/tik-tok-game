// To-do
// Game over function
const statusPanel = document.querySelector('[data-panel="statusDisplay"]')
let isFirstNameFirst = 0


const displayControl = (function () {


    displayVersusPrompt = (e) => {
        const versus = document.createElement('div')
        if (e.textContent == playerName1.value){
            versus.textContent = `${e.textContent} vs ${playerName2.value}`
            isFirstNameFirst = 1
        } else {
            versus.textContent = `${e.textContent} vs ${playerName1.value}`
        }
        statusPanel.appendChild(versus)
        displayTurn(e.textContent)
    }

    displayTurn = (name) => {
        displayTurnDiv.textContent = `it's ${name}'s turn`
        statusPanel.appendChild(displayTurnDiv)
    }

    displayGameEnd = (message) => {
        const gameEndMessage = document.createElement('div')
        gameEndMessage.textContent = message
        statusPanel.appendChild(gameEndMessage)
    }

    const displayTurnDiv = document.createElement('div')

    let playerName1 = document.getElementById("player1");
    let playerName2 = document.getElementById("player2");
    let label = document.querySelectorAll("label")
    let submitButton = document.querySelector('#submitButton')
    submitButton.addEventListener('click', () =>{
        playerName1.remove()
        playerName2.remove()
        
        // Remove player labels
        label.forEach((e) => {
            e.remove()
        })
        submitButton.remove()

        const turnPrompt = document.createElement('div')
        const turnSelector1 = document.createElement('button')
        const turnSelector2 = document.createElement('button')
        turnSelector1.setAttribute("data-button","turnSelector")
        turnSelector2.setAttribute("data-button","turnSelector")
        turnSelector1.textContent = `${playerName1.value}`
        turnSelector2.textContent = `${playerName2.value}`
        turnPrompt.textContent = "who goes first?"
        statusPanel.appendChild(turnPrompt)
        statusPanel.appendChild(turnSelector1)
        statusPanel.appendChild(turnSelector2)

        const turnSelectors = document.querySelectorAll('[data-button="turnSelector"]')
        turnSelectors.forEach((e) => {
            e.addEventListener('click', () =>{
                displayVersusPrompt(e)
                turnSelector2.remove()
                turnSelector1.remove()
                turnPrompt.remove()
            })
        })
    })

    
    return{displayTurn, playerName1, playerName2, displayGameEnd, displayVersusPrompt, isFirstNameFirst}
})()


const gameBoard = (function () {
    // Board array
    const board = [0,0,0,0,0,0,0,0,0]

    // Updates based on array
    const updateBoard =  () => {
        for (let i = 0; i < 9; i++){
            let cell = document.querySelector(`[data-cell="${i}"]`)
            cell.textContent = board[i]
        }
    }
    updateBoard()

    // Add clicking
    // Implement clicking based on game state
    cell = document.querySelectorAll(".cell")
    cell.forEach((cell) => {
        cell.addEventListener('click', () => {
            if (cell.textContent == 0){
                board[cell.getAttribute('data-cell')] = gameState.changeTurn()
                gameState.checkForWin()

            }
            updateBoard()
        })
    })

    return {board}
})()



const gameState = (function () {
    // Have to start from opposite player cause you change even at first turn
    let currentPlayer = 0

    // Change player update interface to reflect that
    const changeTurn = () => {
        console.log(`current player before${currentPlayer}`)
        console.log(isFirstNameFirst)

        if (currentPlayer === 1){
            currentPlayer = 2
        }
        else if (currentPlayer === 2){
            currentPlayer = 1
        }
        else if (currentPlayer === 0 && isFirstNameFirst == 0){
            currentPlayer = 1
        }
        else if (currentPlayer === 0 && isFirstNameFirst == 1){
            currentPlayer = 2
        }

        console.log(`current player after${currentPlayer}`)
        displayTurn(displayControl[`playerName${currentPlayer}`].value)
        return currentPlayer
    }

    // Win / Draw check
    const checkForWin = () => {
        let checkSum = 0

        // Compares sums to 
        const compareCheckSum = () => {
            if (checkSum == 3){
                displayControl.displayGameEnd(`${displayControl.playerName1.value} wins`)
            }
            if (checkSum == -6){
                displayControl.displayGameEnd(`${displayControl.playerName2.value} wins`)
            }
            checkSum = 0
        }

        // Check who wins rows and columns 
        for (let i = 0; i < 9; i+=3){
            for (let j = 0; j < 3; j++){
                checkSum += gameBoard.board[i+j] * gameBoard.board[i+j] - 3
            }
            compareCheckSum()
            for (let j = 0; j < 3; j++){
                checkSum += gameBoard.board[i/3+j*3] * gameBoard.board[i/3+j*3] - 3
            }     
            compareCheckSum()    
        }

        // Check who wins diagonals
        for (let i = 0; i < 9; i+=4){
            checkSum += gameBoard.board[i] * gameBoard.board[i] - 3
        }
        compareCheckSum() 
        for (let i = 2; i < 8; i+=2){
            checkSum += gameBoard.board[i] * gameBoard.board[i] - 3
        }
        compareCheckSum() 

        checkForDraw()
    }

    const checkForDraw = () => {
        if (gameBoard.board.includes(0) == false){
            console.log("DRAW")
        }
    }

    return {changeTurn, currentPlayer, checkForWin}
})()
