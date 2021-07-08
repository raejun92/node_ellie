const os = require('os');
const fs = require('fs');
const path = require('path');

// 계획
// 1. 사용자가 원하는 폴더의 이름을 받아온다
const folder = process.argv[2];
const workingDir = path.join(os.homedir(), `node_ellie/photo/${folder}`);

if (!folder || !fs.existsSync(workingDir)) {
	console.error('please enter folder name in Pictures');
}

// 2. 그 폴더안에 video, captured, duplicated 폴더를 만든다
// 디렉토리는 아직 만들어지지 않았지만, 변수에 디렉토리가 만들어진 후의 경로를 저장
const videoDir = path.join(workingDir, 'video'); 
const capturedDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

// 위에서 만든 경로에 폴더가 존재하지 않으면 폴더를 만든다 (동기적)
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

// 3. 폴더안에 있느 파일들을 다 돌면서 해당하는 mp4 || mov, png || aae, IMG_1234 (IMG_E1234)
// 폴더를 읽어와 안에 있는 파일을 하나씩 검사
fs.promises.readdir(workingDir)
.then(processFiles) // processFiles == files => processFiles(files) 전달하는 인자와 호출하는 인자가 같으면 생략 가능
.catch(console.error);

function processFiles(files) {
	files.forEach((file) => {
		if (isVideoFile(file)) {
			move(file, videoDir);
		} else if (isCapturedFile(file)) {
			move(file, capturedDir);
		} else if (isDuplicatedFile(files, file)) {
			move(file, duplicatedDir);
		}
	});
}

// 정규표현식: 특정 패턴의 문자열을 찾기 위한 표현 방식
function isVideoFile(file) {
	const regExp = /(mp4|mov)$/gm; // 정규표현식에서 |(or), $(특정 문자열로 끝남), g: 모든 문자 검색 m: 여러 행의 문자열에 대해 검색
	const match = file.match(regExp); 
	return !!match; // !!을 하면 boolean match에 결과값이 있다면 true
}
function isCapturedFile(file) {
	const regExp = /(png|aae)$/gm;
	const match = file.match(regExp); 
	return !!match; 
}

function isDuplicatedFile(files, file) {
	// IMG_XXXX -> IMG_EXXX
	// startsWith: 어떤 문자열이 특정 문자로 시작하는지 확인하여 결과를 true or false 반환
	if (!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
		return false;
	}

	const edited = `IMG_E${file.split('_')[1]}`; // IMG_XXXX를 _로 나누어 XXXX부분을 가져옴
	// find: 주어진 판별 함수를 만족하는 첫 번째 요소의 값 반환
	// includes: 배열이 특정 요소를 포함하고 있는지 판별
	// includes(edited) f === edited와 같음
	const found = files.find(f => f.includes(edited)); 
	return !!found;
}

function move(file, targetDir) {
	console.info(`move ${file} to ${path.basename(targetDir)}`);
	const oldPath = path.join(workingDir, file);
	const newPath = path.join(targetDir, file);
	fs.promises
	.rename(oldPath, newPath)
	.catch(console.error);
}