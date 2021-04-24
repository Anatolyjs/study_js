'use strict';
const showAll = function() {
    const greeting = document.querySelector('.greeting'),
        todayDate = document.querySelector('.today-date'),
        timeNow = document.querySelector('.time-now'),
        toNewYear = document.querySelector('.to-new-year'),
        week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],

        getDate = function() {
            let dateNow = new Date(),
                dateNewYear = new Date('31 december 2021').getTime(),
                newYearDays = Math.ceil((dateNewYear - dateNow.getTime()) / 1000 / 60 / 60 / 24),
                dayWeek = dateNow.getDay(),
                time = dateNow.toLocaleTimeString();
            return {time, dayWeek, dateNewYear, newYearDays};
        },

        checkingTimeDay = function(hours) {
            hours = +hours.slice(0,2);
            if (hours < 4) {
                return 'Доброй ночи!';
            } else if (hours < 11) {
                return 'Доброе утро!';
            } else if (hours < 16) {
                return 'Добрый день!';
            } else if (hours < 22) {
                return 'Добрый вечер!';
            } else {
                return 'Доброй ночи!';
            }
        },

        checkingEndingsDays = function(days) {
            days = String(days);
            let temp = days.length - 1;

            if (days[temp] === '0' || days[temp] === '5' || days[temp] === '6' || days[temp] === '7' || days[temp] === '8' || days[temp] === '9') {
                return 'дней';
            } else if (days[temp] === '2' || days[temp] === '3' || days[temp] === '4') {
                return 'дня';
            } else if (days[temp] === '1') {
                return 'день';
            }
        },
        
        checkingEndings = function(days) {
            days = String(days);
            let temp = days.length - 1;
            if (days[temp] === '1') {
                return 'остался';
            } else {
                return 'осталось';
            }
        },

        setDate = function() {
            const data = getDate();
            greeting.textContent = checkingTimeDay(data.time);
            todayDate.textContent = `Сегодня: ${week[data.dayWeek]}`;
            timeNow.textContent = `Текущее время: ${data.time}`;
            toNewYear.textContent = `До нового года ${checkingEndings(data.newYearDays)} ${data.newYearDays} ${checkingEndingsDays(data.newYearDays)}.`;
          
        };
    
    setDate();
};

showAll();