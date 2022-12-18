const gameBoard = (function () {
    const board = [1,2,1,1,2,1,1,0,1]
    const updateBoard =  () => {
        for (let i = 0; i < 9; i++){
            let cell = document.querySelector(`[data-cell="${i}"]`)
            cell.textContent = board[i]
        }
    }

    cell = document.querySelectorAll(".cell")
    cell.forEach((cell) => {
        cell.addEventListener('click', () => {
            console.log(cell.getAttribute('data-cell'))
            if (cell.textContent == 0){
                board[cell.getAttribute('data-cell')] = 1 
            }
            if (cell.textContent == 1){
                board[cell.getAttribute('data-cell')] = 2 
            }
            if (cell.textContent == 2){
                board[cell.getAttribute('data-cell')] = 1 
            }
            updateBoard()
        })
    })

    return {updateBoard}
})()

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

    
