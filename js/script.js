'use strict';
function fun(arg) {
   if ( typeof(arg) !== 'string') {
      console.log('Вы передали не строку');
   } else {
      arg = arg.trim();
      if (arg.length > 30) {
         console.log( arg.slice(0, 29) + '...');        
      } else {
         console.log(arg);
      }  
   }
}
const str = '   Hi my name is Anatoly! I live in Belarus, Belarus is the centre of Europe.   ';
fun(str);