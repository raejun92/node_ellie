const fs = require('fs').promises;

// read a file
fs.readFile('./text.txt', 'utf8')
.then(data => console.log(data))
.catch(console.error);

// writing a file
fs.writeFile('./file.txt', 'hello dream coders')
.catch(console.error);

fs.appendFile('./file.txt', 'add text')
.catch(console.error);

// copy
// 비동기적으로 처리됨으로 복사가 될 수도 있고 안 될 수도 있음
/* 요런식으로 사용
fs.appendFile('./file.txt', 'add text')
.then(() => {
	fs.copyFile('./file.txt', './file2.txt')
	.catch(console.error);
}) 
.catch(console.error);
*/
fs.copyFile('./file.txt', './file2.txt')
.catch(console.error);

// folder
fs.mkdir('sub-folder')
.catch(console.error);

// 모든 경로에 있는 파일 & 폴더 이름 출력
fs.readdir('./')
.then(console.log)
.catch(console.error);