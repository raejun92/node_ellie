const EventEmitter = require('events');
const emitter = new EventEmitter();

const callback1 = (args) => {
	console.log('first callback - ', args);
};
emitter.on('ellie', callback1);

emitter.on('ellie', (args) => {
	console.log('second callback - ', args);
});

// emit으로 이벤트를 발생시킬 수 있음
emitter.emit('ellie', {message: 1});
emitter.emit('ellie', {message: 2});
// emitter.removeListener('ellie', callback1); // ellie, callback인 first 제거
emitter.removeAllListeners(); // ellie라는 이벤트가 사라져 message 3 출력 안됨
emitter.emit('ellie', {message: 3});