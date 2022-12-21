// To-do
// make name disappear on submission
// add who's turn is it
// add prompt with 2 buttons who's gonna go first
// 
//  

const displayControl = (function () {


    displayVersusPrompt = (e) => {
        const versus = document.createElement('div')
        if (e.textContent == playerName1.value){
            versus.textContent = `${e.textContent} vs ${playerName2.value}`
        } else {
            versus.textContent = `${e.textContent} vs ${playerName1.value}`
        }
        statusPanel.appendChild(versus)
        displayTurn()

    }

    displayTurn = () => {
        const displayTurn = document.createElement('div')
        displayTurn.textContent = `it's ${playerName2.value}'s turn`
        statusPanel.appendChild(displayTurn)
    }

    const statusPanel = document.querySelector('[data-panel="statusDisplay"]')

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
            console.log(e.textContent)
            e.addEventListener('click', () =>{
                displayVersusPrompt(e)
                turnSelector2.remove()
                turnSelector1.remove()
                turnPrompt.remove()
            })
        })

        const setTurn = function (player) {
            console.log(player)
        }



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
