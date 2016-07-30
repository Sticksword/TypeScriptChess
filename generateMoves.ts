/* =======================================================
 * Move Generation Methods
======================================================= */ 

function generateMoves(piece, row, col, color): string[] {
  // generate list of coordinates for possible moves
  switch(color) {
    case "white":
      switch(piece) {
        case "white_king":
          return generateKingMoves(row, col, color);
        case "white_queen":
          return generateQueenMoves(row, col, color);
        case "white_rook":
          return generateRookMoves(row, col, color);
        case "white_knight":
          return generateKnightMoves(row, col, color);
        case "white_bishop":
          return generateBishopMoves(row, col, color);
        case "white_pawn":
          return generatePawnMoves(row, col, color);
        default:
          console.log("You pressed a tile that doesn't contain a white piece.");
          return [];
      }

    case "black":
      switch(piece) {
        case "black_king":
          return generateKingMoves(row, col, color);
        case "black_queen":
          return generateQueenMoves(row, col, color);
        case "black_rook":
          return generateRookMoves(row, col, color);
        case "black_knight":
          return generateKnightMoves(row, col, color);
        case "black_bishop":
          return generateBishopMoves(row, col, color);
        case "black_pawn":
          return generatePawnMoves(row, col, color);
        default:
          console.log("You pressed a tile that doesn't contain a black piece.");
          return [];
      }

    default:
      console.log("Not sure what happened but something went wrong.");
      return [];
  }
}

function addValidSpot(moves, targetRow, targetCol, targetColor): boolean {
  var targetVal = document.getElementById(targetRow + "-" + targetCol).innerHTML;
  if (targetVal === "") {
    moves.push(targetRow + "-" + targetCol);
    return true;
  } else {
    var targetPiece = pieces[targetVal];
    var arr = targetPiece.split("_");
    if (arr[0] != targetColor) {
      moves.push(targetRow + "-" + targetCol);
    }
    return false;
  }
}

var four_diag = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

function generateDiagonals(row, col, color): string[] {
  var moves = [];
  var targetRow = parseInt(row) - 1;
  var targetCol = parseInt(col) - 1;
  while(targetRow >= 0 && targetCol >= 0) { // going NW dir
    if (!addValidSpot(moves, targetRow, targetCol, color)) {
      break;
    }
    targetRow--;
    targetCol--;
  }

  targetRow = parseInt(row) + 1;
  targetCol = parseInt(col) - 1;
  while(targetRow < 8 && targetCol >= 0) { // going SW dir
    if (!addValidSpot(moves, targetRow, targetCol, color)) {
      break;
    }
    targetRow++;
    targetCol--;
  }

  targetRow = parseInt(row) + 1;
  targetCol = parseInt(col) + 1;
  while(targetRow < 8 && targetCol < 8) { // going SE dir
    if (!addValidSpot(moves, targetRow, targetCol, color)) {
      break;
    }
    targetRow++;
    targetCol++;
  }

  targetRow = parseInt(row) - 1;
  targetCol = parseInt(col) + 1;
  while(targetRow >= 0 && targetCol < 8) { // going NE dir
    if (!addValidSpot(moves, targetRow, targetCol, color)) {
      break;
    }
    targetRow--;
    targetCol++;
  }

  return moves;
}

function generateStraights(row, col, color): string[] {
  var moves: string[] = [];
  var targetRow: number = parseInt(row) - 1;
  while(targetRow >= 0) { // generate north path
    if (!addValidSpot(moves, targetRow, col, color)) {
      break;
    }
    targetRow--;
  }

  targetRow = parseInt(row) + 1;
  while(targetRow < 8) { // generate south path
    if (!addValidSpot(moves, targetRow, col, color)) {
      break;
    }
    targetRow++;
  }

  var targetCol = parseInt(col) - 1;
  while(targetCol >= 0) { // generate west path
    if (!addValidSpot(moves, row, targetCol, color)) {
      break;
    }
    targetCol--;
  }

  targetCol = parseInt(col) + 1;
  while(targetCol < 8) { // generate east path
    if (!addValidSpot(moves, row, targetCol, color)) {
      break;
    }
    targetCol++;
  }

  return moves;
}

