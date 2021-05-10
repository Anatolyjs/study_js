'use strict';
const form1 = document.getElementById('form1'),
    form2 = document.getElementById('form2'),
    form3 = document.getElementById('form3');  

import countTimer from './modules/countTimer';
import calc from './modules/calc';
import regCheking from './modules/regCheking';
import scrollsMenu from './modules/scrollsMenu';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import togglePopup from './modules/togglePopup';
import togleMenu from './modules/togleMenu';


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
