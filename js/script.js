let money = 2000, 
income = 'freelance', 
addExpenses = 'Internet, taxi, communal flat',
deposit = true, 
mission = 20000, 
period = 12, 
budgetDay = money/30;
console.log( typeof(money), typeof(income), typeof(deposit) );
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);