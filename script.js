
//initialize players 
var playerOne = prompt("Player One (Blue): Enter Your Name");
if(playerOne === null || playerOne === "") playerOne = "Blue";
var playerOneColor = 'rgb(86,151,255)';

var playerTwo = prompt("Player Two (Red): Enter Your Name");
if(playerTwo === null || playerTwo === "") playerTwo = "Red";
var playerTwoColor = 'rgb(237,45,73)';

var gameover = false;

var table = $('table tr');



function reportWin(rowNum,colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex,colIndex,color,player){
    var border = "thick solid " + color;  //without border circles look weird
    table.eq(rowIndex).find('td').eq(colIndex).find('button').css('border',border);

    //$("#playerturn").text(player+"'s Turn");
    //$("#playerturn").css(color,color);

    // $("#playerturn").css('color',color);

    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
    // got this from : https://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
}

function reportColor(rowIndex,colIndex){

    var color = table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
    if(color !== "rgb(128, 128, 128)") console.log(color);
    return color;
}

function checkBottom(colIndex){
    var colorReport = reportColor(5,colIndex);
    for (var row = 5; row > -1; row--){
        colorReport = reportColor(row,colIndex);
        // console.log(colorReport);
        if (colorReport === "rgb(128, 128, 128)"){
            console.log("bottom most row: "+ row);
            return row
        }
    }
}

function matchColor(one,two,three,four){
    return ( one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined );
    //return false

    // put spaces between , and 128 ie: 'rgb(128, 128, 128)' not 'rgb(128,128,128)'
}

function checkHorizontalWin() {
    console.log("horicalled");
    for (var row = 0 ; row < 6; row++){
        for (var col = 0; col < 4 ; col++){
            if (matchColor(reportColor(row,col), reportColor(row,col+1),reportColor(row,col+2),reportColor(row,col+3))){
                console.log('horizonalwin');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}
function checkVerticalWin() {
    for (var col= 0 ; col < 7; col++){
        for (var row = 0; row < 3 ; row++){
            if (matchColor(reportColor(row,col), reportColor(row+1,col),reportColor(row+2,col),reportColor(row+3,col))){
                console.log('horizonalwin');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}
function checkDiagonalWin() {
    for (var col = 0 ; col < 5; col++){
        for (var row = 0; row < 7 ; row++){
            if (matchColor(reportColor(row,col), reportColor(row+1,col+1),reportColor(row+2,col+2),reportColor(row+3,col+3))){
                console.log('horizonalwin');
                reportWin(row,col);
                return true;
            }else if (matchColor(reportColor(row,col), reportColor(row-1,col+1),reportColor(row-2,col+2),reportColor(row-3,col+3))){
                console.log('horizonalwin');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}

//start with playerone
var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

$("#playerturn").text(currentName+"'s Turn"); 
$("#playerturn").css("color",currentColor);


$('h3').text(playerOne+" it Is your turn, pick a column to drop in!!")

$('.board button').on('click', function () {
    if (!gameover) {
        // changeColor(2,2,"rgb(0,255,0)");
        console.log("Click function executed!!!")

        var col = $(this).closest('td').index();
        console.log(col);
        var bottomAvail = checkBottom(col);

        console.log(bottomAvail); // undefined why ????

        changeColor(bottomAvail, col, currentColor, currentName);

        // if (checkHorizontalWin()){
        if (checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()) {
            $("#playerturn").text(currentName + " wins the game!!");
            // $('h1').text(currentName + " wins the game!!");
            // $('h3').fadeOut('fast');
            // $('h2').fadeOut('fast');
            gameover = true;
        }

        currentPlayer = currentPlayer * -1;
        if (currentPlayer === 1) {
            currentName = playerOne;
            // $('h3').text(currentName + " it is your turn.")
            currentColor = playerOneColor
        } else {
            currentName = playerTwo;
            // $('h3').text(currentName + " it is your turn.")
            currentColor = playerTwoColor
        }
        if (!gameover) {
            $("#playerturn").text(currentName + "'s Turn");
            $("#playerturn").css("color", currentColor);
        }
    }
}) 