'use strict';
let expensesItems = document.querySelectorAll(`.expenses-items`),
    incomeItems = document.querySelectorAll(`.income-items `),
    namePlaceholder = document.querySelectorAll(`[placeholder="Наименование"]`),
    amountPlaceholder = document.querySelectorAll(`[placeholder="Сумма"]`);

const start = document.getElementById(`start`),
    cancel = document.getElementById(`cancel`),
    buttonPlus1 = document.getElementsByTagName(`button`)[0],
    buttonPlus2 = document.getElementsByTagName(`button`)[1],
    depositCheck = document.querySelector(`#deposit-check`),
    additionalIncomeItem = document.querySelectorAll(`.additional_income-item`),
    budgetMonthValue = document.getElementsByClassName(`budget_month-value`)[0],
    budgetDayValue = document.getElementsByClassName(`budget_day-value`)[0],
    exspensesMonthValue = document.getElementsByClassName(`expenses_month-value`)[0],
    additionalIncomeValue = document.getElementsByClassName(`additional_income-value`)[0],
    additionalExpensesValue = document.getElementsByClassName(`additional_expenses-value`)[0],
    incomePeriodValue = document.getElementsByClassName(`income_period-value`)[0],
    targetMonthValue = document.getElementsByClassName(`target_month-value`)[0],

    salaryAmount = document.querySelector(`.salary-amount`),
    expensesTitle = document.querySelector(`.expenses-items .expenses-title`),
    additionalExpensesItem = document.querySelector(`.additional_expenses-item`),
    targetAmount = document.querySelector(`.target-amount`),
    periodSelect = document.querySelector(`.period-select`),
    titlePeriodAmount = document.querySelector(`.period-amount`),
    depositBank = document.querySelector(`.deposit-bank`),
    depositAmount = document.querySelector(`.deposit-amount`),
    depositPercent = document.querySelector(`.deposit-percent`),
    
    correctionWord = (word) => { 
        if (word !== ``) {
            word = word.toLowerCase().split(``);
            let temp = word[0].toUpperCase();
            word = word.join(``);
            word = temp + word.slice(1);
            return word;
        } else {
            return (``);
        }
    };

class AppData {
    constructor() {
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
    }

    getInfoDeposit() {
        if (this.deposit) {
                this.percentDeposit = +depositPercent.value;
                this.moneyDeposit = +depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === `other`) {
            depositPercent.addEventListener(`change`, () => {
                if (depositPercent.value !== '' && +depositPercent.value > 0 && +depositPercent.value <= 100 ) {
                    start.disabled = false;
                } else  {
                    alert(`Введите корректное значение в поле проценты`);
                    console.log('опять');
                    depositPercent.value = ``;
                    start.disabled = true;
                }
            });
            depositPercent.value = ``;
            depositPercent.style.display = `inline-block`;
        } else {
            if (salaryAmount.value !== '' && salaryAmount.value.length > 0) {
                start.disabled = false;
            }
            depositPercent.style.display = `none`;
            depositPercent.value = valueSelect;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = `inline-block`;
            depositAmount.style.display = `inline-block`;
            this.deposit = true;
            depositBank.addEventListener(`change`, this.changePercent);
        } else {
            if (salaryAmount.value !== '' && salaryAmount.value.length > 0) {
                start.disabled = false;
            }
            depositPercent.style.display =`none`;
            depositBank.style.display = `none`;
            depositAmount.style.display = `none`;
            depositPercent.style.display =``;
            depositBank.value = ``;
            depositAmount.value = ``;
            this.deposit = false;
            depositBank.removeEventListener(`change`, this.changePercent);
        }
    }

    eventsListeners() {
        this.blockButton();
        this.checkingInputName();
        this.checkingInputAmount();
        salaryAmount.addEventListener(`input`, () => {
            if (salaryAmount.value !== '' && salaryAmount.value.length > 0) {
                start.disabled = false;
            } else if (salaryAmount.value === '' && salaryAmount.value.length === 0) {
                start.disabled = true;
            }
        });
    
        start.addEventListener(`click`, this.start.bind(this));
        buttonPlus2.addEventListener(`click`, this.addIncomeBlock.bind(this));
        buttonPlus1.addEventListener(`click`, this.addExpensesBlock.bind(this));
        periodSelect.addEventListener(`input`, this.getPeriodSelect);
        depositCheck.addEventListener(`change`, this.depositHandler.bind(this));    
    }

