console.log('log');

// log level
// 배포 했을 때 빠르게 이슈를 파악할 수 있음
console.log('log'); // 개발
console.log('info'); // 정보
console.log('warn'); // 경보
console.log('error'); // 에러, 사용자 에러, 시스템 에러

// assert
// 참이 아닐 때 출력
console.assert(2 === 3, 'not same');
console.assert(2 === 2, 'same');

// print object
const student = {name: 'ellie', age: 20, company: {name: 'YG'}};
console.log(student);
console.table(student);
console.dir(student);
console.dir(student, {showHidden: true, colors: false, depth: 0});

// measuring time
// 시간 잴때 사용 성능비교
console.time('for loop');
for (let i = 0; i < 10; i++) {
	i++;
}
console.timeEnd('for loop');

// counting
// 내가 호출한 함수가 내가 예상한 만큼 호출이 되었는지 확인
function a() {
	console.count('a function');
}
a();
console.countReset('a function'); // 카운트 초기화
a();

// trace
// 함수가 어디서 어떻게 호출되었는지 알고 싶을 때 사용
function f1() {
	f2();
}

function f2() {
	f3();
}

function f3() {
	console.log('f3');
	console.trace();
}
f1();