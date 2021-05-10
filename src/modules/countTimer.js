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

}

export default countTimer;