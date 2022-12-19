const gameBoard = (function () {
    
    // Board array
    const board = [0,0,0,0,0,0,0,1,2]

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
            }
            console.log()
            
            updateBoard()
        })
    })

})()

const gameState = (function () {
    let currentPlayer = 2
    const changeTurn = () => {
        if (currentPlayer == 1){
            currentPlayer = 2
        } else {
            currentPlayer = 1
        }
        return currentPlayer
    }
    return {changeTurn, currentPlayer}

    // I don't know what to do here
})()


    
