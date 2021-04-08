'use strict';
let number;
const isNumber = function(n) {
   return !isNaN( parseFloat(n) ) && isFinite(n) && n !== 0;
},

   start = function() {  
      number = prompt('Угадай число от 0 до 100');
      const x = 45,
      checking = function () {
         if ( isNumber(number) ) {
            if (number > x) {
               alert('Заданное число меньше');
               start();
            } else if (number < x) {
               alert('Заданное число больше');
               start();
            } else if (number === x) {
               alert('Поздравляю! Вы угадали!');
            } 
         } else {
            alert('Введи число!');
            start();
         }
      };
      
      if (number === null) {
         alert('Игра окончена.');
      } else {
         number = +number;
         checking();
      }
   };
start();
