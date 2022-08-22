let board = ['', '', '', 
'', '', '', 
'', '', ''];

// 
const displayController = (() => {

    // update the board display by looping through the board array and displaying the results
    const updateBoard = (gameBoard, board) => {
        for (let i = 0; i < gameBoard.length; i++) {
            gameBoard[i].textContent = board[i];
        }
    }
    // update the player display to show who's turn it is
    const turnTracker = (player1, player2) => {
        const tracker = document.querySelector('.playerDisplay');
        if (player1.turn) tracker.textContent = `${player1.name}'s turn`;
        else tracker.textContent = `${player2.name}'s turn`;
    }

    const displayEndGame = (winner) => {
        const playerInputWrapper = document.querySelector('.playerInputWrapper');
        const endMessage = document.querySelector('.endMessage');

        playerInputWrapper.style.display = 'flex';
        endMessage.style.display = 'flex';
        endMessage.textContent = winner;
    }

    const getPlayer1 = (click) => {
        click.preventDefault();
        const form = document.querySelector('form');
        const player1Name = document.querySelector('#player1Name').value;
        const player1Input = document.querySelector('.player1Input');
        const player2Input = document.querySelector('.player2Input');

        player1.name = player1Name;
        form.reset();
        player1Input.style.display = 'none';
        player2Input.style.display = 'flex';
    }

    const getPlayer2 = (click) => {
        click.preventDefault();
        const form = document.querySelector('form');
        const player2Name = document.querySelector('#player2Name').value;
        const playerInputWrapper = document.querySelector('.playerInputWrapper');
        const player1Input = document.querySelector('.player1Input');
        const player2Input = document.querySelector('.player2Input');

        player2.name = player2Name;
        displayController.turnTracker(player1, player2);
        form.reset();
        player1Input.style.display = 'none';
        player2Input.style.display = 'none';
        playerInputWrapper.style.display = 'none';
    }

    const reset = () => {
        const boardArray = document.querySelectorAll('.block')
        board = ['', '', '', '', '', '', '', '', ''];
        displayController.updateBoard(boardArray, board);
    }

    return { updateBoard, turnTracker, displayEndGame, getPlayer1, getPlayer2, reset };
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
                displayController.displayEndGame(winner)
                break
            }
            rowStart += 3;
        }
        // column wins
        for (let i = 0; i < 3; i++) {
            if (board[columnStart] === board[columnStart + 3] && board[columnStart] === board[columnStart + 6] && board[columnStart] != '') {
                if (board[columnStart] === player1.piece) winner = `${player1.name} wins!`;
                else winner = `${player2.name} wins!`
                displayController.displayEndGame(winner)
                break
            }
            columnStart += 1;
        }
        // diagonal wins
        if (board[0] === board[4] && board [0] === board[8] && board[0] != '') {
            if (board[0] === player1.piece) winner = `${player1.name} wins!`;
            else winner = `${player2.name} wins!`
            displayController.displayEndGame(winner)
        }
        else if (board[6] === board[4] && board [6] === board[2] && board[6] != '') {
            if (board[6] === player1.piece) winner = `${player1.name} wins!`;
            else winner = `${player2.name} wins!`
            displayController.displayEndGame(winner)
        }
        // check for tie
        else if (board.find(space => space === '') === undefined) {
            winner = `Everyone loses!`
            displayController.displayEndGame(winner)
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

function game(click) {
    click.stopPropagation();

    const boardArray = document.querySelectorAll('.block')
    gameController.placePiece(this, player1, player2, board);
    displayController.updateBoard(boardArray, board);
    displayController.turnTracker(player1, player2);
    gameController.scoreGame(board, player1, player2);
}

// all event listeners and query selectors needed to play b
const block = document.querySelectorAll('.block');
block.forEach(button => button.addEventListener('click', game));

const resetButton = document.querySelector('.restart');
resetButton.addEventListener('click', displayController.reset);

const player1Ready = document.querySelector('#player1Ready');
player1Ready.addEventListener('click', displayController.getPlayer1);

const player2Ready = document.querySelector('#player2Ready');
player2Ready.addEventListener('click', displayController.getPlayer2);