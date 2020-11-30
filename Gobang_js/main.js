var btn = document.getElementById("btn");
var aibtn = document.getElementById("aibtn");
var lbtn = document.getElementById("lbtn");
var canvas = document.getElementById("chessboard");
var context = canvas.getContext("2d");
var chessMap = [];
var chessColor = ["black", "white"];
var step = 0;
var flag = false;
var len = 20;
var ldx,ldy;
var ai=false
var checkMode = [
    [1,0],
    [0,1],
    [1,1],
    [1,-1],
];
//function Switch(){
//        if(confirm("Switch game？")){
//        window.location.href = 'tic_tac_toe.html'
//         return true;
//        }else{
//         return false;
//        }
//     }
//Switch();
lbtn.addEventListener("click",function(){
    step--;
    chessMap[ldx/30-1][ldy/30-1]=0;
    cleanChessBoard();
    drawChessBoard();
     for(var i=0; i<len; i++){
        for(var j=0; j<len; j++){
            if(chessMap[i][j]!=0){
                drawChess((i+1)*30,(j+1)*30,chessMap[i][j]);
            }
        }
     }
})
aibtn.addEventListener("click",function(){
    ai=true;
    var num=prompt("Please enter the board size",14);
            len=Number(num);
            document.getElementById('chessboard').width=len*30+30;
            document.getElementById('chessboard').height=len*30+30;
        startGame();

})
function aiplay(){
    var dx=Math.floor(Math.random()*(len-1))*30+30;
    var dy=Math.floor(Math.random()*(len-1))*30+30;
//    alert(dx+":"+dy);
    while(chessMap[dx/30-1][dy/30-1] != 0)
    {
        dx=Math.floor(Math.random()*(len-1))*30+30;
        dy=Math.floor(Math.random()*(len-1))*30+30;
    }

    if(chessMap[dx/30-1][dy/30-1] == 0){
        var Color=step % 2;
        drawChess(dx,dy,chessColor[Color]);
        ldx=dx;
        ldy=dy;

        chessMap[dx/30-1][dy/30-1]= chessColor[Color];
        for(var i=0;i<4;i++){
            checkWin(dx/30-1,dy/30-1, chessColor[Color],checkMode[i]);
        }
        step++;
    }
}

btn.addEventListener("click",function(){
    ai=false;
 var num=prompt("Please enter the board size",14);
        len=Number(num);
<!--        alert("len:"+len)-->
        document.getElementById('chessboard').width=len*30+30;
        document.getElementById('chessboard').height=len*30+30;
    startGame();
})
function drawChessBoard() {
    for (var i = 0; i < len; i++) {
        context.beginPath();
        context.moveTo((i+1) * 30, 30);
        context.lineTo((i+1) * 30, canvas.height - 30);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(30, (i+1) * 30);
        context.lineTo(canvas.width - 30, (i+1) * 30);
        context.closePath();
        context.stroke();
    }
}

function startGame() {

    step=0;
    for(var i=0; i<len; i++){
       chessMap[i] = [];
       for(var j=0; j<len; j++){
          chessMap[i][j] = 0;
        }    
    }
    cleanChessBoard();
    drawChessBoard();
    over = false;
    flag = false;
}


function cleanChessBoard() {
    context.fillStyle = "#8f7b65";
    context.fillRect(0, 0, canvas.width, canvas.height);
}


function drawChess(x,y,color) {
    context.beginPath();
    context.arc(x,y,15,0,Math.PI*2,false);
    context.closePath();
    context.fillStyle = color;
    context.fill();
    //context.stroke();
}
function judge(x,y){
    if(x < 30 || x > len*30|| y < 30 || y > len*30)return true;
    return false;
}
canvas.addEventListener("click",function(e){
    if (flag) {
        alert("Game Over!");
        return;
    }

    if(judge(e.offsetX,e.offsetY)){
       return;
    }
    var dx = Math.floor((e.offsetX + 15) / 30 ) * 30;
    var dy = Math.floor((e.offsetY + 15) / 30 ) * 30;
    if(chessMap[dx/30-1][dy/30-1] == 0){
        var Color=step % 2;
        drawChess(dx,dy,chessColor[Color]);
        ldx=dx;
        ldy=dy;

        chessMap[dx/30-1][dy/30-1]= chessColor[Color];
        for(var i=0;i<4;i++){
            checkWin(dx/30-1,dy/30-1, chessColor[Color],checkMode[i]);
        }
        step++;
        if(ai)
        {
            aiplay();
        }

    } 
});


function checkWin(x,y,color,mode)
{
    var count = 1;
    for(var i=1;i<5;i++){
        if(chessMap[x + i * mode[0]]){
            if(chessMap[x + i * mode[0]][y + i * mode[1]] == color){
                count++;
            }else{
                break;
            }
        }
    }
    
    for(var j=1;j<5;j++){
        if(chessMap[x - j * mode[0]]){
            if(chessMap[x - j * mode[0]][y - j * mode[1]] == color){
                count++;
            }else{
                break;
            }
        }
    }
   
    if(count >= 5){
        alert("game over!" + color + "  wins!");
        // game over
        flag = true;
    }
};
