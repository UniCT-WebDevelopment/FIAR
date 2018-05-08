/***************************
Game Settings
***************************/

var roomNo, playerNo, nickname;
// fieldSize depending if a mobile device or tablet or desktop pc
var fieldSize = window.matchMedia('(max-width: 767px').matches
	? 50
	: window.matchMedia('(max-width: 967px').matches ? 70 : 100;
var rows = 6,
	cols = 7;
var cnvWidth = cols * fieldSize,
	cnvHeight = rows * fieldSize;
var colorBG, colorCoin, colorPlayer1, colorPlayer2;

// Create and init logical grid
function gridInit() {
	grid = new Grid(rows, cols);
	grid.init();
}

// Init graphical grid
function renderInit() {
	for (var j = 0; j < cnvHeight; j++)
		for (var i = 0; i < cnvWidth; i++) {
			// Set color to white, for drawing rectangle
			stroke(colorBG);
			strokeWeight(10);
			fill(colorBG);
			// Top left pixel, for drawing
			var topLeftX = i * fieldSize;
			var topLeftY = j * fieldSize;
			rect(topLeftX, topLeftY, fieldSize, fieldSize);
			fill(colorCoin);
			ellipse(topLeftX, topLeftY, fieldSize, fieldSize);
		}
}
