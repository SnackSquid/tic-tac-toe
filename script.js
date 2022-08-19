const gameboard = (() => {
    let board = ['X', 'O', 'X', 'X', 'X', 'X', 'O', 'O', 'X', 'X'];
    

})();

const displayController = (() => {
    const updateBoard = (board) => {
        for (let i = 0; i < board.length; i++) {
            const block = document.querySelector('.block');
            block.textContent = board[i];
        }
    }
    return { updateBoard };
})();

const Player = (name, piece) => {
    return { name, piece };
}

function game() {
    const player1 = Player('Dog', 'X');
    const gameBoard = document.querySelectorAll('block');
    gameBoard.forEach(block => {block.textContent = 'X'});
    console.log(player1);
}

const button = document.querySelector('button');
button.addEventListener('click', game);