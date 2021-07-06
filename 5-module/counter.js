let count = 0;

export function increase() {
	count++;
}

export function getCount() {
	return count;
}

// 내보내기

/* module.exports vs exports
exports는 module.exports의 참조값을 가지고 있음
exports.increase = increase;와 module.exports.increase = increase;는 똑같이 동작
but!
exports = {};다른 값을 할당 후 exports.increase = increase;는 동작하지 않음
why: exports에 새로운 오브젝트를 생성했고 그곳에 increase를 생성했기 때문에 exports와 module.exports는 같지 않게 됨
*/