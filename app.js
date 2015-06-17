var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);
// usernames which are currently connected to the chat
var usernames = {};
// rooms which are currently available in chat
var rooms = [];
    io.sockets.on('connection', function (socket) {
	    console.log('============  connected from client =========')
	    socket.on('join_to_room', function(data){
		// remove the username from global usernames list
		socket.join(data.id);
		socket.emit('joiningstatus', 'successfully joined into');
	});

	socket.on('send_message', function(data){
	    socket.broadcast.to(data.receiverid).emit('receive_messages', {
          'message': data.message,
          'senderid':data.senderid,
          'receiverid':data.receiverid
         });
	});

    socket.on('friend_request_sent', function(data){
        console.log('friend request notification got=============== ');
        console.log(data);
	socket.broadcast.to(data.id).emit('friend_notification', {'status': 'true' });
    });

	socket.on('connecting', function (data) {
		// store the username in the socket session for this client
		socket.username = data.id;
		// store the room name in the socket session for this client
		socket.room = data.id;
		// add the client's username to the global list
		usernames[data.id] = data.id;
		// send client to room 1
		socket.join(data.id);
		// echo to client they've connected
		socket.broadcast.to(data.id).emit('updatechat', 'SERVER', data.id + ' has connected to this room');

        var data = [];
        var all_rooms = [];
		ns = io.of("/");    // the default namespace is "/"
        if (ns) {
            for (var id in ns.connected) {
                    data.push(ns.connected[id]);
            }
        }
	    for(temp in data){
	        all_rooms.push(data[temp].username);
	    }

	    socket.emit('avaiblerooms', all_rooms);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		//io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		//socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
		console.log('user disconnected', socket.username)
	});
});
