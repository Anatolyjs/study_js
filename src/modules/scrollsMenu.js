const scrollsMenu = () => {   
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
}

export default scrollsMenu;