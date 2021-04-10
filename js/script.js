'use strict';
let money;
const isNumber = function(n) {
    return !isNaN( parseFloat(n) ) && isFinite(n) && n !== 0;
},
   start = function() {
      do {
         money = +prompt('Ваш месячный доход?');
         console.log( money);
      } while( !isNumber(money) ); 
   };

start();
const appData = {
   income: {},
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   mission: 50000,
   period: 12,
   budget: money,
   budgetDay: 0,
   budgetMonth: 0,
   exspensesMonth: 0,
   asking: function() {
       appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').toLowerCase().split(', ');
       appData.deposit = confirm('Есть ли у вас депозит в банке?'); 
       for (let i = 0; i < 2; i++) {
           let question = prompt('Введите обязательную статью расходов?'),
               exp;
            do {
               exp = +prompt('Во сколько это обойдется?');
            } while( !isNumber(exp) );
            appData.expenses[question] = exp; 
        }
    },

   getExpensesMonth: function() {
       for (let key in appData.expenses) {
          appData.exspensesMonth += appData.expenses[key];
       }
    },

   getBudget: function () {
      appData.budgetMonth = appData.budget - appData.exspensesMonth; 
      appData.budgetDay = appData.budgetMonth / 30;
    },

   getTargetMonth: function () {
      return Math.ceil(appData.mission / appData.budgetMonth);
    },

   getStatusIncome: function() {
       if (appData.budgetDay  >= 1200) {
           console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
            console.log('К сожалению, у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay === 0) {
            console.log('Ваш дневной бюджет равен 0! Нужно что-то с этим делать!');
        } else {
            console.log('Что-то пошло не так!');
        }
    },
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц составляют ' + appData.exspensesMonth);
if (appData.budgetMonth > 0) {
    console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}
appData.getStatusIncome();
for (let key in appData) {
    console.log('Наша программа включает в себя данные ' + key + ' ' + appData[key] );
}







