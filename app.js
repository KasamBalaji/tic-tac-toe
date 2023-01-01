const resetBtn = document.getElementById("resetBtn");
const cells = Array.from(document.getElementsByClassName("game-board-cell"));
const gameMessage = document.getElementById("game-message");

let gameCompleted = false;
let board = Array.from(Array(3), () => new Array(3));
let currentPlayer = 0;
let count =0;

resetBtn.addEventListener("click", function(){
    gameCompleted = false;
    board = Array.from(Array(3), () => new Array(3));
    currentPlayer =0;
    count=0;
    cells.forEach((el)=> el.innerHTML="");
    setPlayerTurn();
});

function setPlayerTurn(){
    gameMessage.innerHTML = `Turn of Player ${currentPlayer+1}`;
};

function isGameCompleted(idx){
    let row = Math.floor(idx/3);
    let col = idx%3;
    //Check column
    if(board[0][col]===board[1][col] && board[1][col]===board[2][col])
        return true;
    //Check Row
    if(board[row][0]===board[row][1] && board[row][1]==board[row][2])
        return true;
    //Check Diagonal
    if(row===col && board[0][0]==board[1][1] && board[1][1]==board[2][2])
        return true;
    //Check Diagonal 2
    if(row+col==2 && board[0][2]==board[1][1] && board[1][1]==board[2][0])
        return true;
    return false;
}

function isEmpty(str) {
    return (!str || str.length === 0 );
}

cells.forEach((el, idx)=>{
    el.addEventListener("click", function(){
        if(gameCompleted) return;
        if(isEmpty(el.innerHTML)){
            el.innerHTML = currentPlayer===0?'X':'O';
            board[Math.floor(idx/3)][idx%3]= currentPlayer+1;
            gameCompleted = isGameCompleted(idx);
            if(gameCompleted){
                gameMessage.innerHTML = `Game Won By Player ${currentPlayer+1}`;
                return;
            };
            currentPlayer = currentPlayer^1;
            setPlayerTurn();
            count = count+1;
            if(count==9){
                gameCompleted=true;
                gameMessage.innerHTML= `Tie Match`;
            }
        }
    });
});

