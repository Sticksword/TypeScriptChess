
class KnightPiece extends Piece {

  startingLocation: string;

  // maybe remove name input later on
  constructor(public name: string, public unicode: string, public color: string) {
    super(color);
    if (color == 'white') {
      this.startingLocation = "7-1";
    } else {
      this.startingLocation = "0-1";
    }
  }

  genMoves(row, col): string[] {
    console.log("hello from KnightPiece genMoves");
    var moves: string[] = [];
    var targetRow: number = parseInt(row) - 2;
    var targetCol: number = parseInt(col) - 1;
    if (targetRow >= 0 && targetCol >= 0) {
      super.addValidSpot(moves, targetRow, targetCol);
    }
    targetCol = parseInt(col) + 1;
    if (targetRow >= 0 && targetCol < 8) {
      super.addValidSpot(moves, targetRow, targetCol);
    }

    targetRow = parseInt(row) - 1;
    targetCol = parseInt(col) - 2;
    if (targetRow >= 0 && targetCol >= 0) {
      super.addValidSpot(moves, targetRow, targetCol);
    }
    targetCol = parseInt(col) + 2;
    if (targetRow >= 0 && targetCol < 8) {
      super.addValidSpot(moves, targetRow, targetCol);
    }

    targetRow = parseInt(row) + 1;
    targetCol = parseInt(col) - 2;
    if (targetRow < 8 && targetCol >= 0) {
      super.addValidSpot(moves, targetRow, targetCol);
    }
    targetCol = parseInt(col) + 2;
    if (targetRow < 8 && targetCol < 8) {
      super.addValidSpot(moves, targetRow, targetCol);
    }

    targetRow = parseInt(row) + 2;
    targetCol = parseInt(col) - 1;
    if (targetRow < 8 && targetCol >= 0) {
      super.addValidSpot(moves, targetRow, targetCol);
    }
    targetCol = parseInt(col) + 1;
    if (targetRow < 8 && targetCol < 8) {
      super.addValidSpot(moves, targetRow, targetCol);
    }
    
    return moves;
  }


}
