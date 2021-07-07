const fs = require('fs'); // toString()정의내용을 보기위해 사용

// Fixed-size chunk of memory
// array of integers, byte of data
const buf = Buffer.from('Hi');
console.log(buf);
console.log(buf.length);
console.log(buf[0]);
console.log(buf[1]);
console.log(buf.toString());

// create
const buf2 = Buffer.alloc(2);
const buf3 = Buffer.allocUnsafe(2); // 초기화 하지 않음 fast
buf2[0] = 72;
buf2[1] = 105;
buf2.copy(buf3); // buf2에 있는 것을 buf3로 복사
console.log(buf2.toString());
console.log(buf3.toString());

// concat
const newBuf = Buffer.concat([buf, buf2, buf3]);
console.log(newBuf.toString());