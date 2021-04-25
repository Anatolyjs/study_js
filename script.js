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
        },

        //popup
        togglePopup = () => {
            const popup = document.querySelector('.popup'),
                popupBtn = document.querySelectorAll('.popup-btn'),
                popupClose = document.querySelector('.popup-close'),
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

            popupClose.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        },

        // Прокруты
        scrollsMenu = () => {   
            // let scrollAnimationId,
            //     scrollCounter = 0;
            // const menuBtn1 = document.querySelector('menu>ul>li>[href="#service-block"]'),
            //     menuBtn2 = document.querySelector('menu>ul>li>[href="#portfolio"]'),
            //     menuBtn3 = document.querySelector('menu>ul>li>[href="#calc"]'),
            //     menuBtn4 = document.querySelector('menu>ul>li>[href="#command"]'),
            //     menuBtn5 = document.querySelector('menu>ul>li>[href="#connect"]'),
        
            //    scroll = (btn, pos) => {
            //         const scrollAnimation = () => {
            //             scrollCounter += 20;
            //             scrollAnimationId = requestAnimationFrame(scrollAnimation);
            //             if (scrollCounter <= pos) {
            //                 document.documentElement.scrollTop = scrollCounter;
            //             } else {
            //                 cancelAnimationFrame(scrollAnimationId);
            //             }
            //         };
            //         btn.addEventListener('click', () => {
            //             scrollAnimationId = requestAnimationFrame(scrollAnimation);
            //             scrollCounter = 0;
            //         });
            
            //    }; 
            // scroll(menuBtn1, 879);
            // scroll(menuBtn2, 1993);
            // scroll(menuBtn3, 2750);
            // scroll(menuBtn4, 3766);
            // scroll(menuBtn5, 4931);
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
        };

    countTimer('25 april 2021');
    togleMenu();
    togglePopup();
    scrollsMenu();





});
