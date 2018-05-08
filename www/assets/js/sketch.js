/***************************
Sketch
***************************/

var socket;
var host = 'http://127.0.0.1';
var port = 3000;

var cnv;
var grid;
var turn = false,
	end = false,
	play = false;

function setup() {
	frameRate(30);
	// Create canvas and set its position
	cnv = createCanvas(cnvWidth, cnvHeight);
	cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

	// Colors definition
	(colorBG = color(42, 27, 61)),
		((colorCoin = color(125, 104, 163)),
		(colorPlayer1 = color(200, 77, 133)),
		(colorPlayer2 = color(167, 179, 182)));
	// (0,0) is at top-left
	ellipseMode(CORNER);

	gridInit(); // Init logical grid
	renderInit(); // Init graphical grid

	// Socket connection
	socket = io.connect(host + ':' + port);
	// roomList handler
	socket.on('roomList', displayRooms);
	// roomInfo handler
	socket.on('roomInfo', roomInfo);
	// roomIsFull handler
	socket.on('roomIsFull', roomFull);
	// roomNull handler
	socket.on('roomNull', roomNull);
	// updateGrid handler
	socket.on('updateGrid', updateGrid);
	// tableWin handler
	socket.on('tableWin', tableWin);
	// reset handler
	socket.on('reset', resetGame);
	// clientDisconnected handler
	socket.on('clientDisconnected', cliDisconnect);
}

function draw() {
	// Show info
	showInfo();

	// Check draw and end the game
	if (grid.checkDrawMatch() && !end) endGame();

	// Check winner and end the game
	if (grid.checkWinner() > 0 && !end) endGame(grid.checkWinner());
}

function mousePressed() {
	if (play && turn) {
		// If is player's turn
		if (mouseX >= 0 && mouseX <= cnvWidth) {
			// Mouse is in the canvas size
			var col = int(mouseX / fieldSize); // Get col
			grid.update(grid.findNext(col), col, playerNo); // Update logical matrix finding the correct row
			showUpdate(); //Show inserted coin
		}
	}
}

// Show inserted coins
function showUpdate() {
	for (var j = 0; j < rows; j++)
		for (var i = 0; i < cols; i++) {
			// Top left pixel, for drawing
			var topLeftX = i * fieldSize;
			var topLeftY = j * fieldSize;

			var field = grid.checkMatrix[j][i]; // Field from grid at current position
			var attach = grid.attachedCoinMatrix[j][i]; // Attach value from grid at current position

			// If there is a coin, belonging to a player, just inserted
			if (field > 0 && !attach) {
				// Fill the coin with the right color
				fill(field === 1 ? colorPlayer1 : colorPlayer2);
				ellipse(topLeftX, topLeftY, fieldSize, fieldSize);
				updateTable(i, j); // Send update to server
				grid.attachedCoinMatrix[j][i] = true; // Set coin attached
				turn = false; // Pass turn to other player
			}
		}
}

// Send new coin
function updateTable(i, j) {
	var data = {
		// Data to send
		row: i,
		col: j,
		player: playerNo,
		room: roomNo
	};

	console.log('Sending data on updateGrid-> row: ' + data.col + ' col: ' + data.row); // Because inverted matrix
	socket.emit('updateGrid', data);
}

// End game
function endGame(winner) {
	end = true;
	play = false;
	showInfo();
	noLoop();

	$('#defaultCanvas0').css('z-index', '0');
	if (winner) {
		// Send winner to server
		socket.emit('winner', grid.checkWinner());
		// Show winner
		$('#winner').append(
			'<br> <span class="winner-text"> The winner is: <br>' +
				(grid.checkWinner() == 1 ? 'RED Player' : 'WHITE Player') +
				' </span>'
		);
	} else {
		// Send draw to server
		socket.emit('winner', 0);
		// Show draw
		$('#winner').append('<br> <span class="winner-text"> Game ended in draw! </span>');
	}
	$('#winner').show();
}
