const togleMenu = () => {
    const menu = document.querySelector('menu');
        
    document.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('menu>a[href*="#"') || target.closest('menu>ul>li>a[href*="#"') || target.closest('div>.menu')) {
            menu.classList.toggle('active-menu');
        } else if (!target.closest('menu')){
            menu.classList.remove('active-menu');
        }
    });
}

export default togleMenu;