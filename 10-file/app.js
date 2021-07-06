const fs = require('fs');

// 모든 api는 3가지 형태로 제공
// rename(..., callback(error, data)) 비동기

// 따로 에러를 보내지 않아 try-catch로 묶음(묶지 않으면 죽어버려 뒤에 애들이 실행 안됨)
// try {renameSync(...)} catch(e) {} 동기
// 사용하지 않는 것이 좋음

// promises.rename().then().catch(0)

try {
	fs.renameSync('./text.txt', './text-new.txt');
} catch (error) {
	console.log(error);
}

fs.rename('./text-new.txt', './text.txt', (error) => {
	console.log(error);
});

console.log('hello');

fs.promises.rename('./text2.txt', './text-new.txt').then(() => {
	console.log('Done');
}).catch(console.error); // console.error == (error) => {console.error(error)}