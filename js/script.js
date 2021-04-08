'use strict';
let number;
const isNumber = function(n) {
   return !isNaN( parseFloat(n) ) && isFinite(n) && n !== 0;
},
glFun = function () {
   let counter = 10,
      x = Math.floor(Math.random() * 100 + 1);
   const start = function() {  
      if (counter === 0) {
         const questioning = confirm('Ваши попытки закончились! Хотите сыграть еще раз?');
         if (questioning) {
            counter = 10;
            Math.floor(Math.random() * 100 + 1);
            start();
         } else {
            alert('До новых встреч!');
         }
      } else {
         number = prompt('Угадай число от 0 до 100');
         const checking = function () {
            if ( isNumber(number) ) {
               counter--;
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
      }
   };
   return start;
},
gettting = glFun();
gettting();
