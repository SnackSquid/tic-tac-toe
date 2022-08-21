let board = ['', '', '', 
'', '', '', 
'', '', ''];

// 
const displayController = (() => {
    const updateBoard = (gameBoard, board) => {
        for (let i = 0; i < gameBoard.length; i++) {
            gameBoard[i].textContent = board[i];
        }
    }
    const turnTracker = (player1, player2) => {
        const tracker = document.querySelector('.playerDisplay');
        if (player1.turn) tracker.textContent = `${player1.name}'s turn`;
        else tracker.textContent = `${player2.name}'s turn`;
    }
    return { updateBoard, turnTracker };
})();

const gameController = (() => {
    const placePiece = (object, player1, player2, board) => {
        const blockNumber = Array.from(object.parentElement.children).indexOf(object);
        if (player1.turn && board[blockNumber] === '') {
            board[blockNumber] = player1.piece;
            gameController.playerTurn(player1, player2);
        }
        else if (player2.turn && board[blockNumber] === '') {
            board[blockNumber] = player2.piece;
            gameController.playerTurn(player1, player2);

        }
        return board;
    }
    const playerTurn = (player1, player2) => {
        if (player1.turn) {
            player1.turn = false;
            player2.turn = true;
        }
        else {
            player1.turn = true;
            player2.turn = false;
        }
    }

    const scoreGame = (board, player1, player2) => {
        let rowStart = 0;
        let columnStart = 0;
        let winner = '';
        // row wins
        for (let i = 0; i < 3; i++) {
            if (board[rowStart] === board[rowStart + 1] && board[rowStart] === board[rowStart + 2] && board[rowStart] != '') {
                if (board[rowStart] === player1.piece) winner = `${player1.name} wins!`;
                else winner = `${player2.name} wins!`
                console.log(winner)
                break
            }
            rowStart += 3;
        }
        // column wins
        for (let i = 0; i < 3; i++) {
            if (board[columnStart] === board[columnStart + 3] && board[columnStart] === board[columnStart + 6] && board[columnStart] != '') {
                if (board[columnStart] === player1.piece) winner = `${player1.name} wins!`;
                else winner = `${player2.name} wins!`
                console.log(winner)
                break
            }
            columnStart += 3;
        }
        // diagonal wins
        if (board[0] === board[4] && board [0] === board[8] && board[0] != '') {
            if (board[0] === player1.piece) winner = `${player1.name} wins!`;
            else winner = `${player2.name} wins!`
            console.log(winner)
        }
        else if (board[6] === board[4] && board [6] === board[2] && board[6] != '') {
            if (board[6] === player1.piece) winner = `${player1.name} wins!`;
            else winner = `${player2.name} wins!`
            console.log(winner)
        }
        // check for tie
        else if (board.find(space => space === '') === undefined) {
            console.log('tie!')
        }
    }
    return { playerTurn, placePiece, scoreGame }
})();

const Player = (name, piece, turn) => {
    this.name = name;
    this.piece = piece;
    this.turn = turn;

    return { name, piece, turn };
}

let player1 = Player('Dog', 'X', true);
let player2 = Player('Cat', 'O', false);
displayController.turnTracker(player1, player2);

function game(click) {
    click.stopPropagation();

    const boardArray = document.querySelectorAll('.block')
    gameController.placePiece(this, player1, player2, board);
    displayController.updateBoard(boardArray, board);
    displayController.turnTracker(player1, player2);
    gameController.scoreGame(board, player1, player2);
}

const button = document.querySelectorAll('button');
button.forEach(button => button.addEventListener('click', game));