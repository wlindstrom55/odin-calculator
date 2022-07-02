let mode = "picker";
//let mouseDown = false;
//let selectedButton = document.querySelector('#picker')

const readout = document.querySelector('.readout');
const input = document.querySelector('.input');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    let result;
    if(operator == add) {
        result = add(a,b);
    }
    if(operator == subtract) {
        result = subtract(a,b);
    }
    if( operator == multiply) {
        result = multiply(a,b);
    }
    if(operator == divide) {
        result = divide(a,b);
    }
    return result;
}

function popDigitButtons() {
    let count1 = 0;
    const digits = document.createElement('div');
    digits.classList.add('digits');
    input.append(digits);
    for(let i = 0; i <= 9; i++) {
        const numbers = document.createElement('button');
        numbers.innerHTML = `${count1}`;
        numbers.classList.add('numberB');
        digits.append(numbers);
        count1++;
    }
    digits.style.gridTemplateColumns = 'repeat(100px, 1fr)';
    digits.style.gridTemplateRows = 'repeat(100px, 1fr)';
}

function popOperatorButtons() {
    const operator = document.createElement('div');
    operator.classList.add('operators');
    input.append(operator);
    let operations = ['+', '-', '*', '/', '='];
    for (let i = 0; i < operations.length; i++) {
        const ops = document.createElement('button');
        ops.innerHTML = `${operations[i]}`;
        ops.classList.add(`operatorB${i}`);
        operator.append(ops);
    }
}

function popDisplay() {
    let displayVal;
    
}

function changeMode(btn) {
    
}
//console.logs for testing - should all equal 12
console.log(add(9, 3));
console.log(subtract(16, 4));
console.log(multiply(3, 4));
console.log(divide(48, 4));
console.log(operate(add, 9, 3));
console.log(operate(divide, 48, 4));
console.log(operate(subtract, 15, 3));
console.log(operate(multiply, 3, 4));

// start
popDigitButtons();
popOperatorButtons();
