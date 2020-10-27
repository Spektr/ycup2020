/**
 *
 * @typedef CoffeeMachineDebugInfo
 * @property {string} id - 10 chars
 * @property {number} code - 3 chars (leading zero)
 * @property {string} message - 34 chars (spaces in end)
 */

/**
 * @param debugInfo {CoffeeMachineDebugInfo} - отладочная информация
 * @return boolean[]
 */
function getBytes(debugInfo) {
    // ['f','u','c','k',' ','i','t']
    const combinedSymbols = [
        ...debugInfo.id.split(''),
        ...debugInfo.code.toString().padStart(3, '0').split(''),
        ...debugInfo.message.padEnd(34, ' ').split(''),
    ];

    // [102, 117, 99, 107, 32, 105, 116]
    const combinedCodes = combinedSymbols.map((char) => char.charCodeAt(0));


    // [102, 117, 99, 107, 32, 105, 116, 38]
    let controlSum = 0;
    combinedCodes.forEach((char) => {
        controlSum ^= char;
    })

    combinedCodes.push(controlSum);

    // ["0", "1", "1", "0", "0", "1"...
    return combinedCodes
        .map((code) => code
            .toString(2)
            .padStart(8, '0')
            .split('')
        )
        .flat();
}

/**
 * @param {HTMLDivElement} element
 */
function generateStyles(element) {
    element.insertAdjacentHTML('beforebegin', `
            <style>
                .barcode {
                    display: flex;
                    flex-direction: row;
                    width: 300px;
                    height: 96px;
                    justify-content: stretch;
                }
                
                .barcode__content {
                    display: flex;
                    flex-wrap: wrap;
                }
                
                .barcode__side {  
                    display: flex;
                    flex-direction: row;
                   justify-content: stretch;
                }
                
                .barcode__side-line {
                    width: 5px;
                    background-color: white;
                }
                
                .barcode__side-line_black {
                    width: 4px;
                    background-color: black;
                }
                
                .barcode__bar {             
                    width: 8px;
                    height: 8px;
                    background-color: white;
                }
                
                .barcode__bar_filled {
                    background-color: black;
                }
            </style>
        `);
}

/**
 * @param bytes boolean[] - array of bytes
 * @return HTMLDivElement
 */
function getBarCodeElement(bytes) {
    const sideTemplate = `
        <div class="barcode__side">
            <div class="barcode__side-line barcode__side-line_black"></div>
            <div class="barcode__side-line"></div>
            <div class="barcode__side-line barcode__side-line_black"></div>
            <div class="barcode__side-line"></div>
            <div class="barcode__side-line barcode__side-line_black"></div>
        </div>
    `
    const barcodeTemplate = `
        <div class="barcode">
            ${sideTemplate}
            <div class="barcode__content"></div>
            ${sideTemplate}
        </div>
    `;
    const barCode = document.createElement('div');
    barCode.className = 'barcode';
    barCode.innerHTML = barcodeTemplate;

    const whiteElem = document.createElement('div');
    whiteElem.className = 'barcode__bar';

    const blackElem = whiteElem.cloneNode();
    blackElem.className += ' barcode__bar_filled';

    const content = barCode.getElementsByClassName('barcode__content')[0];
    bytes.forEach((byte) => {
        content.append(byte === '1' ? blackElem.cloneNode() : whiteElem.cloneNode());
    })

    return barCode;
}

let styled = false;

/**
 * Отрисовать отладочную информацию кофемашины в element
 * @param debugInfo {CoffeeMachineDebugInfo} - отладочная информация
 * @param element {HTMLDivElement} - div с фиксированным размером 300x96 пикселей,
 *     в который будет отрисовываться баркод
 */
function renderBarcode(debugInfo, element) {
    const bytes = getBytes(debugInfo);
    const barCodeElement = getBarCodeElement(bytes);

    if (!styled) {
        generateStyles(element);
        styled = true;
    }
    element.append(barCodeElement);
}
