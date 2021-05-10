const togglePopup = () => {
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
}

export default togglePopup;