const fs = require('fs'); // global이 브라우저용인지 자바스크립트용인지 알기 위해 노드 모듈을 가져옴

console.log(global);

global.hello = () => {
	global.console.log('hello');
}

global.hello();
hello(); // global은 생략 가능