const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator_keys');
const display = document.querySelector('.calculator_display');


keys.addEventListener('click', e => {
    if(e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayNumber = display.textContent;
        if(!action) {
            if(displayNumber === '0') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayNumber + keyContent;
            }
        }
        if(action === 'add' || action === 'subtract' || action === 'divide' || action === 'multiply') {
            console.log('operator key!')
        }
        if(action === 'decimal') {
            display.textContent = displayNumber + '.';
        }
        if(action === 'clear') {
            display.textContent = '0';
        }
        if(action === 'calculate') {
            console.log('equal key')
        }
    }
})