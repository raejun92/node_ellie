const fs = require('fs');

const beforeMem = process.memoryUsage().rss;

fs.readFile('./file.txt', (_, data) => {
	fs.writeFile('./file2.txt', data, () => {});
	// calculate
	const afterMem = process.memoryUsage().rss;
	const diff = afterMem - beforeMem;
	const consumed = diff / 1024 / 1024;
	console.log(diff);
	console.log(`Consumed Memory: ${consumed}MB`);
});
// file을 file2로 복사하는데 사용되는 메모리 용량