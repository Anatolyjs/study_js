import calc from "./calc";

const regCheking = () => { 
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
}

export default regCheking;