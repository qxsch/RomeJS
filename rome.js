/*
I = 1
V = 5
X = 10
L = 50
C = 100
D = 500
M = 1'000
V̅ = 5'000
X̅ = 10'000
L̅ = 50'000
C̅ = 100'000
D̅ = 500'000
M̅ = 1'000'000
*/

class Rome {
    static constants = Object.freeze({ 
        MIN_ROMAN_NUMERAL: 1,
        MAX_ROMAN_NUMERAL: 3999999
    });

    static NUMBER_FORMAT_LOCALE = Intl.NumberFormat().resolvedOptions().locale;

    static getNumberFormat(input) {
        const romanRegex = /^[IVXLCDM\u0305]+$/i;
        const arabicRegex = /^\d+$/;

        if (romanRegex.test(input)) {
            return 'roman';
        }
        else if (arabicRegex.test(input)) {
            return 'arabic';
        }
        else {
            return 'invalid';
        }
    }

    static getMinRomanNumeral(arabicNumber = true) {
        if(arabicNumber) {
            return this.constants.MIN_ROMAN_NUMERAL;
        }
        else {
            return this.toRoman(this.constants.MIN_ROMAN_NUMERAL);
        }
    }
    static getMaxRomanNumeral(arabicNumber = true) {
        if(arabicNumber) {
            return this.constants.MAX_ROMAN_NUMERAL;
        }
        else {
            return this.toRoman(this.constants.MAX_ROMAN_NUMERAL);
        }
    }

    /*
    Convert Roman numeral to Arabic number
        returns NaN if input is not a valid Roman numeral, otherwise the Arabic number as integer
    */
    static fromRoman(roman) {
        if (roman === null || roman === undefined) {
            return NaN;
        }
        roman = String(roman).toUpperCase();
        roman = roman.replace(/[^IVXLCDMV̅L̅X̅C̅D̅M̅]+/g, '');

        //const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
        const validRomanRegex = /^(M̅){0,3}(C̅M̅|C̅D̅|(D̅)?(C̅){0,3})(X̅C̅|X̅L̅|(L̅)?(X̅){0,3})(MX̅|MV̅|(V̅)?M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
        if (!validRomanRegex.test(roman)) {
            return NaN; // Ungültige römische Zahl
        }

        const romanNumerals = [
            { value: 1000000, numeral: 'M̅' },
            { value: 900000, numeral: 'C̅M̅' },
            { value: 500000, numeral: 'D̅' },
            { value: 400000, numeral: 'C̅D̅' },
            { value: 100000, numeral: 'C̅' },
            { value: 90000, numeral: 'X̅C̅' },
            { value: 50000, numeral: 'L̅' },
            { value: 40000, numeral: 'X̅L̅' },
            { value: 10000, numeral: 'X̅' },
            { value: 9000, numeral: 'MX̅' },
            { value: 5000, numeral: 'V̅' },
            { value: 4000, numeral: 'MV̅' },
            { value: 1000, numeral: 'M' },
            { value: 900, numeral: 'CM' },
            { value: 500, numeral: 'D' },
            { value: 400, numeral: 'CD' },
            { value: 100, numeral: 'C' },
            { value: 90, numeral: 'XC' },
            { value: 50, numeral: 'L' },
            { value: 40, numeral: 'XL' },
            { value: 10, numeral: 'X' },
            { value: 9, numeral: 'IX' },
            { value: 5, numeral: 'V' },
            { value: 4, numeral: 'IV' },
            { value: 1, numeral: 'I' }
        ];

        let total = 0;
        for (const { value, numeral } of romanNumerals) {
            while (roman.startsWith(numeral)) {
                total += value;
                roman = roman.slice(numeral.length);
            }
        }
        if (roman.length > 0) {
            return NaN; // Ungültige römische Zahl
        }
        return total;
    }

    /*
    Convert Arabic number to Roman numeral
        returns null if input is not a valid integer, otherwise the Roman numeral as string
    */
    static toRoman(num) {
        if(num === null || num === undefined) {
            return null;
        }
        if(!Number.isInteger(num)) {
            num = parseInt(num, 10);
            if(isNaN(num)) {
                return null;
            }
        }
        if(num < this.constants.MIN_ROMAN_NUMERAL || num > this.constants.MAX_ROMAN_NUMERAL) {
            return null;
        }
        const romanNumerals = [
            { value: 1000000, numeral: 'M̅' },
            { value: 900000, numeral: 'C̅M̅' },
            { value: 500000, numeral: 'D̅' },
            { value: 400000, numeral: 'C̅D̅' },
            { value: 100000, numeral: 'C̅' },
            { value: 90000, numeral: 'X̅C̅' },
            { value: 50000, numeral: 'L̅' },
            { value: 40000, numeral: 'X̅L̅' },
            { value: 10000, numeral: 'X̅' },
            { value: 9000, numeral: 'MX̅' },
            { value: 5000, numeral: 'V̅' },
            { value: 4000, numeral: 'MV̅' },
            { value: 1000, numeral: 'M' },
            { value: 900, numeral: 'CM' },
            { value: 500, numeral: 'D' },
            { value: 400, numeral: 'CD' },
            { value: 100, numeral: 'C' },
            { value: 90, numeral: 'XC' },
            { value: 50, numeral: 'L' },
            { value: 40, numeral: 'XL' },
            { value: 10, numeral: 'X' },
            { value: 9, numeral: 'IX' },
            { value: 5, numeral: 'V' },
            { value: 4, numeral: 'IV' },
            { value: 1, numeral: 'I' }
        ];
        let result = '';
        for (const { value, numeral } of romanNumerals) {
            while (num >= value) {
                result += numeral;
                num -= value;
            }
        }
        return result;
    }

    static formatAsString(value, NUMBER_FORMAT_LOCALE = null) {
        if(NUMBER_FORMAT_LOCALE === null || NUMBER_FORMAT_LOCALE === undefined || typeof NUMBER_FORMAT_LOCALE !== 'string') {
            NUMBER_FORMAT_LOCALE = this.NUMBER_FORMAT_LOCALE;
        }
        if(value === null || value === undefined) {
            return 'Not a number';
        }
        if(typeof value === 'string') {
            return value;
        }
        if(typeof value === 'number') {
            if(isNaN(value)) {
                return 'Not a number';
            }
            else {
                try {
                    return value.toLocaleString(NUMBER_FORMAT_LOCALE);
                }
                catch {
                    return value.toLocaleString();
                }
                
            }
        }
        return String(value);
    }

    static #renderHtmlElement(htmlNode) {
        // is element?
        if(!(htmlNode instanceof HTMLElement)) {
            return;
        }
        // is span element?
        if(htmlNode.tagName.toLowerCase() !== 'span') {
            return;
        }
        // get the render mode
        let renderType = 'auto';
        if(htmlNode.dataset.renderNumber) {
            renderType = String(htmlNode.dataset.renderNumber).trim().toLowerCase();
            if(renderType !== 'arabic' && renderType !== 'roman') {
                renderType = 'auto';
            }
        }
        // get the value
        let value=null;
        if(htmlNode.dataset.arabicNumber) {
            value = String(htmlNode.dataset.arabicNumber).trim().toLowerCase();
            if(value === 'min') {
                value = this.constants.MIN_ROMAN_NUMERAL;
            }
            else if(value === 'max') {
                value = this.constants.MAX_ROMAN_NUMERAL;
            }
            else {
                value = parseInt(value, 10);
                if(isNaN(value)) {
                    value = null;
                }
            }
            if(renderType == 'auto') {
                renderType = 'roman';
            }
        }
        else if(htmlNode.dataset.romanNumber) {
            value = String(htmlNode.dataset.romanNumber).trim().toLowerCase();
            if(value === 'min') {
                value = this.constants.MIN_ROMAN_NUMERAL;
            }
            else if(value === 'max') {
                value = this.constants.MAX_ROMAN_NUMERAL;
            }
            else {
                value = this.fromRoman(value);
                if(isNaN(value)) {
                    value = null;
                }
            }
            if(renderType == 'auto') {
                renderType = 'arabic';
            }
        }

        if(renderType == 'roman') {
            htmlNode.textContent = this.formatAsString(this.toRoman(value));
        } 
        else if(renderType == "arabic") {
            htmlNode.textContent = this.formatAsString(value);
        }
    }

