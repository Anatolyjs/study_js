'use strict';
let check = true;
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items ');
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
    expensesTitle = document.querySelector('.expenses-items .expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    titlePeriodAmount = document.querySelector('.period-amount'),
    namePlaceholder = document.querySelectorAll('[placeholder="Наименование"]'),
    amountPlaceholder = document.querySelectorAll('[placeholder="Сумма"]'),

    correctionWord = function(word) { 
        if (word !== '') {
            word = word.toLowerCase().split('');
            let temp = word[0].toUpperCase();
            word = word.join('');
            word = temp + word.slice(1);
            return word;
        } else {
            return ('');
        }
    },
    
    appData = {
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
        checkingInputName: function() {
            namePlaceholder.forEach( function(item) {
                item.addEventListener('input', function() {
                    item.value = item.value.replace(/[^а-яА-ЯёЁ .,!?:;'"]/,'');
                } );
            } );
        },
        checkingInputAmount: function() {
            amountPlaceholder.forEach( function(item) {
                item.addEventListener('input', function() {
                    item.value = item.value.replace(/[^0-9]/,'');
                } );
            } );
        },

        blockButton: function() {
            start.disabled = check;
            },

        start: function() {
            appData.budget = +salaryAmount.value;
            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getIncomeMonth();
            appData.getAddExpenses(); 
            appData.getAddIncome();
            appData.getBudget();
            appData.showResult();
            appData.blockButton();
        },
        
        getIncomePeriodValue: function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        },

        showResult: function() {
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = Math.floor(appData.budgetDay);
            exspensesMonthValue.value = appData.exspensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = appData.getTargetMonth();
            incomePeriodValue.value = appData.calcSavedMoney();
            periodSelect.addEventListener('change', function() {
                incomePeriodValue.value = appData.calcSavedMoney();
            } );
        },
        
        getPeriodSelect: function() {
            titlePeriodAmount.textContent = periodSelect.value;
        },

        addExpensesBlock: function() {
        
            let cloneExpensesItem = expensesItems[0].cloneNode(true);  
            cloneExpensesItem.querySelectorAll('input').forEach( function(item) {
                item.value = '';
            } );
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlus2);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                buttonPlus2.style.display = 'none';
            }
        },

        addIncomeBlock: function() {
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.querySelectorAll('input').forEach( function(item) {
                item.value = '';
            } );
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlus1);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3) {
                buttonPlus1.style.display = 'none';
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
                    appData.income[itemIncome] = +cashIncome;
                }
            }) ;
        },

        getAddExpenses: function() {
            let addExpenses = additionalExpensesItem.value;
            addExpenses = addExpenses.split(', ');
            addExpenses.forEach( function(item) {
                item = item.trim();
                item = correctionWord(item);
                if (item !== '') {

                    appData.addExpenses.push(item);
                }
            });
        },

        getAddIncome: function() {
            additionalIncomeItem.forEach( function(item) {
                let itemValue = item.value.trim();
                itemValue = correctionWord(itemValue);  
                if (item.value !== '') {  
                    appData.addIncome.push(itemValue);
                }
            } );
        },

        // getInfoDeposit: function () {
        //     if (appData.deposit) {
        //         do {
        //             appData.percentDeposit = +prompt('Какой годовой процент?');
        //         } while ( !isNumber(appData.percentDeposit) );
        //         do {
        //             appData.moneyDeposit = +prompt('Какая сумма заложена?');
        //         } while( !isNumber(appData.moneyDeposit) );
        //     }  
        // },
        getIncomeMonth: function() {
                for (let key in appData.income) {
                    appData.incomeMonth += appData.income[key];
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
            if (appData.budgetMonth < 1) {
                return ('С таким месячным бюджетом цели не достичь!');
            } else {
                return Math.ceil(targetAmount.value / appData.budgetMonth);
            }
        },

        // getStatusIncome: function() {
        //     if (appData.budgetDay  >= 1200) {
        //         console.log('У вас высокий уровень дохода');
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

        calcSavedMoney: function () {
            return appData.budgetMonth * periodSelect.value;
        }
    };
appData.blockButton();
appData.checkingInputName();
appData.checkingInputAmount();
salaryAmount.addEventListener('input', function() {
    if (salaryAmount.value !== '' && salaryAmount.value.length > 0) {
        start.disabled = !check;
    }
    salaryAmount.addEventListener('input', function () {
        if (salaryAmount.value == '' && salaryAmount.value.length < 1) {
            start.disabled = true;
        } else {
            start.disabled = false; 
        }
    } );
   
} );
start.addEventListener('click', appData.start);
buttonPlus2.addEventListener('click', appData.addExpensesBlock);
buttonPlus1.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriodSelect);
