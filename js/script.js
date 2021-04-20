'use strict';
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items '),
    namePlaceholder = document.querySelectorAll('[placeholder="Наименование"]'),
    amountPlaceholder = document.querySelectorAll('[placeholder="Сумма"]');

const start = document.getElementById("start"),
    cancel = document.getElementById("cancel"),
    buttonPlus1 = document.getElementsByTagName("button")[0],
    buttonPlus2 = document.getElementsByTagName("button")[1],
    depositCheck = document.querySelector('#deposit-check'),
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
    };

const AppData = function() {
    this.incomeMonth = 0;
    this.addIncome = [];
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.income = {};
    this.moneyDeposit = 0;
    this.budget = 0;
    this.expenses = {};
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.exspensesMonth = 0;
};
AppData.prototype.eventsListeners = function() {
    this.blockButton();
    this.checkingInputName();
    this.checkingInputAmount();
    salaryAmount.addEventListener('input', function() {
        if (salaryAmount.value !== '' && salaryAmount.value.length > 0) {
            start.disabled = false;
        } else if (salaryAmount.value === '' && salaryAmount.value.length === 0) {
            start.disabled = true;
        }
    });

    const hardBind  = this.start.bind(this),
        bindBtnPlus1 = this.addIncomeBlock.bind(this),
        bindBtnPlus2 = this.addExpensesBlock.bind(this);
    start.addEventListener('click', hardBind);
    buttonPlus2.addEventListener('click', bindBtnPlus2);
    buttonPlus1.addEventListener('click', bindBtnPlus1);
    periodSelect.addEventListener('input', this.getPeriodSelect);
};

AppData.prototype.checkingInputName = function() {
    namePlaceholder.forEach( function(item) {
        item.addEventListener('input', function() {
            item.value = item.value.replace(/[^а-яА-ЯёЁ .,!?:;'"]/,'');
        });
    });
};

AppData.prototype.checkingInputAmount = function() {
    amountPlaceholder.forEach(function(item) {
        item.addEventListener('input', function() {
            item.value = item.value.replace(/[^0-9]/,'');
        });
    });
};

AppData.prototype.blockButton = function() {
    start.disabled = true;
};

AppData.prototype.start = function() {
    start.style.display = 'none';   
    const inputs = document.querySelectorAll('input[type="text"]'),
        bind = this.reset.bind(this);
    inputs.forEach(function(item) {     
        item.disabled = true;
    });
    buttonPlus1.disabled = true;
    buttonPlus2.disabled = true;
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
};

AppData.prototype.reset = function() {
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
    depositCheck.checked = false;

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
    });
    buttonPlus1.disabled = false;
    buttonPlus2.disabled = false;
    start.style.display = 'block';
    this.blockButton();
};
    
AppData.prototype.getIncomePeriodValue = function() {
    incomePeriodValue.value = this.calcSavedMoney();
};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    exspensesMonthValue.value = this.exspensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();

    periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.calcSavedMoney();
    });
};
    
AppData.prototype.getPeriodSelect = function() {
    titlePeriodAmount.textContent = periodSelect.value;
};

AppData.prototype.addExpensesBlock = function() {
    expensesItems = document.querySelectorAll('.expenses-items');
    let cloneExpensesItem = expensesItems[0].cloneNode(true);  
    cloneExpensesItem.querySelectorAll('input').forEach(function(item) {
        item.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlus2);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        buttonPlus2.style.display = 'none';
    }
    namePlaceholder = document.querySelectorAll('[placeholder="Наименование"]');
    amountPlaceholder = document.querySelectorAll('[placeholder="Сумма"]');
    this.checkingInputName();
    this.checkingInputAmount();
};

AppData.prototype.addIncomeBlock = function() {
    incomeItems = document.querySelectorAll('.income-items ');
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(function(item) {
        item.value = '';
    });
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlus1);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
        buttonPlus1.style.display = 'none';
    }
    namePlaceholder = document.querySelectorAll('[placeholder="Наименование"]');
    amountPlaceholder = document.querySelectorAll('[placeholder="Сумма"]');
    this.checkingInputName();
    this.checkingInputAmount();
   };

AppData.prototype.getExpenses = function() {
    expensesItems.forEach(item => {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = +item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        } 
    });
};
AppData.prototype.getIncome = function() {
    incomeItems.forEach(item => {
        let itemIncome = item.querySelector('.income-title').value,
            cashIncome = +item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = +cashIncome;
        }
    }) ;
};

AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value;
    addExpenses = addExpenses.split(', ');
    addExpenses.forEach(item => {
        item = item.trim();
        item = correctionWord(item);
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach(item => {
        let itemValue = item.value.trim();
        itemValue = correctionWord(itemValue);  
        if (item.value !== '') {  
            this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getIncomeMonth = function() {
    for (let key in this.income) {
        this.incomeMonth += this.income[key];
    }
};

AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.exspensesMonth += this.expenses[key];
    }
};

AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.exspensesMonth; 
    this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getTargetMonth = function () {
    if (this.budgetMonth < 1) {
        return ('С таким месячным бюджетом цели не достичь!');
    } else {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
};

AppData.prototype.calcSavedMoney = function () {
    return this.budgetMonth * periodSelect.value;
};

const appData = new AppData();
appData.eventsListeners();
console.log(appData);
