var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KnightPiece = (function (_super) {
    __extends(KnightPiece, _super);
    // maybe remove name input later on
    function KnightPiece(name, unicode, color) {
        _super.call(this, color);
        this.name = name;
        this.unicode = unicode;
        this.color = color;
        if (color == 'white') {
            this.startingLocation = "7-1";
        }
        else {
            this.startingLocation = "0-1";
        }
    }
    KnightPiece.prototype.genMoves = function (row, col) {
        console.log("hello from KnightPiece genMoves");
        var moves = [];
        var targetRow = parseInt(row) - 2;
        var targetCol = parseInt(col) - 1;
        if (targetRow >= 0 && targetCol >= 0) {
            _super.prototype.addValidSpot.call(this, moves, targetRow, targetCol);
        }
        targetCol = parseInt(col) + 1;
        if (targetRow >= 0 && targetCol < 8) {
            _super.prototype.addValidSpot.call(this, moves, targetRow, targetCol);
        }
        targetRow = parseInt(row) - 1;
        targetCol = parseInt(col) - 2;
        if (targetRow >= 0 && targetCol >= 0) {
            _super.prototype.addValidSpot.call(this, moves, targetRow, targetCol);
        }
        targetCol = parseInt(col) + 2;
        if (targetRow >= 0 && targetCol < 8) {
            _super.prototype.addValidSpot.call(this, moves, targetRow, targetCol);
        }
        targetRow = parseInt(row) + 1;
        targetCol = parseInt(col) - 2;
        if (targetRow < 8 && targetCol >= 0) {
            _super.prototype.addValidSpot.call(this, moves, targetRow, targetCol);
        }
        targetCol = parseInt(col) + 2;
        if (targetRow < 8 && targetCol < 8) {
            _super.prototype.addValidSpot.call(this, moves, targetRow, targetCol);
        }
        targetRow = parseInt(row) + 2;
        targetCol = parseInt(col) - 1;
        if (targetRow < 8 && targetCol >= 0) {
            _super.prototype.addValidSpot.call(this, moves, targetRow, targetCol);
        }
        targetCol = parseInt(col) + 1;
        if (targetRow < 8 && targetCol < 8) {
            _super.prototype.addValidSpot.call(this, moves, targetRow, targetCol);
        }
        return moves;
    };
    return KnightPiece;
}(Piece));
