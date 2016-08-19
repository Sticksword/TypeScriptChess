var Piece = (function () {
    function Piece(color) {
        this.color = color;
    }
    Piece.prototype.genMoves = function (row, col) {
        return [];
    };
    Piece.prototype.addValidSpot = function (moves, targetRow, targetCol) {
        var targetVal = document.getElementById(targetRow + "-" + targetCol).innerHTML;
        if (targetVal === "") {
            moves.push(targetRow + "-" + targetCol);
            return true;
        }
        else {
            var targetPiece = pieces[targetVal];
            var arr = targetPiece.split("_");
            if (arr[0] != this.color) {
                moves.push(targetRow + "-" + targetCol);
            }
            return false;
        }
    };
    return Piece;
}());
