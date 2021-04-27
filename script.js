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
    },

        // меню
    togleMenu = () => {
        const menu = document.querySelector('menu');
            
        document.addEventListener('click', (event) => {
            let target = event.target;
            if (target.closest('menu>a[href*="#"') || target.closest('menu>ul>li>a[href*="#"') || target.closest('div>.menu')) {
                menu.classList.toggle('active-menu');
            } else if (!target.closest('menu')){
                menu.classList.remove('active-menu');
                }
        });
    },

    //popup
    togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            width = document.documentElement.clientWidth;
            popup.style.opacity = 0;
        let animationInterval,
            count = 0;

        const animationPopup = () => {
            count += 0.02;
            popup.style.display = 'block';
            animationInterval = requestAnimationFrame(animationPopup);
            if ( count <= 1) {
                popup.style.opacity = count;
            } else {
                cancelAnimationFrame(animationInterval);
            }
        };
        
        popupBtn.forEach((item) => {
            item.addEventListener('click', () => {
                if (width > 768) {
                    animationInterval = requestAnimationFrame(animationPopup);
                    count = 0;
                } else {
                    popup.style.display = 'block';
                    popup.style.opacity = 1;
                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popup.style.display = 'none';
                }
            }   
        });
    },

    // Прокруты
    scrollsMenu = () => {   
        const btns = document.querySelector('menu>ul').querySelectorAll('a[href*="#"'),
            img = document.querySelector('main>a'),

            scrollingIntoView = (elem) => {
                elem.addEventListener('click', (event) => {
                    event.preventDefault();
                    const blockId = elem.getAttribute('href');
                    document.querySelector('' + blockId).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            };

        btns.forEach((item) => {
            scrollingIntoView(item);
        });
        scrollingIntoView(img);  
    },

    //Табы
    tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab'),

            toggleTabContent = (index) => {

                for (let i = 0; i < tabContent.length; i++) {
                    if (index === i) {
                        tab[i].classList.add('active');
                        tabContent[i].classList.remove('d-none');
                    } else {
                        tab[i].classList.remove('active');
                        tabContent[i].classList.add('d-none');
                    }
                }

            };
        
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;

            target = target.closest('.service-header-tab');
            if (target) {  
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }   
        });
        
    };

    countTimer('25 april 2021');
    togleMenu();
    togglePopup();
    scrollsMenu();
    tabs();





});
