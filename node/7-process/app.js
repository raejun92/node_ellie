const process = require('process');

console.log(process.execPath);
console.log(process.version);
console.log(process.pid);
console.log(process.ppid);
console.log(process.platform);
console.log(process.env);
console.log(process.uptime());
console.log(process.cwd());
console.log(process.cpuUsage());


// 현재코드가 다 수행이 되고 0초있다가 내 콜백함수를 수행해줘
setTimeout(() => {
	console.log('setTimeout');
}, 0)

// 현재 수행되고 있는 코드가 다 완료가 된 다음에 내가 등록한 콜백함수를 태스크큐에 넣어달라
process.nextTick(() => {
	console.log('nextTick');
})

for (let i = 0; i < 100; i++) {
	console.log('for loop');
}