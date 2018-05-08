/***************************
Main
***************************/

// initGame
function initGame() {
	$('#winner').empty();
	$('#winner').hide();
	$('#main-screen').hide();
	$('#game-screen').show();
	play = true;
	$('#defaultCanvas0').show();
}

// mainScreen
function mainScreen() {
	let nick = $(':text').val(); // Get nickname
	if (nick.length == 0) {
		// If no nickname
		window.alert('Please insert a nickname!');
		return;
	}
	$('#login-screen').hide();
	$('#main-screen').show();

	login(nick);
}

// login
function login(nick) {
	socket.emit('login', nick);
}

// createRoom
function createRoom() {
	socket.emit('createRoom');
}

// joinRoom
function joinRoom(id) {
	socket.emit('joinRoom', id);
}

// showInfo
function showInfo() {
	//console.log('Player: ', playerNo);
	let color = playerNo === 1 ? 'red' : 'white';
	let infoTurn = turn ? "It's your turn" : 'Wait opponent';
	if (!play) infoTurn = 'Match ended!';
	$('#info').empty();
	$('#info').removeClass('red'); // Remove older colors
	$('#info').removeClass('white');
	$('#info').addClass(color === 'red' ? 'white' : 'red');
	let element =
		'<h3>ROOM ' +
		roomNo +
		'</h3>\
		<h4 class="' +
		color +
		'">' +
		nickname +
		'</h4>\
		<h4>' +
		infoTurn +
		'</h4>';
	$('#info').append(element);
}

// roomsList handler
function displayRooms(rooms, nick) {
	$('#rooms').empty();
	//console.log('rooms: ' + rooms);
	rooms.forEach((obj) => {
		let element =
			'<label class="inputContainer">Room		' +
			obj.r +
			'		 - 		Created by ' +
			obj.creator +
			'<input type="radio" name="rooms" data-nroom=' +
			obj.r +
			' type="radio" value=room-' +
			obj.r +
			'>' +
			'<span class="checkmark"></span>' +
			'</label></br>';
		$('#rooms').append(element);
	});
}

// roomInfo handler
function roomInfo(info) {
	roomNo = info.n;
	console.log('Room: ' + roomNo);
	playerNo = info.player;
	console.log('playerNo = ' + playerNo);
	nickname = info.nick;
	console.log('Nickname: ' + nickname);
	turn = playerNo == 1 ? true : false;
}

// updateGrid handler
function updateGrid(data) {
	console.log('Receiving data from updateGrid-> row: ' + data.col + ' col: ' + data.row); // Because inverted matrix
	grid.update(data.col, data.row, data.player); // Inverted rows and cols
	grid.attachedCoinMatrix[data.col][data.row] = true;
	fill(data.player === 1 ? colorPlayer1 : colorPlayer2);
	ellipse(data.row * fieldSize, data.col * fieldSize, fieldSize, fieldSize);
	turn = true;
}

// roomError
function roomError() {
	$('#game-screen').hide();
	$('#defaultCanvas0').hide();
	$('#main-screen').show();
	play = false;
}

// roomIsFull handler
function roomFull() {
	roomError();
	window.alert('Selected room is full!\nPlease select another one!');
}

// roomNull handler
function roomNull() {
	roomError();
	window.alert("You haven't selected a room!\nPlease select one!");
}

// tableWin handler
function tableWin() {
	if (end) return;
	end = true;
	play = false;
	showInfo();
	noLoop();
	$('#defaultCanvas0').css('z-index', '0');
	$('#winner').append('<br> <span class="winner-text"> You won cause other player left! </span>');
	$('#winner').show();
}

// reset handler
function resetGame() {
	$('#winner').empty();
	$('#defaultCanvas0').hide();
	$('#game-screen').hide();
	loop();
	gridInit(); // Init logical grid
	renderInit(); // Init graphical grid
	end = false;
	$('#main-screen').show();
}

// disconnect handler
function cliDisconnect(data) {
	console.log('Someone disconnected...');
	displayRooms(data);
}

$(document).ready(function() {
	$(window).resize(() => cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2));

	// Login
	$('#btn-login').click(() => mainScreen());
	$('#input-login').keypress((event) => {
		if (event.which == 13) mainScreen(); // If return pressed
	});

	// Create room
	$('#btn-create').click(() => {
		initGame();
		createRoom();
	});

	// Join room
	$('#btn-join').click(() => {
		var id = $(':radio:checked').data('nroom');
		//console.log('Selected room: ', id);
		initGame();
		joinRoom(id);
	});

	// Exit
	$('#exit').click(() => {
		resetGame();
		socket.emit('exit');
	});
});
