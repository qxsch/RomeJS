# RomeJS
Roman to Arabic Converter

* Rome.js supports Numbers from 1 to 3.999.999 (I to M̅M̅M̅C̅M̅X̅C̅MX̅CMXCIX)
* Rome.js supports rendering subtrees:
   * Specify the root element
   * Filter using css selector
* Rome.js observes attribute changes and new nodes (optional)
* Also comes with a ready to use index.html file (Check out the demo page: https://qxsch.github.io/RomeJS/)


## Included web page
![Converter](./screenshot.jpg)

## API

1. Add span elements like this to your html:
   ```html
   <!-- below renders to XII -->
   <span data-arabic-number="12"></span>
   <!-- below renders to 12 -->
   <span data-roman-number="XII"></span>
   ```
1. Just include the script at the bottom of the body:
   ```html
   <!-- add this to the bottom of the html into the body -->
   <script src="rome.js"></script>
   <script>
   // uncomment below to set a special locale for arabic numbers
   //Rome.NUMBER_FORMAT_LOCALE = 'de-CH';
   Rome.renderElements();
   </script>
   ```

### Rome.RenderElements
Renders html elements that match a CSS selector in a given html tree (defaults to document).
```js
// defaults for renderElements
Rome.renderElements(
   // use a dedicated css selector
   querySelector = 'span[data-arabic-number], span[data-roman-number]',
  
   // defaults to document node, specify any HTMLElement node
   htmlNode = null,
  
   // observes attributes changes (and trigger a re-render)
   observeAttributes = true,
  
   // observes new elements being added (and trigger a render)
   // it will honor htmlNode and querySelector -> so just new elements that match will be rendered
   observeNewElements = true,

   // attributes name for the html elements:
   //    arabic number input (f.e. 12),
   //    roman number input (f.e. XII) and
   //    render output (auto, roman, arabic)
   customAttributes = {
        arabicName: 'data-arabic-number',
        romanName: 'data-roman-number',
        renderName: 'data-render-number'
   }
);
```

### Rome.attachToElement
Renders a single html element. Useful to integrate it within your frameworks.
```js
// defaults for attachToElement
Rome.attachToElement(
   // the HTMLElement (required)
   htmlNode,
  
   // observes attributes changes (and trigger a re-render)
   observeAttributes = true,

   // attributes name for the html elements:
   //    arabic number input (f.e. 12),
   //    roman number input (f.e. XII) and
   //    render output (auto, roman, arabic)
   customAttributes = {
        arabicName: 'data-arabic-number',
        romanName: 'data-roman-number',
        renderName: 'data-render-number'
   }
);
```


### Rome.fromRoman
Converts a roman number string to an arabic number.
```js
// returns NaN if input is not a valid Roman numeral, otherwise the Arabic number as integer
let arabicNumber = Rome.fromRoman('XII'); // returns 12
let badNumer = Rome.fromRoman('sdfasdfasdf'); // returns NaN
```

### Rome.toRoman
Converts an arabic number to a roman number string.
```js
// returns null if input is not a valid integer within 1 - 3,999,999, otherwise the Roman numeral as string
let romanNumber = Rome.toRoman(12); // returns 'XII'
let badNumber = Rome.toRoman(4000000); // returns null
```

### Rome.getNumberFormat
Returns what format the number is (roman, arabic or invalid)
```js
let format = Rome.getNumberFormat("1234"); // returns 'arabic'
let format2 = Rome.getNumberFormat("XII"); // returns 'roman'
let format3 = Rome.getNumberFormat("sdfasdfasdf"); // returns 'invalid'
```

### Rome.formatAsString
Formats a number (roman or arabic) as a string in the requested format.
```js
let formatted1 = Rome.formatAsString(213124); // returns '213,124' (depending on locale)
let formatted2 = Rome.formatAsString("XII"); // returns 'XII'
```
