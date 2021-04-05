'use strict';
let money = 2000, 
income = 'freelance', 
addExpenses = 'Internet, taxi, communal flat',
deposit = true, 
mission = 20000, 
period = 12, 
budgetDay = money/30;
console.log( typeof(money), typeof(income), typeof(deposit) );
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);
money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?');
const amount2 = +prompt('Во сколько это обойдется?');
const budgetMonth = money - (amount1 + amount2);
console.log(budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil(mission / budgetMonth) + ' месяцев');
console.log( Math.round(budgetDay = budgetMonth / 30) );
if (budgetDay  >= 1200) {
   console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
   console.log('У вас средний уровень дохода');
} else if (budgetDay > 0 && budgetDay < 600) {
   console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
   console.log('Что-то пошло не так');
}







