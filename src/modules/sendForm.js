const sendForm = (form) => {
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
}

export default sendForm;