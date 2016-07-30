I am fiddling with TypeScript by porting an old Chess implementation.

SETUP:
* Download zip or clone repo
* cd into project folder and run `tsc appSetup.ts generateMoves.ts`

Then:
* Option 1: Open up index.html via Chrome
* Option 2:
  * Run `npm install http-server` or install some simple server
  * Then run `http-server` and go to localhost:port

TODO:
* Add castling
* Add En Passant
* Improve check functionality
* Add checkmate functionality
* Add Undo functionality
* Show pieces taken on both sides
* Multiplayer?
