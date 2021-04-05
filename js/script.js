'use strict';
const money = prompt('Ваш месячный доход?'), 
income = 'freelance', 
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'), 
mission = 20000, 
period = 12, 
expenses1 = prompt('Введите обязательную статью расходов?'),
expenses2 = prompt('Введите обязательную статью расходов?'),
amount1 = +prompt('Во сколько это обойдется?'),
amount2 = +prompt('Во сколько это обойдется?'),
budgetMonth = money - (amount1 + amount2),
budgetDay = budgetMonth / 30;
console.log( typeof(money), typeof(income), typeof(deposit) );
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay, addExpenses, budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil(mission / budgetMonth) + ' месяцев');
console.log( Math.floor(budgetDay) );
if (budgetDay  >= 1200) {
   console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
   console.log('У вас средний уровень дохода');
} else if (budgetDay > 0 && budgetDay < 600) {
   console.log('К сожалению, у вас уровень дохода ниже среднего');
} else if (budgetDay === 0) {
   console.log('Ваш дневной бюджет равен 0! Нужно что-то с этим делать!');
} else {
   console.log('Что-то пошло не так!');
}







