import mustache from 'https://unpkg.com/mustache@latest/mustache.mjs';

var template = "{{#pixels}}\n<virtual-rgb-led color=\"{{color}}\"></virtual-rgb-led>\n{{/pixels}}\n";

class VirtualRgbLed extends HTMLElement {
    constructor() {
        super();
        const color = this.getAttribute('color');
        this.style=`color:${color}`;
        this.innerHTML = `<div></div>`;
    }
}

customElements.define('virtual-rgb-led', VirtualRgbLed);

class VirtualLightstrip extends HTMLElement {
    //https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements

    // set leds(leds) {
    //     console.log('leds', leds)
    //     this.__templateArgs.leds = leds;
    //     this.innerHTML = mustache.render(template, this.__templateArgs);
    // }
    //
    // get leds() {
    //     return this.__templateArgs.leds
    // }

    constructor() {
        super();
        this.__templateArgs = {};
        this.pixels = [];
    }

    begin() {

    }

    updateLength(numPixels) {
        this.pixels = [];
        for (var i = 0; i < numPixels; i++) {
            this.pixels.push({color: 'rgb(0,0,0)'});
        }
    }

    updateType() {

    }

    show() {
        this.__templateArgs.pixels = this.pixels;
        this.innerHTML = mustache.render(template, this.__templateArgs);
    }

    delay_ns() {

    }

    setPin() {

    }

    setPixelColor(nLed, red_or_color, green = undefined, blue = undefined, white = undefined) {
        if (green === undefined) { //all colors are in param 2
            if (this.type === 'RGBW')
                white = (red_or_color >> 24) & 0xff;
            green = (red_or_color >> 8) & 0xff;
            blue = red_or_color & 0xff;
            red_or_color = (red_or_color >> 16) & 0xff;
        }

        if (this.brightness) {
            red_or_color = (red_or_color * this.brightness) >> 8;
            green = (green * this.brightness) >> 8;
            blue = (blue * this.brightness) >> 8;
            if (this.type === 'RGBW')
                white = (white * this.brightness) >> 8;
        }

        if (this.type === 'RGB') {
            this.pixels[nLed].color = (red_or_color << 16) + (green << 8) + blue;
        } else {
            this.pixels[nLed].color = '#' + ('000000' + ((white << 24) + (red_or_color << 16) + (green << 8) + blue).toString(16)).slice(-6);
        }
    }

    fill() {

    }

    ColorHSV() {

    }

    getPixelColor() {

    }

    setBrightness() {

    }

    getBrightness() {

    }

    clear() {

    }

    gamma32() {

    }
}

const VirtualLightstripTag = 'virtual-lightstrip';

function Color(red, green, blue, white = undefined) {
    if (white !== undefined)
        return (white << 24) + (red << 16) + (green << 8) + blue
    else
        return (red << 16) + (green << 8) + blue
}

customElements.define(VirtualLightstripTag, VirtualLightstrip);

export default VirtualLightstrip;
export { Color, VirtualLightstripTag };