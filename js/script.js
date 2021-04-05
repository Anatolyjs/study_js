'use strict';
const language = prompt('Введите язык', 'ru или en');
const days= [
   ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
   ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
];
function ru() {
   for (let i = 0; i < 7; i++) {
      console.log( days[1][i] );
   }
}
function en() {
   for (let i = 0; i < 7; i++) {
      console.log( days[0][i] );
   }
}
if ( language === 'ru') {
   ru();

} else if (language === 'en') {
   en();
} else {
   console.log('Что-то пошло не так!');
}
console.log('---------');

switch( language ) {
   case 'ru':
      ru();
      break;
   case 'en':
      en();
    break;
    default:
       console.log('Что-то пошло не так!');

}
console.log('---------');
language === 'ru'? ru() : language === 'en'? en() : console.log('Что-то пошло не так!');

const namePerson = prompt('Введите имя', 'Артем, Максим или еще что-то');
namePerson === 'Артем'? console.log('Директор') : namePerson === 'Максим'? console.log('Преподаватель') : console.log('Студент');