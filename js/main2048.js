/**
 * Created by Marshall on 2015/10/21.
 */
var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty =0;
var endx = 0;
var endy = 0;

$(function () {
    prepareForMobile();
    newgame();
});

function prepareForMobile(){
    if(documentWidth>500){
        gridContainerWidth=500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $("#grid-container").css({
        'width':gridContainerWidth-2*cellSpace,
        'height':gridContainerWidth-2*cellSpace,
        'padding':cellSpace,
        'border-radius':0.02*gridContainerWidth
    });
    $(".grid-cell").css({
        'width':cellSideLength,
        'height':cellSideLength,
        'border-radius':0.02*cellSideLength
    });
}

function newgame(){
    init();//初始化棋盘格
    generateOneNumber();//随机生成两个数字
    generateOneNumber();
}

function init(){
    for(var i = 0; i<4; i++){
        for(var j = 0; j<4; j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i));
            gridCell.css("left",getPosLeft(j));
        }
    }

    for(var m = 0; m < 4; m++){
        board[m] = new Array();
        hasConflicted[m] = new Array();
        for(var n = 0; n < 4; n++){
            board[m][n] = 0;
            hasConflicted[m][n] = false;
        }
    }

    updateBoardView();
    score = 0;
    $('#score').text(score);
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0; i < 4; i++){
        for(var j = 0; j<4; j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
            var theNumberCell = $("#number-cell-"+i+"-"+j);

            if(board[i][j]==0){
                theNumberCell.css("width","0");
                theNumberCell.css("height","0");
                theNumberCell.css("top",getPosTop(i)+cellSideLength/2);
                theNumberCell.css("left",getPosLeft(j)+cellSideLength/2);
            }else{
                theNumberCell.css("width",cellSideLength);
                theNumberCell.css("height",cellSideLength);
                theNumberCell.css("top",getPosTop(i));
                theNumberCell.css("left",getPosLeft(j));
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }

    $('.number-cell').css({
        'line-height':cellSideLength+'px',
        'font-size':0.6*cellSideLength+'px'
    });
}

function generateOneNumber(){
    if(nospace(board)){
        return false;
    }

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    var times = 0;

    while(times<50){
        if(board[randx][randy]==0){
            break;
        }
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));

        times++;
    }
    if(times == 50){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    //随机一个数字
    var randNumber = Math.random()<0.5?2:4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);

    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37:
            event.preventDefault();
            if(moveLeft()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
            }
            break;
        case 38:
            event.preventDefault();
            if(moveUp()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
            }
            break;
        case 39:
            event.preventDefault();
            if(moveRight()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
            }
            break;
        case 40:
            event.preventDefault();
            if(moveDown()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
            }
            break;
        default:
            break;
    }
});

document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
    event.preventDefault();
});

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if(Math.abs(deltax)<0.2*documentWidth && Math.abs(deltay)<0.2*documentWidth) return;
    //x
    if(Math.abs(deltax)>=Math.abs(deltay)){
        if(deltax>0){
            //move right
            if(moveRight()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
            }
        }else{
            //move left
            if(moveLeft()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
            }
        }
    }
    //y
    else{
        if(deltay>0){
            //move down
            if(moveDown()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
            }
        }else{
            //move up
            if(moveUp()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
            }
        }
    }
});

function isgameover(){
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover(){
    alert('game over!');
}
function moveLeft(){

    if( !canMoveLeft(board) ){
        return false
    }

    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            if(board[i][j] != 0){
                for(var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //move
                        //add
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView,200);
    return true;
}

function moveRight(){

    if( !canMoveRight(board) ){
        return false
    }

    for(var i = 0; i < 4; i++){
        for(var j = 2; j >= 0; j--){
            if(board[i][j] != 0){
                for(var k = 3; k > j; k--){
                    if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                        //move
                        //add
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView,200);
    return true;
}

function moveUp(){

    if( !canMoveUp(board) ){
        return false
    }

    for(var j = 0; j < 4; j++){
        for(var i = 1; i < 4; i++){
            if(board[i][j] != 0){
                for(var k = 0; k < i; k++){
                    if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
                        //move
                        //add
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView,200);
    return true;
}

function moveDown(){

    if( !canMoveDown(board) ){
        return false
    }

    for(var j = 0; j < 4; j++){
        for(var i = 2; i >= 0; i--){
            if(board[i][j] != 0){
                for(var k = 3; k > i; k--){
                    if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
                        //move
                        //add
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView,200);
    return true;
}