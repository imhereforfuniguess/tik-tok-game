const displayControl = (function () {
    let playerName1 = document.getElementById("player1");
    let playerName2 = document.getElementById("player2");
    let submitButton = document.querySelector('#submitButton')
    submitButton.addEventListener('click', () =>{
        console.log(`player1 name:${playerName1.value}`)
        console.log(`player2 name:${playerName2.value}`)
    })
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
    let currentPlayer = 2

    // Change player update interface to reflect that
    const changeTurn = () => {
        if (currentPlayer == 1){
            currentPlayer = 2
        } else {
            currentPlayer = 1
        }
        return currentPlayer
    }

    // Win / Draw check
    const checkForWin = () => {
        let checkSum = 0

        // Compares sums to 
        const compareCheckSum = () => {
            if (checkSum == 3){
                console.log(`player 2 wins`)
            }
            if (checkSum == -6){
                console.log(`player 1 wins`)
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
