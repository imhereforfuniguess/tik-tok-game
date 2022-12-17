gameBoard = {
    board: [1,2,1,1,2,1,1,0,1],
    updateBoard: function () {
        for (let i = 0; i < 9; i++){
            let cell = document.querySelector(`[data-cell="${i}"]`)
            cell.textContent = gameBoard.board[i]
        }
    }
}

player = {
    // Change player every click
}

gameState = {
    turn: 1,
    changeTurn: () => {
        if (turn == 1){
            turn = 2
        } 
        if (turn == 2){
            turn = 1
        }
    }
    // I don't know what to do here
}

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