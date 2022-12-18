gameBoard = {
    board: [1,2,1,1,2,1,1,0,1],
    updateBoard: function () {
        for (let i = 0; i < 9; i++){
            let cell = document.querySelector(`[data-cell="${i}"]`)
            cell.textContent = gameBoard.board[i]
        }
    }
}

const gameState = (function () {
    let currentPlayer = 1
    const changeTurn = () => {
        if (currentPlayer == 1){
            currentPlayer = 2
        } else {
            currentPlayer = 1
        }
        return currentPlayer
    }
    return {changeTurn}
    // I don't know what to do here
})()

const {changeTurn} = gameState

gameBoard.updateBoard()

    
cell = document.querySelectorAll(".cell")
cell.forEach((cell) => {
    cell.addEventListener('click', () => {
        console.log(cell.getAttribute('data-cell'))
        if (cell.textContent == 0){
            gameBoard.board[cell.getAttribute('data-cell')] = 1 
        }
        if (cell.textContent == 1){
            gameBoard.board[cell.getAttribute('data-cell')] = 2 
        }
        if (cell.textContent == 2){
            gameBoard.board[cell.getAttribute('data-cell')] = 1 
        }
        gameBoard.updateBoard()
    })
})