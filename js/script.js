'use strict';

const books = document.querySelector('.books'),
    book = document.querySelectorAll('.book'),
    advertising = document.querySelector('.adv'),
    chapterSecondBook = book[0].querySelectorAll('li'),
    chapterFifthBook = book[5].querySelectorAll('li'),
    chapterSixsBook = book[2].querySelectorAll('li'),
    newChapter = document.createElement('li'),
    book4Style = book[4].querySelector('h2 a ').textContent = '3. this и Прототипы Объектов';
books.prepend( book[1] );
books.append( book[2] );
book[0].after( book[4] );
document.body.style.backgroundImage = 'url(./image/open_book.jpg)';
advertising.remove();
console.log(book);
// вторая книга
chapterSecondBook[3].after( chapterSecondBook[6] );
chapterSecondBook[6].after( chapterSecondBook[8] );
chapterSecondBook[9].after( chapterSecondBook[2] );
// пятая книга
chapterFifthBook[1].after( chapterFifthBook[9] );
chapterFifthBook[4].after( chapterFifthBook[2] );
chapterFifthBook[7].after( chapterFifthBook[5] );
// шестая книга
newChapter.textContent = 'Глава 8: За пределами ES6';
chapterSixsBook[8].insertAdjacentElement('afterend', newChapter);
console.log(chapterSixsBook[8]);


