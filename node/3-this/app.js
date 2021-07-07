function hello() {
	console.log(this);
	console.log(this === global);
}

hello();

class A {
	constructor(num) {
		this.num = num;
	}
	memberFunction() {
		console.log('---- class ----');
		console.log(this);
		console.log(this === global);
	}
}

const a = new A(1);
a.memberFunction();

console.log('--- global ---');
console.log(this); // 브라우저에서는 this가 글로벌
console.log(this === module.exports); // 노드에서 this는 모듈에 있는 exports