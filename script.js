let board = ['', '', '', '', '', '', '', '', '', ''];



const displayController = (() => {
    const updateBoard = (gameBoard, board) => {
        for (let i = 0; i < gameBoard.length; i++) {
            gameBoard[i].textContent = board[i];
        }
    }

    return { updateBoard  };
})();

const gameController = ((player1, player2) => {

    const placePiece = (object, player1, player2, board) => {
        const blockNumber = Array.from(object.parentElement.children).indexOf(object);
        if (player1.turn) {
            board[blockNumber] = player1.piece;
        }
        else {
            board[blockNumber] = player2.piece;
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
    return { playerTurn, placePiece }
})();

const Player = (name, piece, turn) => {
    this.name = name;
    this.piece = piece;
    this.turn = turn;

    return { name, piece, turn };
}

let player1 = Player('Dog', 'X', true);
let player2 = Player('Cat', 'O', false);

function game(click) {
    click.stopPropagation();

    const boardArray = document.querySelectorAll('.block')
    gameController.placePiece(this, player1, player2, board);
    displayController.updateBoard(boardArray, board);
    gameController.playerTurn(player1, player2);
}

const button = document.querySelectorAll('button');
button.forEach(button => button.addEventListener('click', game));