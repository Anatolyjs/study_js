'use strict';
const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ],
   days = document.querySelector('.Days'),
   getWeekDay = function(date) {
      date = date || new Date();
      const day = date.getDay();
      return   day;
   },
   index = getWeekDay();
week[index] = week[index].bold();
week[0] = week[0].italics();
week[6] = week[6].italics();
   
let str= '';
for (let i = 1; i < week.length; i++ ) {
   str += week[i]+ '<br>';
}
str += week[0] + '\n';
days.innerHTML = str;


