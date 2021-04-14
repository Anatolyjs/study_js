 'use strict';
// let money;
// const isNumber = function(n) {
//     return !isNaN( parseFloat(n) ) && isFinite(n) && n !== 0;
// },
//    start = function() {
//       do {
//          money = +prompt('Ваш месячный доход?');
//          console.log(money);
//       } while( !isNumber(money) ); 
//    },

//    isString = function(str) {
//       let counterNumbers = 0,
//          counterSpaces = 0;
//       str = str.split('');
//       for (let i = 0 ; i < str.length; i++) {
//          if ( !isNaN( parseFloat(str[i]) ) ) {
//             counterNumbers++;
//          }
//          if (str[i] === ' ') {
//             counterSpaces++;
//          }
//       }
//       return (counterNumbers === str.length || counterSpaces === str.length || counterSpaces + counterNumbers === str.length );
//    };

// start();
// const appData = {
//    income: {},
//    addIncome: [],
//    expenses: {},
//    addExpenses: [],
//    deposit: false,
//    percentDeposit: 0,
//    moneyDeposit: 0,
//    mission: 50000,
//    period: 12,
//    budget: money,
//    budgetDay: 0,
//    budgetMonth: 0,
//    exspensesMonth: 0,
//    getInfoDeposit: function () {
//       if (appData.deposit) {
//          do {
//             appData.percentDeposit = +prompt('Какой годовой процент?');
//          } while ( !isNumber(appData.percentDeposit) );
//          do {
//             appData.moneyDeposit = +prompt('Какая сумма заложена?');
//          } while( !isNumber(appData.moneyDeposit) );
//       }  
//    },
//    asking: function() {
//       if ( confirm('Есть ли у вас дополнительный заработок?') ) {
//          let itemIncome,
//             cashIncome = 0;
//          do {
//             itemIncome = prompt('Какой у вас дополнительный заработок?');
//          } while ( itemIncome === null || isString(itemIncome) );   
//          itemIncome = itemIncome.toLowerCase();
//          do {
//             cashIncome = +prompt('Сколько вы на этом зарабатываете?');
//          } while ( !isNumber(cashIncome) );
//          appData.income[itemIncome] = cashIncome;
//       }
//       do {
//          appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
//       } while (appData.addExpenses === null || isString(appData.addExpenses));
//       appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
//       appData.deposit = confirm('Есть ли у вас депозит в банке?'); 
//       appData.getInfoDeposit();
//       for (let i = 0; i < 2; i++) {
//          let question;
//          do {
//             question = prompt('Введите обязательную статью расходов?');
//          } while (question === null || isString(question) );
//          question = question.toLowerCase();
//          let exp;
//          do {
//             exp = +prompt('Во сколько это обойдется?');
//          } while( !isNumber(exp) );
//          appData.expenses[question] = exp; 
//       }
//    },

//    getExpensesMonth: function() {
//        for (let key in appData.expenses) {
//           appData.exspensesMonth += appData.expenses[key];
//        }
//     },

//    getBudget: function () {
//       appData.budgetMonth = appData.budget - appData.exspensesMonth; 
//       appData.budgetDay = appData.budgetMonth / 30;
//     },

//    getTargetMonth: function () {
//       return Math.ceil(appData.mission / appData.budgetMonth);
//     },

//    getStatusIncome: function() {
//        if (appData.budgetDay  >= 1200) {
//            console.log('У вас высокий уровень дохода');
//         } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
//             console.log('У вас средний уровень дохода');
//         } else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
//             console.log('К сожалению, у вас уровень дохода ниже среднего');
//         } else if (appData.budgetDay === 0) {
//             console.log('Ваш дневной бюджет равен 0! Нужно что-то с этим делать!');
//         } else {
//             console.log('Что-то пошло не так!');
//         }
//     },

//    calcSavedMoney: function () {
//       return appData.budgetMonth * appData.period;
//    }
// };
// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();

// console.log('Расходы за месяц составляют ' + appData.exspensesMonth);
// if (appData.budgetMonth > 0) {
//     console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
// } else {
//     console.log('Цель не будет достигнута');
// }
// appData.getStatusIncome();
// for (let key in appData) {
//     console.log('Наша программа включает в себя данные ' + key + ' ' + appData[key] );
// }

const button = document.getElementById("start"),
 buttonPlus1 = document.getElementsByTagName("button")[0],
 buttonPlus2 = document.getElementsByTagName("button")[1],
 deposit = document.querySelector('#deposit-check'),
 additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
 budgetMonth = document.getElementsByClassName('budget_month-value')[0],
 budgetDay = document.getElementsByClassName('budget_day-value')[0],
 exspensesMonth = document.getElementsByClassName('expenses_month-value')[0],
 additionalIncome = document.getElementsByClassName('additional_income-value')[0],
 additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
 incomePeriod = document.getElementsByClassName('income_period-value')[0],
 targetMonth = document.getElementsByClassName('target_month-value')[0],

 salaryAmount = document.querySelector('.salary-amount'),
 incomeTitle = document.querySelector('.income-items .income-title '),
 incomeAmount = document.querySelector('.income-amount'),
 expensesTitle = document.querySelector('.expenses-items .expenses-title'),
 expensesInputAmount = document.querySelector('.expenses-amount'),
 additionalExpensesItem = document.querySelector('.additional_expenses-item'),
 targetAmount = document.querySelector('.target-amount'),
 range = document.querySelector('.period-select');

console.log(buttonPlus1);
console.log(buttonPlus2);
console.log(deposit);
console.log(additionalIncomeItem);
console.log(budgetMonth);
console.log(budgetDay);
console.log(exspensesMonth);
console.log(additionalIncome);
console.log(additionalExpenses);
console.log(incomePeriod);
console.log(targetMonth);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesInputAmount);
console.log(additionalExpensesItem);
console.log(targetAmount);
console.log(range);




 
