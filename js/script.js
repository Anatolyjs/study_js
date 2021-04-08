'use strict';
let number;
const isNumber = function(n) {
   return !isNaN( parseFloat(n) ) && isFinite(n) && n !== 0;
},
glFun = function () {
   const x = Math.floor(Math.random() * 100 + 1),
      start = function() {  
         number = prompt('Угадай число от 0 до 100');
         const checking = function () {
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
   return start;
},
gettting = glFun();
gettting();

