/***************************
Server
***************************/

var express = require('express');
var app = express();
var web_server = require('http').createServer(app);
var web_socket = require('socket.io')(web_server);
var port = 3000;
app.use('/', express.static(__dirname + '/www'));

var roomNo = 1;
var playerNo = 1;
var roomsList = [];

// Create Room
function createRoom(client) {
	// Join room and push infos
	roomsList.push({ r: roomNo, status: 'joinable', creator: client.nickname });
	client.join('room-' + roomNo);
	console.log('>>', client.nickname, ' joined room-' + roomNo);

	client.inroom = roomNo;
	playerNo = 2; // So he has to wait another player

	// Send infos to clients
	roomInfo = { n: roomNo, player: playerNo, nick: client.nickname };
	client.emit('roomInfo', roomInfo);
	console.log('Rooms: ', roomsList);
	client.broadcast.emit('roomList', roomsList);
	roomNo++;
}

// Join room
function joinRoom(client, id) {
	if (!id) {
		// Client didn't select a room
		client.emit('roomNull');
		return;
	}

	let index = roomsList.findIndex((rooms) => rooms.r == id); // Get where room is (index)
	if (index === -1) {
		// Room isn't in list
		client.emit('reset');
		return;
	}

	if (roomsList[index].status === 'full' || roomsList[index].status === 'half') {
		// If non-joinable room
		client.emit('roomIsFull');
		return;
	}

	// Join room
	client.join('room-' + id);
	console.log('>>', client.nickname, ' joined room-' + id);

	client.inroom = id;
	roomsList[index].status = 'full'; // Room is full (2 players inside)
	playerNo = 1;

	// Send infos to clients
	roomInfo = { n: id, player: playerNo, nick: client.nickname };
	client.emit('roomInfo', roomInfo);
	console.log('Rooms: ', roomsList);
	client.broadcast.emit('roomList', roomsList);
}

// exit
function exit(client) {
	client.in('room-' + client.inroom).emit('tableWin');
	remove(client.inroom);
	client.leave('room-' + client.inroom);
	client.broadcast.emit('clientDisconnected', roomsList);
	client.broadcast.emit('roomList', roomsList);
}

// removeRoom
function remove(socketInRoom) {
	let index = roomsList.findIndex((rooms) => rooms.r == socketInRoom);
	if (index === -1) return;
	if (roomsList[index].status !== 'half')
		roomsList[index].status = 'half'; // Check if there is a player in the room
	else roomsList.splice(index, 1);
	setTimeout(clearHalf, 60000); // Clear half rooms after 60 secs
}

// clear half rooms
function clearHalf() {
	roomsList.forEach((obj) => {
		if (obj.status === 'half') roomsList.splice(roomsList[roomsList.indexOf(obj)], 1);
	});
}

// Socket Connection
web_socket.on('connection', (client) => {
	var socket = client;
	console.log('New connection: ' + socket.id);
	socket.broadcast.emit('roomList', roomsList);

	// login handler
	socket.on('login', (nickname) => {
		socket.nickname = nickname;
		console.log('>>', socket.nickname, ' connected');
		socket.broadcast.emit('roomList', roomsList);

		// createRoom handler
		socket.on('createRoom', () => {
			console.log('>>', socket.nickname, ' trying to create room');
			createRoom(socket);
		});

		// joinRoom handler
		socket.on('joinRoom', (id) => {
			console.log('>>', socket.nickname, ' trying to join room ', id);
			joinRoom(socket, id);
		});

		// updateGrid handler sendig to other socket data
		socket.on('updateGrid', (data) => {
			console.log('\t\tReceived data from player-' + data.player + ' in room-' + data.room);
			socket.broadcast.in('room-' + data.room).emit('updateGrid', data); // Sending received data to other socket in room
		});

		// winner handler
		socket.on('winner', (winner) => {
			winner
				? console.log('\t\tMatch ended and player ' + winner + ' won!')
				: console.log('\t\tMatch ended in draw!');
		});

		// exit handler
		socket.on('exit', () => {
			console.log('>>', socket.nickname, ' out from room-' + socket.inroom);
			exit(socket);
		});

		// disconnect handler
		socket.on('disconnect', () => {
			console.log('>>', socket.nickname, ' disconnected');
			exit(socket);
		});
	});
});

web_server.listen(port);
console.log('Server listening on port ' + port);
