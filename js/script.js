'use strict';
const arr = ['123', '242', '533', '431', '7654', '2223', '42'];
for (let i = 0; i < 7; i++) {
   for (let y = 0; y < arr[i].length; y++) {
      if ( arr[i][0] === '2' || arr[i][0] === '4') {
         console.log( arr[i] );
      }
   }
}
// 2 задание
function cheking(n) {
   let k = 0;
   for (let i = 0; i <= n; i++) {
      if (k > 2) {
         break;
      }
      else if (n % i === 0) {
         k++;
      }
   }
   if (k === 2) {
      console.log( n + ' - Простое число  И его делители - 1 и ' + n );
   }
}
for (let y = 2; y < 101; y++) {
   cheking(y);
}