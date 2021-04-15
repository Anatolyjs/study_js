'use strict';

const start = document.getElementById("start"),
    buttonPlus1 = document.getElementsByTagName("button")[0],
    buttonPlus2 = document.getElementsByTagName("button")[1],
    deposit = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    exspensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],

    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items '),
    expensesTitle = document.querySelector('.expenses-items .expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');
let expensesItems = document.querySelectorAll('.expenses-items');
console.log(incomeItems);
const isNumber = function(n) {
    return !isNaN( parseFloat(n) ) && isFinite(n) && n !== 0;
},
   

   isString = function(str) {
      let counterNumbers = 0,
         counterSpaces = 0;
      str = str.split('');
      for (let i = 0 ; i < str.length; i++) {
         if ( !isNaN( parseFloat(str[i]) ) ) {
            counterNumbers++;
         }
         if (str[i] === ' ') {
            counterSpaces++;
         }
      }
      return (counterNumbers === str.length || counterSpaces === str.length || counterSpaces + counterNumbers === str.length );
   };

const appData = {
   income: {},
   incomeMonth: 0,
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   budget: 0,
   budgetDay: 0,
   budgetMonth: 0,
   exspensesMonth: 0,
   start: function() {
        if (salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено');
            return;
        }
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();   
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.floor(appData.budgetDay);
        exspensesMonthValue.value = appData.exspensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();

    },

    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlus2);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonPlus2.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach( function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = +item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
        } 
        } );
    },
    getIncome: function() {
        incomeItems.forEach( function(item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = +item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
            for (let key in appData.income) {
                appData.incomeMonth += +appData.income[key];
            }
        }) ;
    },

    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach( function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function() {
        additionalIncomeItem.forEach( function(item) {
            let itemValue = item.value.trim();  
            if (item.value !== '') {    
                appData.addIncome.push(itemValue);
            }
        } );
    },

    getInfoDeposit: function () {
      if (appData.deposit) {
         do {
            appData.percentDeposit = +prompt('Какой годовой процент?');
         } while ( !isNumber(appData.percentDeposit) );
         do {
            appData.moneyDeposit = +prompt('Какая сумма заложена?');
         } while( !isNumber(appData.moneyDeposit) );
      }  
   },

   getExpensesMonth: function() {
       for (let key in appData.expenses) {
          appData.exspensesMonth += appData.expenses[key];
       }
    },

   getBudget: function () {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.exspensesMonth; 
      appData.budgetDay = appData.budgetMonth / 30;
    },

   getTargetMonth: function () {
      return Math.ceil(targetAmount.value / appData.budgetMonth);
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

   calcSavedMoney: function () {
      return appData.budgetMonth * periodSelect.value;
   }
};
start.addEventListener('click', appData.start);
buttonPlus2.addEventListener('click', appData.addExpensesBlock);


// if (appData.budgetMonth > 0) {
//     console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
// } else {
//     console.log('Цель не будет достигнута');
// }

 
