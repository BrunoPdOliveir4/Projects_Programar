class Board {
    constructor(player1, player2) {
        this.player_1 = 
        { 
            username: player1,
            plays: []
        };
        this.player_2 = {
            username: player2,
            plays: []
        };
        this.currentPlayer = 0;
        this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }

    play(cell, player) {
        if (this.board[cell.y][cell.x] === 0) {  
            if ((player.username === this.player_1.username) && this.currentPlayer === 0) {
                this.board[cell.y][cell.x] = 1;
                this.currentPlayer = (this.currentPlayer + 1) % 2;
            }
            if ((player.username === this.player_2) && this.currentPlayer === 1){   
                this.board[cell.y][cell.x] = 2;
                return this.board;
            }
        } else {
            console.log("Cell is already occupied!");
            return null;
        }
    }

    printBoard() {
        console.log(this.board.map(row => row.join(" ")).join("\n"));
    }
}
