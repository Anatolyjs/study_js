window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // таймер
     const countTimer = (deadline) => {
        let timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');

        const getTimeRemaning = () => {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                    
            return {hours, timeRemaining, minutes, seconds, dateNow, dateStop};
        },
            addZero = (temp) => {
                temp = String(temp);
                if (temp.length === 1) {
                    temp = '0' + temp;
                }
                return temp;
            },
        
            updateClock = () => {
                let timer = getTimeRemaning();
                if (timer.dateStop < timer.dateNow) {
                    timerHours.textContent = '00';
                    timerMinutes.textContent = '00';
                    timerSeconds.textContent = '00';
                } else {
                    timerHours.textContent = addZero(timer.hours);
                    timerMinutes.textContent = addZero(timer.minutes);
                    timerSeconds.textContent = addZero(timer.seconds);
        
                    return timer.timeRemaining;
                }   
            };
        if (updateClock() > 0) {
            setInterval(updateClock, 1000);
        }



    };

    countTimer('25 april 2021');

    // меню
    const togleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li'),

            handlerMenu = () => {
                menu.classList.toggle('active-menu');
            };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click',  handlerMenu);
        menuItems.forEach((item) =>  item.addEventListener('click', handlerMenu));
    };

    togleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');
            popup.style.position = 'relative';
        
        popupBtn.forEach((item) => {
            item.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            popup.style.position = 'relative';
            popup.style.top = '4px';
        });
    };

    togglePopup();







});
