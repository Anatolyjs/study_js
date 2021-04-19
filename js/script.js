'use strict';
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items '),
    namePlaceholder = document.querySelectorAll('[placeholder="Наименование"]'),
    amountPlaceholder = document.querySelectorAll('[placeholder="Сумма"]');

const start = document.getElementById("start"),
    cancel = document.getElementById("cancel"),
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
            start.disabled = true;
        },

        start: function() {
            start.style.display = 'none';
            
            const inputs = document.querySelectorAll('input[type="text"]'),
                bind = this.reset.bind(this);
            inputs.forEach( function(item) {
                
                item.disabled = true;
            } );
            console.log('this: ', this);
            this.budget = +salaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getIncomeMonth();
            this.getAddExpenses(); 
            this.getAddIncome();
            this.getBudget();
            this.showResult();
            cancel.addEventListener('click', bind);
            cancel.style.display = 'block';
        },

        reset: function() {
                this.incomeMonth = 0;
                this.budget = 0;
                this.budgetDay = 0;
                this.budgetMonth = 0;
                this.exspensesMonth = 0;
                this.income = {};
                this.addIncome = [];
                this.expenses = {};
                this.addExpenses = [];
                this.deposit = false;
    
            cancel.style.display = 'none';
            let expensesItem = document.querySelectorAll('.expenses-items'),
                incomeItem = document.querySelectorAll('.income-items '),
                inputs = document.querySelectorAll('input[type="text"]');

            while( expensesItem.length > 1) {
                let elem = document.querySelector('.expenses-items');
                elem.remove();
                expensesItem = document.querySelectorAll('.expenses-items');
            }
            while( incomeItem.length > 1) {
                let elem = document.querySelector('.income-items');
                elem.remove();
                incomeItem = document.querySelectorAll('.income-items');
            }

            buttonPlus1.style.display = 'block';
            buttonPlus2.style.display = 'block';
            periodSelect.value = 1;
            titlePeriodAmount.textContent = '1';
           
            inputs.forEach( function(item) {
                item.disabled = false;
                item.value = '';
            } );
            start.style.display = 'block';
            this.blockButton();
        },
        
        getIncomePeriodValue: function() {
            incomePeriodValue.value = this.calcSavedMoney();
        },

        showResult: function() {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = Math.floor(this.budgetDay);
            exspensesMonthValue.value = this.exspensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcSavedMoney();
            periodSelect.addEventListener('change', function() {
                incomePeriodValue.value = appData.calcSavedMoney();
            } );
        },
        
        getPeriodSelect: function() {
            titlePeriodAmount.textContent = periodSelect.value;
        },

        addExpensesBlock: function() {
            expensesItems = document.querySelectorAll('.expenses-items');
            let cloneExpensesItem = expensesItems[0].cloneNode(true);  
            cloneExpensesItem.querySelectorAll('input').forEach( function(item) {
                item.value = '';
            } );
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlus2);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                buttonPlus2.style.display = 'none';
            }
            namePlaceholder = document.querySelectorAll('[placeholder="Наименование"]');
            amountPlaceholder = document.querySelectorAll('[placeholder="Сумма"]');
            appData.checkingInputName();
            appData.checkingInputAmount();
        },

        addIncomeBlock: function() {
            incomeItems = document.querySelectorAll('.income-items ');
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.querySelectorAll('input').forEach( function(item) {
                item.value = '';
            } );
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlus1);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3) {
                buttonPlus1.style.display = 'none';
            }
            namePlaceholder = document.querySelectorAll('[placeholder="Наименование"]');
            amountPlaceholder = document.querySelectorAll('[placeholder="Сумма"]');
            appData.checkingInputName();
            appData.checkingInputAmount();
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

        getIncomeMonth: function() {
                for (let key in appData.income) {
                    this.incomeMonth += this.income[key];
                }
        },

        getExpensesMonth: function() {
            for (let key in this.expenses) {
                this.exspensesMonth += this.expenses[key];
            }
            },

        getBudget: function () {
            this.budgetMonth = this.budget + this.incomeMonth - this.exspensesMonth; 
            this.budgetDay = this.budgetMonth / 30;
            },

        getTargetMonth: function () {
            if (this.budgetMonth < 1) {
                return ('С таким месячным бюджетом цели не достичь!');
            } else {
                return Math.ceil(targetAmount.value / this.budgetMonth);
            }
        },

        calcSavedMoney: function () {
            return this.budgetMonth * periodSelect.value;
        }
    };
appData.blockButton();
appData.checkingInputName();
appData.checkingInputAmount();
salaryAmount.addEventListener('input', function() {
    if (salaryAmount.value !== '' && salaryAmount.value.length > 0) {
        start.disabled = false;
    } else if (salaryAmount.value === '' && salaryAmount.value.length === 0) {
        start.disabled = true;
    }
} );

const hardBind  = appData.start.bind(appData);
start.addEventListener('click', hardBind);
buttonPlus2.addEventListener('click', appData.addExpensesBlock);
buttonPlus1.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriodSelect);