function generateKingMoves(row, col, color): string[] {
  var moves: string[] = [];
  var targetRow: number = parseInt(row) - 1;
  var targetCol: number = parseInt(col) - 1;
  if (targetRow >= 0 && targetCol >= 0) { // -1, -1
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetRow++;
  if (targetCol >= 0) { // 0, -1
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetRow++;
  if (targetRow < 8 && targetCol >= 0) { // +1, -1
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetCol++;
  if (targetRow < 8) { // +1, 0
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetRow -= 2; // skipping 0, 0
  if (targetRow >= 0) { // -1, 0
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetCol++;
  if (targetRow >= 0 && targetCol < 8) { // -1, +1
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetRow++;
  if (targetCol < 8) { // 0, +1
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetRow++;
  if (targetRow < 8 && targetCol < 8) { // +1, +1
    addValidSpot(moves, targetRow, targetCol, color);
  }
  return moves;
}

function generateQueenMoves(row, col, color): string[] {
  var moves = generateDiagonals(row, col, color);
  moves = moves.concat(generateStraights(row, col, color));
  return moves;
}

function generateRookMoves(row, col, color): string[] {
  return generateStraights(row, col, color);
}

function generateKnightMoves(row, col, color): string[] {
  var moves: string[] = [];
  var targetRow: number = parseInt(row) - 2;
  var targetCol: number = parseInt(col) - 1;
  if (targetRow >= 0 && targetCol >= 0) {
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetCol = parseInt(col) + 1;
  if (targetRow >= 0 && targetCol < 8) {
    addValidSpot(moves, targetRow, targetCol, color);
  }

  targetRow = parseInt(row) - 1;
  targetCol = parseInt(col) - 2;
  if (targetRow >= 0 && targetCol >= 0) {
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetCol = parseInt(col) + 2;
  if (targetRow >= 0 && targetCol < 8) {
    addValidSpot(moves, targetRow, targetCol, color);
  }

  targetRow = parseInt(row) + 1;
  targetCol = parseInt(col) - 2;
  if (targetRow < 8 && targetCol >= 0) {
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetCol = parseInt(col) + 2;
  if (targetRow < 8 && targetCol < 8) {
    addValidSpot(moves, targetRow, targetCol, color);
  }

  targetRow = parseInt(row) + 2;
  targetCol = parseInt(col) - 1;
  if (targetRow < 8 && targetCol >= 0) {
    addValidSpot(moves, targetRow, targetCol, color);
  }
  targetCol = parseInt(col) + 1;
  if (targetRow < 8 && targetCol < 8) {
    addValidSpot(moves, targetRow, targetCol, color);
  }
  
  return moves;
}

function generateBishopMoves(row, col, color): string[] {
  return generateDiagonals(row, col, color);
}

function generatePawnMoves(row, col, color): string[] {
  var moves: string[] = [];
  if (color === "white") { // white pawn options
    var newRow = parseInt(row) - 1;
    if (document.getElementById(newRow + "-" + col).innerHTML === "") {
      moves.push(newRow + "-" + col);
    }
    var newCol = parseInt(col) + 1;
    if (newCol < 8) {
      var target = document.getElementById(newRow + "-" + newCol).innerHTML;
      if (target === "") {

      } else {
        var piece = pieces[target];
        var arr = piece.split("_");
        if (arr[0] === "black") {
          moves.push(newRow + "-" + newCol);
        }
      }
    }
    newCol = newCol - 2;
    if (newCol >= 0) {
      var target = document.getElementById(newRow + "-" + newCol).innerHTML;
      if (target === "") {

      } else {
        var piece = pieces[target];
        var arr = piece.split("_");
        if (arr[0] === "black") {
          moves.push(newRow + "-" + newCol);
        }
      }
    }
    if (parseInt(row) === 6) { // can move 2 tiles if it hasn't moved
      newRow--;
      if (document.getElementById(newRow + "-" + col).innerHTML === "") {
        moves.push(newRow + "-" + col);
      }
    }
    return moves;
  } else { // black pawn options
    var newRow = parseInt(row) + 1;
    if (document.getElementById(newRow + "-" + col).innerHTML === "") {
      moves.push(newRow + "-" + col);
    }
    var newCol = parseInt(col) + 1;
    if (newCol < 8) {
      var target = document.getElementById(newRow + "-" + newCol).innerHTML;
      if (target === "") {

      } else {
        var piece = pieces[target];
        var arr = piece.split("_");
        if (arr[0] === "white") {
          moves.push(newRow + "-" + newCol);
        }
      }
    }
    newCol = newCol - 2;
    if (newCol >= 0) {
      var target = document.getElementById(newRow + "-" + newCol).innerHTML;
      if (target === "") {

      } else {
        var piece = pieces[target];
        var arr = piece.split("_");
        if (arr[0] === "white") {
          moves.push(newRow + "-" + newCol);
        }
      }
    }
    if (parseInt(row) === 1) { // can move 2 tiles if it hasn't moved
      newRow++;
      if (document.getElementById(newRow + "-" + col).innerHTML === "") {
        moves.push(newRow + "-" + col);
      }
    }
    return moves;
  }
}