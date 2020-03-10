import './style.scss';

class VirtualRgbLed extends HTMLElement {
    constructor() {
        super();
        const color = this.getAttribute('color')
        this.style=`color:${color}`
        this.innerHTML = `<div></div>`;
    }
}

customElements.define('virtual-rgb-led', VirtualRgbLed);
export default VirtualRgbLed;

