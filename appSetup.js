/// <reference path="node_modules/@types/qunit/index.d.ts" />
/* =======================================================
 * Michael Chen
 * TypeScript Converted Chess Implementation
 * Tested by playing out a game of chess
 *

/* =======================================================
 * Code is split into two parts:
    1. Game & Board - appSetup.js
    2. Piece Movement - generateMoves.js

 * Final thoughts and hindsight realizations:
 * An alternative (probably better) design would be creating a class for each chess piece.
 * In addition, make the board a class and have an init method that initializes variables.
 * This will allow for more organized code
 * ie. separate game and interaction code vs. chess piece code

==========================================================
 * Initial Variable Setup
======================================================= */
var pieces = {};
// set up two way dictionary
// word to unicode to improve readability when assigning unicode to pieces
// unicode to word to improve readability when checking what piece is selected
pieces["white_king"] = "\u2654";
pieces["\u2654"] = "white_king";
pieces["white_queen"] = "\u2655";
pieces["\u2655"] = "white_queen";
pieces["white_rook"] = "\u2656";
pieces["\u2656"] = "white_rook";
pieces["white_bishop"] = "\u2657";
pieces["\u2657"] = "white_bishop";
pieces["white_knight"] = "\u2658";
pieces["\u2658"] = "white_knight";
pieces["white_pawn"] = "\u2659";
pieces["\u2659"] = "white_pawn";
pieces["black_king"] = "\u265A";
pieces["\u265A"] = "black_king";
pieces["black_queen"] = "\u265B";
pieces["\u265B"] = "black_queen";
pieces["black_rook"] = "\u265C";
pieces["\u265C"] = "black_rook";
pieces["black_bishop"] = "\u265D";
pieces["\u265D"] = "black_bishop";
pieces["black_knight"] = "\u265E";
pieces["\u265E"] = "black_knight";
pieces["black_pawn"] = "\u265F";
pieces["\u265F"] = "black_pawn";
// thank goodness for this: https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode
// NOTE: I used snake case here instead of camel case because I need to split on the keys later to determine if a piece is black or white
var valid_moves = [];
var whiteTurn = true;
var currentPiece = "";
var currentPieceLocation = "";
var whiteKingLocation = "7-4";
var blackKingLocation = "0-4";
var tempPieces = {};
/* =======================================================
 * Process Input
======================================================= */
function processClick() {
    if (valid_moves.length > 0) {
        var dest = this.id;
        var destCoordinates = dest.split("-");
        if (contains(valid_moves, dest)) {
            makeMove(currentPiece, destCoordinates[0], destCoordinates[1]);
            return;
        }
        else {
            clearValidMoves();
            return;
        }
    }
    if (whiteTurn) {
        var piece = identifyPiece(this.innerHTML);
        var coordinates = this.id.split("-");
        // testing
        if (piece.split("_")[1] == "knight") {
            console.log("hello from processClick");
            console.log(this.innerHTML);
            console.log(tempPieces[this.innerHTML]); //????
            valid_moves = tempPieces[this.innerHTML].genMoves(coordinates[0], coordinates[1]);
        }
        else {
            valid_moves = generateMoves(piece, coordinates[0], coordinates[1], "white");
        }
        // end testing
        if (valid_moves.length > 0) {
            currentPiece = piece;
            currentPieceLocation = this.id;
            showMoves(valid_moves);
        }
        else {
            return;
        }
    }
    else {
        var piece = identifyPiece(this.innerHTML);
        var coordinates = this.id.split("-");
        valid_moves = generateMoves(piece, coordinates[0], coordinates[1], "black");
        if (valid_moves.length > 0) {
            currentPiece = piece;
            currentPieceLocation = this.id;
            showMoves(valid_moves);
        }
        else {
            return;
        }
    }
}
function makeMove(piece, rowDest, colDest) {
    // move and update board
    clearValidMoves();
    whiteTurn = !whiteTurn;
    document.getElementById(currentPieceLocation).innerHTML = "";
    document.getElementById(currentPieceLocation).classList.remove("occupied");
    currentPieceLocation = rowDest + "-" + colDest;
    // pawn promotion
    if (piece === "black_pawn" && rowDest === "7") {
        piece = "black_queen";
    }
    if (piece === "white_pawn" && rowDest === "0") {
        piece = "white_queen";
    }
    document.getElementById(currentPieceLocation).innerHTML = pieces[piece];
    document.getElementById(currentPieceLocation).classList.add("occupied");
    // CHECK functionality ---------------
    if (piece === "black_king") {
        blackKingLocation = rowDest + "-" + colDest;
    }
    if (piece === "white_king") {
        whiteKingLocation = rowDest + "-" + colDest;
    }
    var arr = piece.split("_"); // <color> , <piece type>
    var color = arr[0];
    var attackingSpots = generateMoves(piece, rowDest, colDest, color);
    if (color === "black") {
        if (contains(attackingSpots, whiteKingLocation)) {
            alert("CHECK! Protect the White King!");
        }
        if (whiteKingLocation === rowDest + "-" + colDest) {
            alert("Black Wins!.");
            clearBoard();
            setupBoard();
        }
    }
    else {
        if (contains(attackingSpots, blackKingLocation)) {
            alert("CHECK! Protect the Black King!");
        }
        if (blackKingLocation === rowDest + "-" + colDest) {
            alert("White Wins!.");
            clearBoard();
            setupBoard();
        }
    }
    if (whiteTurn) {
        document.getElementById("turn").innerHTML = "White's Turn.";
    }
    else {
        document.getElementById("turn").innerHTML = "Black's Turn.";
    }
}
/* =======================================================
 * Helper Methods
======================================================= */
function contains(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
function identifyPiece(piece) {
    // identify innerHTML and return associated piece name 
    return pieces[piece];
}
function showMoves(valid_moves) {
    for (var i = 0; i < valid_moves.length; i++) {
        document.getElementById(valid_moves[i]).className += " valid";
    }
}
function clearValidMoves() {
    // remove all high-lighted boxes
    for (var i = 0; i < valid_moves.length; i++) {
        // another way to add classes to div's (this method probably better than appending to the className)
        document.getElementById(valid_moves[i]).classList.remove("valid");
    }
    valid_moves = [];
}
/* =======================================================
 * Board Management
======================================================= */
function setupBoard() {
    var board = document.createElement("div");
    board.className = "board";
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var element = document.createElement("div");
            element.id = i + "-" + j;
            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    element.className = "white tile";
                }
                else {
                    element.className = "black tile";
                }
            }
            else {
                if (j % 2 === 0) {
                    element.className = "black tile";
                }
                else {
                    element.className = "white tile";
                }
            }
            element.addEventListener("click", processClick);
            board.appendChild(element);
        }
    }
    var display = document.createElement("div");
    display.id = "turn";
    display.innerHTML = "White's Turn.";
    document.getElementById("game_container").appendChild(display);
    document.getElementById("game_container").appendChild(board);
    setupPieces();
}
function createPieces() {
    tempPieces["\u2658"] = new KnightPiece("knight", "\u2658", "white");
    tempPieces["\u265E"] = new KnightPiece("knight", "\u265E", "black");
}
function setupPieces() {
    createPieces();
    document.getElementById("0-0").innerHTML = pieces["black_rook"];
    document.getElementById(tempPieces["\u265E"].startingLocation).innerHTML = tempPieces["\u265E"].unicode;
    document.getElementById("0-2").innerHTML = pieces["black_bishop"];
    document.getElementById("0-3").innerHTML = pieces["black_queen"];
    document.getElementById("0-4").innerHTML = pieces["black_king"];
    document.getElementById("0-5").innerHTML = pieces["black_bishop"];
    document.getElementById("0-6").innerHTML = pieces["black_knight"];
    document.getElementById("0-7").innerHTML = pieces["black_rook"];
    for (var i = 0; i < 8; i++) {
        document.getElementById("0-" + i).className += " occupied";
    }
    for (var i = 0; i < 8; i++) {
        document.getElementById("1-" + i).innerHTML = pieces["black_pawn"];
        document.getElementById("1-" + i).className += " occupied";
    }
    document.getElementById("7-0").innerHTML = pieces["white_rook"];
    document.getElementById(tempPieces["\u2658"].startingLocation).innerHTML = tempPieces["\u2658"].unicode;
    document.getElementById("7-2").innerHTML = pieces["white_bishop"];
    document.getElementById("7-3").innerHTML = pieces["white_queen"];
    document.getElementById("7-4").innerHTML = pieces["white_king"];
    document.getElementById("7-5").innerHTML = pieces["white_bishop"];
    document.getElementById("7-6").innerHTML = pieces["white_knight"];
    document.getElementById("7-7").innerHTML = pieces["white_rook"];
    for (var i = 0; i < 8; i++) {
        document.getElementById("7-" + i).className += " occupied";
    }
    for (var i = 0; i < 8; i++) {
        document.getElementById("6-" + i).innerHTML = pieces["white_pawn"];
        document.getElementById("6-" + i).className += " occupied";
    }
}
function clearBoard() {
    var toBeCleaned = document.getElementById("game_container");
    while (toBeCleaned.firstChild) {
        toBeCleaned.removeChild(toBeCleaned.firstChild);
    }
    whiteTurn = true;
}
/* =======================================================
 * Run Game
======================================================= */
setupBoard();
