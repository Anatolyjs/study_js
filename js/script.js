'use strict';
let money; 
const income = 'freelance', 
   addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').toLowerCase().split(', '),
   deposit = confirm('Есть ли у вас депозит в банке?'), 
   mission = 20000, 
   period = 12, 
   exspenses =[],
   sum = [],

   isNumber = function(n) {
      return !isNaN( parseFloat(n) ) && isFinite(n) && n !== 0;
   },

   start = function() {
      do {
         money = +prompt('Ваш месячный доход?');
         console.log( money);
      } while( !isNumber(money) ); 
   },

   showTypeOf = function(data) {
      console.log( typeof(data) );
   },

   getExpensesMonth = function() {
      let temp = 0;
      for (let i = 0; i < 2; i++) {
         exspenses[i] = prompt('Введите обязательную статью расходов?');
         do {
            sum[i] = +prompt('Во сколько это обойдется?');
         } while( !isNumber(sum[i]) ); 
         temp += +sum[i];
      }
      return temp;
   };
start();
const ExpensesAmount = getExpensesMonth(),

      getAccomulateMonth = function () {
         return money - ExpensesAmount;
      },
      accumulateMonth = getAccomulateMonth(),

      getTargetMonth = function (mission, accumulateMonth) {
         return Math.ceil(mission / accumulateMonth);
      },

      budgetDay = Math.floor(accumulateMonth / 30),
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

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit); 

console.log('Расходы за месяц составляют ' + ExpensesAmount);
console.log(addExpenses);
if (accumulateMonth > 0) {
console.log('Цель будет достигнута за ' + getTargetMonth(mission, accumulateMonth)  + ' месяцев');
} else {
   console.log('Цель не будет достигнута');
}
console.log('Ваш бюджет на день составляет ' + budgetDay);
getStatusIncome();




