const path = require('path');

// 운영체제 마다 표기법이 다르다
// POSIX (Unix: Mac, Linux): 'Users/tmp/myfile.html'
// Windows: 'C:||temp||myfile.html'

// 글로벌 객체에 있는 디렉토리 이름과 파일네임
console.log(__dirname);
console.log(__filename);

console.log(path.sep); // 경로 구분자
console.log(path.delimiter); // 환경변수 구분자

// basename
// 특정한 경로를 읽음
console.log(path.basename(__filename));
console.log(path.basename(__filename, '.js')); // 두번째 인자 확장자 제거

// dirname
// 특정한 디렉토리를 읽음
console.log(path.dirname(__filename));

//extension
// 특정한 확장자를 읽음
console.log(path.extname(__filename));

// parse
// 경로를 분리해서 읽음
const parsed = path.parse(__filename);
console.log(parsed);
parsed.root;
parsed.name;

const str = path.format(parsed); // parse로 나누었던 경로를 스트링으로 변환
console.log(str);

// isAbsolute
// 절대경로면 true
console.log('isAbsolue', path.isAbsolute(__dirname));
console.log('isAbsolue', path.isAbsolute('../'));

// normalize
// 경로가 조금 이상하면 고쳐줌
console.log(path.normalize('./folder///////sub'));

// join
// 경로를 연결시킴
console.log(__dirname + path.sep + 'image'); // 운영체제별로 경로가 달라 직접작성하면 안좋음
console.log(path.join(__dirname, 'image'));