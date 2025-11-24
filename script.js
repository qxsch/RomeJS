
// Rome.NUMBER_FORMAT_LOCALE = 'de-CH';
Rome.renderElements();

const inputElement = document.getElementById('inputElement');


inputElement.addEventListener('keydown', function(event) {
    const outputElement = document.getElementById('outputElement');
    if(outputElement === null || outputElement === undefined) {
        return;
    }
    // has focused input field
    if(this !== document.activeElement) {
        return;
    }
    // standard input cleaning
    let input = this.value.trim().replace(/[^IVXLCDM0123456789\u0305]+/ig, '');
    if(input !== this.value) {
        this.value = input;
    }
    if(input.length === 0) {
        outputElement.textContent = 'Please enter a number';
        return;
    }
    const format = Rome.getNumberFormat(input);

    // increase or decrease value on ArrowUp or ArrowDown
    if(event) {
        if(!(event.shiftKey || event.ctrlKey || event.altKey || event.metaKey)) {
            if(format === 'roman') {
                // increase
                if(event.key === 'ArrowUp' || event.key === '+') {
                    let arabicValue = Rome.fromRoman(input);
                    if(!isNaN(arabicValue) && arabicValue < Rome.constants.MAX_ROMAN_NUMERAL) {
                        input = Rome.toRoman(arabicValue + 1);
                        this.value = input;
                    }
                }
                // decrease
                else if( event.key === 'ArrowDown' || event.key === '-') {
                    let arabicValue = Rome.fromRoman(input);
                    if(!isNaN(arabicValue) && arabicValue > Rome.constants.MIN_ROMAN_NUMERAL) {
                        input = Rome.toRoman(arabicValue - 1);
                        this.value = input;
                    }
                }
            }
            else if(format === 'arabic') {
                // increase
                if(event.key === 'ArrowUp' || event.key === '+') {
                    let arabicValue = parseInt(input, 10);
                    if(!isNaN(arabicValue) && arabicValue < Rome.constants.MAX_ROMAN_NUMERAL) {
                        arabicValue += 1;
                        this.value = String(arabicValue);
                        input = this.value;
                    }
                }
                // decrease
                else if(event.key === 'ArrowDown' || event.key === '-') {
                    let arabicValue = parseInt(input, 10);
                    if(!isNaN(arabicValue) && arabicValue > Rome.constants.MIN_ROMAN_NUMERAL) {
                        arabicValue -= 1;
                        this.value = String(arabicValue);
                        input = this.value;
                    }
                }
            }
        }
    }
    // render number
    if (format === 'roman') {
        outputElement.textContent = 'Arabic: ' +  Rome.formatAsString(Rome.fromRoman(input));
    }
    else if (format === 'arabic') {
        outputElement.textContent = 'Roman: ' + Rome.formatAsString(Rome.toRoman(parseInt(input, 10)));
    }
    else {
        outputElement.textContent = 'Invalid format';
    }
});

inputElement.addEventListener('input', function() {
    // trigger keydown event with null event to re-render output
    const event = new Event('keydown');
    this.dispatchEvent(event);
});

// Roman numeral button insertion logic
document.querySelectorAll('.roman-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const ch = this.dataset.char;
        if(inputElement === null || inputElement === undefined) { 
            return; 
        }
        const start = inputElement.selectionStart ?? inputElement.value.length;
        const end = inputElement.selectionEnd ?? inputElement.value.length;
        const before = inputElement.value.slice(0, start);
        const after = inputElement.value.slice(end);
        inputElement.value = before + ch + after;
        const newPos = start + ch.length;
        inputElement.focus();
        inputElement.setSelectionRange(newPos, newPos);
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    });
});



