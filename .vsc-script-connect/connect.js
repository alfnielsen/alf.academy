import * as socketIoClient from 'socket.io-client';
import * as vsc from 'vsc-base'

console.log('Hi!')


	var socket = socketIoClient.connect('localhost', {
		port: '3636'
	});
	socket.on('message', function (data: { type, message }) {
		if (data.type === 'show') {
			vsc.showMessage(data.message)
		}
	});
	setTimeout(() => {
		socket.emit('send', { type: 'show', message: "Hi hi!" });
	}, 8000)