    checkingInputName() {
        namePlaceholder.forEach((item) => {
            item.addEventListener(`input`, function() {
                item.value = item.value.replace(/[^а-яА-ЯёЁ .,!?:;'"]/,``);
            });
        });
    }

    checkingInputAmount() {
        amountPlaceholder.forEach((item) => {
            item.addEventListener(`input`, function() {
                item.value = item.value.replace(/[^0-9]/,``);
            });
        });
    }

    blockButton() {
        start.disabled = true;
    }

    start() {
        start.style.display = `none`;   
        const inputs = document.querySelectorAll(`input[type="text"]`);
        inputs.forEach((item) => {     
            item.disabled = true;
        });
        buttonPlus1.disabled = true;
        buttonPlus2.disabled = true;
        depositCheck.disabled = true;
        depositBank.disabled = true;
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses(); 
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
        cancel.addEventListener(`click`, this.reset.bind(this));
        cancel.style.display = `block`;
    }

    reset() {
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
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
        depositBank.value = ``;

        depositPercent.style.display =`none`;
        depositBank.style.display = `none`;
        depositAmount.style.display = `none`;
        cancel.style.display = `none`;
        let expensesItem = document.querySelectorAll(`.expenses-items`),
            incomeItem = document.querySelectorAll(`.income-items `),
            inputs = document.querySelectorAll(`input[type="text"]`);
    
        while( expensesItem.length > 1) {
            let elem = document.querySelector(`.expenses-items`);
            elem.remove();
            expensesItem = document.querySelectorAll(`.expenses-items`);
        }
        while( incomeItem.length > 1) {
            let elem = document.querySelector(`.income-items`);
            elem.remove();
            incomeItem = document.querySelectorAll(`.income-items`);
        }
    
        buttonPlus1.style.display = `block`;
        buttonPlus2.style.display = 'block';
        periodSelect.value = 1;
        titlePeriodAmount.textContent = `1`;
           
        inputs.forEach((item) => {
            item.disabled = false;
            item.value = ``;
        });
        buttonPlus1.disabled = false;
        buttonPlus2.disabled = false;
        depositCheck.disabled = false;
        depositBank.disabled = false;
        start.style.display = `block`;
        this.blockButton();
    }

    getIncomePeriodValue() {
        incomePeriodValue.value = this.calcSavedMoney();
    }
    
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        exspensesMonthValue.value = this.exspensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    
        periodSelect.addEventListener(`input`, () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });
    }

    getPeriodSelect() {
        titlePeriodAmount.textContent = periodSelect.value;
    }

    addExpensesBlock() {
        expensesItems = document.querySelectorAll(`.expenses-items`);
        let cloneExpensesItem = expensesItems[0].cloneNode(true);  
        cloneExpensesItem.querySelectorAll(`input`).forEach((item) => {
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlus2);
        expensesItems = document.querySelectorAll(`.expenses-items`);
        if (expensesItems.length === 3) {
            buttonPlus2.style.display = `none`;
        }
        namePlaceholder = document.querySelectorAll(`[placeholder="Наименование"]`);
        amountPlaceholder = document.querySelectorAll(`[placeholder="Сумма"]`);
        this.checkingInputName();
        this.checkingInputAmount();
    }

    addIncomeBlock() {
        incomeItems = document.querySelectorAll(`.income-items `);
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll(`input`).forEach((item) => {
            item.value = ``;
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlus1);
        incomeItems = document.querySelectorAll(`.income-items`);
        if(incomeItems.length === 3) {
            buttonPlus1.style.display = `none`;
        }
        namePlaceholder = document.querySelectorAll(`[placeholder="Наименование"]`);
        amountPlaceholder = document.querySelectorAll(`[placeholder="Сумма"]`);
        this.checkingInputName();
        this.checkingInputAmount();
    }

    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector(`.expenses-title`).value,
                cashExpenses = +item.querySelector(`.expenses-amount`).value;
            if (itemExpenses !== `` && cashExpenses !== ``) {
                this.expenses[itemExpenses] = cashExpenses;
            } 
        });
    }
    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector(`.income-title`).value,
                cashIncome = +item.querySelector(`.income-amount`).value;
            if (itemIncome !== `` && cashIncome !== ``) {
                this.income[itemIncome] = +cashIncome;
            }
        });
    }

    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value;
        addExpenses = addExpenses.split(`, `);
        addExpenses.forEach((item) => {
            item = item.trim();
            item = correctionWord(item);
            if (item !== ``) {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            itemValue = correctionWord(itemValue);  
            if (item.value !== ``) {  
                this.addIncome.push(itemValue);
            }
        });
    }

    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.exspensesMonth += this.expenses[key];
        }
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth + monthDeposit - this.exspensesMonth; 
        this.budgetDay = this.budgetMonth / 30;
    }

    getTargetMonth() {
        if (this.budgetMonth < 1) {
            return (`С таким месячным бюджетом цели не достичь!`);
        } else {
            return Math.ceil(targetAmount.value / this.budgetMonth);
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
}

const appData = new AppData();
appData.eventsListeners();
