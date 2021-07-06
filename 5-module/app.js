// import { increase, getCount } from './counter.js'; // 가져오기

// increase();
// console.log(getCount());

import * as counter from './counter.js'; // 모든 모듈을 counter라는 이름으로 가져옴

counter.increase();
console.log(counter.getCount());