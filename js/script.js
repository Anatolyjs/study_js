'use strict';
const money = +prompt('Ваш месячный доход?'), 
income = 'freelance', 
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'), 
mission = 20000, 
period = 12, 
expenses1 = prompt('Введите обязательную статью расходов?'),
expenses2 = prompt('Введите обязательную статью расходов?'),
amount1 = +prompt('Во сколько это обойдется?'),
amount2 = +prompt('Во сколько это обойдется?'),
showTypeOf = function(data) {
   console.log( typeof(data) );
};

function getExpensesMonth(amount1, amount2) {
   return amount1 + amount2; 
} 

function getAccomulateMonth(money, getExpensesMonth) {
   return money - getExpensesMonth;
}

const accumulateMonth = getAccomulateMonth(money, getExpensesMonth(amount1, amount2) ),
 budgetDay = accumulateMonth / 30,
 getStatusIncome = function() {
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
 };

function getTargetMonth(mission, accumulateMonth) {
   return mission / accumulateMonth;
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit); 
console.log('Расходы за месяц составляют' + getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth(mission, accumulateMonth) ) + ' месяцев');
console.log('Ваш бюджет на день составляет ' + Math.floor(budgetDay) );
getStatusIncome();







