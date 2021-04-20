'use strict';

function DomElement (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}
DomElement.prototype.createElement = function() {
    if (this.selector[0] === '.') {
        const div = document.createElement('div');
        div.className = this.selector.slice(1);
        div.innerHTML = 'Hello World!';
        div.style.cssText =` height: ${this.height};
        background: ${this.bg};
        width: ${this.width};
        font-size: ${this.fontSize}`;
        document.body.append(div);
    } else if (this.selector[0] === '#') {
        const p = document.createElement('p');
        p.id = this.selector.slice(1);
        p.innerHTML = 'Hi world!';
        p.style.cssText =` height: ${this.height};
        background: ${this.bg};
        width: ${this.width};
        font-size: ${this.fontSize}`;
        document.body.append(p);
    }
};
const obj = new DomElement('.bing', '100px', '100px', 'green', 'large');
const obj1 = new DomElement('#go', '200px', '200px', 'blue', 'x-large');
obj.createElement();
obj1.createElement();