    static attachToElement(htmlNode, observeAttributes = true) {
        if(!(htmlNode instanceof HTMLElement)) {
            return;
        }
        this.#renderHtmlElement(htmlNode);
        if(observeAttributes) {
            // register attribute observer to re-render on attribute changes
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if(mutation.type === 'attributes') {
                        this.#renderHtmlElement(htmlNode);
                    }
                });
            });
            observer.observe(htmlNode, { attributes: true });
        }
    }

    static renderElements(querySelector = 'span[data-arabic-number], span[data-roman-number]', htmlNode = null, observeAttributes = true, observeNewElements = true) {
        if(!(htmlNode instanceof HTMLElement)) {
            htmlNode = document;
        }
        htmlNode.querySelectorAll(querySelector).forEach(el => {
            this.attachToElement(el, observeAttributes);
        });

        // Should we watch for new elements?
        if(observeNewElements) {
            const observer = new MutationObserver(mutationsList => {
                for (const mutation of mutationsList) {
                    if (mutation.type === "childList") {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // If the added node itself matches
                                if (node.matches(querySelector)) {
                                    this.attachToElement(node, observeAttributes);
                                }
                                // Or if descendants inside the added node match
                                node.querySelectorAll?.(querySelector).forEach(el => {
                                    this.attachToElement(el, observeAttributes);
                                });
                            }
                        });
                    }
                }
            });
            // Observe changes in the subtree
            observer.observe(htmlNode, {
                childList: true,
                subtree: true
            });
        }

    }
}

