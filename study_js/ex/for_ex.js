//1. 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라.

var x = 15;
if (x > 10 && x < 20) {
  console.log(x);
}

//2. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

for (var i = 0; i < 10; i++) {
  if (i % 2 === 0)
  console.log(i);
}


//3. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.

var str = '';
for (var i = 0 ; i < 10; i ++) {
  if (i % 2 === 0) str += i;
}
console.log(str, typeof str);


//4.for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰 수부터 출력하시오.

for (j = 10; j > 0; j--) {
  if (j % 2 !== 0)
  console.log(j);
}


//5. while문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

var count = 0;
while (count < 10) {
  if (count % 2 === 0) console.log(count);
  count++;
}

//6. while문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰 수부터 출력하시오.

var odd = 10;
while (odd > 0) {
  if (odd % 2 !== 0) console.log(odd);
  odd--;
}

//7. for 문을 사용하여 0부터 10미만의 정수의 합을 출력하시오.

var sum = 0;
for (var i = 0; i < 10; i++) {
  sum += i;
}
console.log(sum);

//8. 1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오.

var sum = 0;
for (var i = 1; i < 20; i++) {
  if (i % 2 !==0 && i % 3 !==0) {
    sum += i;
  }
}
console.log(sum);

//9. 1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오.


var sum = 0;
for (var i = 1; i < 20; i++) {
  sum += i % 2 ? (i % 3 ? 0 : i) : i;
}
console.log(sum);


//10. 두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.

for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) 
    console.log(`[${i}, ${j}]`);
  }
}


// 11. 삼각형 출력하기 - pattern 1

var line = 5;
var star = '';
for (var i = 1; i <= line; i++) {
  for (var j = 1; j <= i; j++) {
    star += '*';
  }
  star += '\n';
}
console.log(star);


// 12. 삼각형 출력하기 - pattern 2

var star2 = '';
for (var i = 0; i < 5; i++) {
  for (var j = 0; j < i; j++) {
    star2 += ' ';
  }
  for (var a = 0; a < 5 - i; a++) {
    star2 += '*';
  }
  star2 += '\n';
}
console.log(star2);


//13. 삼각형 출력하기 - pattern 3

var line = 5;
var star3 = '';

for (var i = line; i > 0; i--) {
  for (var j = 1; j <= i; j++) {
    star3 += '*';
  } 
 star3 += '\n';
}
console.log(star3);


//14. 삼각형 출력하기 - pattern 4

var star4 = '';
for(var i = 0; i < 5; i++){
     for(var j = 0; j < 5 - i - 1; j++){
       star4 += ' ';
     }
  for(var a = 0; a < i + 1; a++){
    star4 += '*';
  }
  star4 += '\n';
}
console.log(star4);

//15. 정삼각형 출력하기

var line = 5;
var star5 = '';
for (var i = 0; i < line; i++) {
  for (var j = 0; j < line - i - 1; j++) {
    star5 += ' ';
  }
  for (var a = 0; a < (i * 2) + 1; a++) {
    star5 += '*';
  }
  star5 += '\n';
}
console.log(star5);


//16. 역정삼각형 출력하기

