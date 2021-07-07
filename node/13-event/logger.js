const EventEmitter = require('events');

// EventEmitter는 한 번 객체를 만들면 객체내에서 발생하는 이벤트에 한에서 들을 수 있음
class Logger extends EventEmitter {
	log(callback) {
		this.emit('log', 'started...');
		callback();
		this.emit('log', 'ended!');
	}
}

module.exports.Logger = Logger;