window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3');  

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
            img = document.querySelector('main>a');

        const scrollingIntoView = (elem) => {
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
    },

    //Слайдер
    slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval,
            dot;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        },

        createDot = () => {
            for (let i = 0; i < slide.length; i++) {
                const li = document.createElement('li');
                li.classList.add('dot');
                portfolioDots.append(li);
            }

            dot = portfolioDots.querySelectorAll('.dot');
        },

        nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        },

        autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        },

        startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
        },

        stopSlide = () => { 
            clearInterval(interval);
        };
        createDot();

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });
        
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1000);
    },

    //Регулярки
    regCheking = () => { 
        const commandImg = document.querySelectorAll('.command .container .row .col-md-4 img'),
            inputs = document.querySelectorAll('input');
        
        const checkInputsBlur = (target) => {
            if (target.matches('.calc-block input')) {
                target.value = target.value.replace(/\D/g, '');
            } else if (target.matches('[placeholder="Ваше имя"]')) {
                target.value = target.value.replace(/[^а-я ]/gi, '');
            }else if (target.matches('[placeholder="Ваше сообщение"]')) {
                target.value = target.value.replace(/[^а-я\d - .,!?'";: ]/gi, '');
            } else if (target.matches('[placeholder="E-mail"]') || target.matches('[placeholder="Ваш E-mail"]')) {
                target.value = target.value.replace(/[^a-z-@_.!~*']/gi, '');
            } else if (target.matches('[placeholder="Номер телефона"]') || target.matches('[placeholder="Ваш номер телефона"]')) {
                target.value = target.value.replace(/[^\d\+]/gi, '');
            }
        };

        commandImg.forEach((item) => {
            item.addEventListener('mouseenter', (event) => {
                event.target.src = event.target.dataset.img;
            });

            item.addEventListener('mouseleave', (event) => {
                event.target.src = event.target.src.replace(/a(?=.jpg)/, '');
            });
        });

        inputs.forEach((item) => {
            item.addEventListener('input', (event) => {
                const target = event.target;
                checkInputsBlur(target);
            });

            item.addEventListener('blur', (event) => {
                const target = event.target;

                checkInputsBlur(target);

                target.value = target.value.trim();
                target.value = target.value.replace(/^-+/g, '');
                target.value = target.value.replace(/-+$/g, '');
                target.value = target.value.replace(/-+/g, '-');
                target.value = target.value.replace(/ +/g, ' ');

                if (target.matches('[placeholder="Ваше имя"]')) {
                    target.value = target.value.replace(/( |^)[а-яa-z]+/gi, (val1) => val1.toLowerCase());
                    target.value = target.value.replace(/( |^)[а-яa-z]/gi, (val2) =>  val2.toUpperCase());
                   
                }
            });
        });
    },

    //Калькулятор
    calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total'),
            calcBlockInputs = document.querySelectorAll('.calc-block input');
        
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            } else {
                total = 0;
            }
            
            totalValue.textContent = Math.ceil(total);
        };
        
        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });

        calcBlockInputs.forEach((item) => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/^[\D]/g, '');
            });
        });
    },

    //send-ajax-form
    sendForm = (form) => {
        const errorMessage = 'Что-то пошло не так!',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся.';

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem';
        statusMessage.style.color = '#fff';

        const postData = (body) => {
            return fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        };
        
        form.addEventListener('submit', (event) => {
            const inputs = form.querySelectorAll('input');
            let count = 0;

            event.preventDefault();
            form.appendChild(statusMessage);
            for (let i = 0; i < form.length - 1; i++) {
                if (inputs[i].value.trim() !== '') {
                    count++;
                }
            }
            if (count === inputs.length) {
                statusMessage.textContent = loadMessage;
                const formData = new FormData(form);
                let body = {};
                for (let val of formData.entries()) {
                    body[val[0]] = val[1];
                }
                inputs.forEach((item) => {
                    item.value = '';
                });
                postData(body)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error('Status network not 200');
                        }
                        statusMessage.textContent = successMessage;
                        setTimeout(() => { 
                            statusMessage.textContent = '';
                            document.querySelector('.popup').style.display = 'none';
                        }, 3000);
                    })
                    .catch((error) => {
                        console.error(error);
                        statusMessage.textContent = errorMessage; 
                        setTimeout(() => { 
                            statusMessage.textContent = '';
                            document.querySelector('.popup').style.display = 'none';
                        }, 3000);
                    });
            }
        });
    };

    countTimer('25 may 2021');
    togleMenu();
    togglePopup();
    scrollsMenu();
    tabs();
    slider();
    regCheking();
    calc(100);
    sendForm(form1);
    sendForm(form2);
    sendForm(form3);
    
 
});