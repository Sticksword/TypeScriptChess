
class Piece {

  unicode: string;
  startingLocation: string;

  constructor(public color: string ) {

  }

  genMoves(row, col): string[] {
    return [];
  }

  addValidSpot(moves, targetRow, targetCol): boolean {
    var targetVal = document.getElementById(targetRow + "-" + targetCol).innerHTML;
    if (targetVal === "") {
      moves.push(targetRow + "-" + targetCol);
      return true;
    } else {
      var targetPiece = pieces[targetVal];
      var arr = targetPiece.split("_");
      if (arr[0] != this.color) {
        moves.push(targetRow + "-" + targetCol);
      }
      return false;
    }
  }

}