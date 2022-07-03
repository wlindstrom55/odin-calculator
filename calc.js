let displayVal = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button'); //all buttons selected here

const input = document.querySelector('.input');

//this event listener, for each key pressed, takes the keyCode returned from the
//keypress event and finds the button associated with it, and simulates a 'click' on it
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='$e.keyCode}']`);
    key.click();
})

//this function determines the readout display numbers and operators.
function popDisplay() {
    const readout = document.querySelector('.readout');
    readout.innerText = displayVal;
    if(displayVal.length > 9) { //if display maxes out, then cut off further input
        displayVal.innerText = displayVal.substring(0,9);
    }
}

popDisplay(); //run

//this method will route our button presses to functions that determine 
//behavior for all of all our different buttons when pressed
function buttons() {
    for(let i = 0; i <= buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
        if(buttons[i].classList.contains('operand')) {
            inputOperand(buttons[i].value);
            updateDisplay();
        } else if(buttons[i].classList.contains('operator')) {
            inputOperator(buttons[i].value);
        } else if(buttons[i].classList.contains('equals')) {
            inputEquals();
            updateDisplay();
        } else if(buttons[i].classList.contains('decimal')) {
            inputDecimal(buttons[i].value);
            updateDisplay();
        } else if(buttons[i].classList.contains('percent')) {
            inputPercent(displayVal);
            updateDisplay();
        } else if(buttons[i].classList.contains('sign')) {
            inputSign(displayVal);
            updateDisplay();
        } else if(buttons[i].classList.contains('clear'))
            clearDisplay();
            updateDisplay();
        })}
    digits.style.gridTemplateColumns = 'repeat(100px, 1fr)'; //these may not be necessary
    digits.style.gridTemplateRows = 'repeat(100px, 1fr)';
}

buttons(); //run


function inputOperand(operand) {
    if(firstOperator === null) { //if firstOperator strictly equals null
        if(displayVal === '0' || displayVal === 0) {
            displayVal = operand; //1st click = handles first operand input
        } else if(displayVal === firstOperand) {
            displayVal = operand; //starts new operation after inputEquals()
        } else {
            displayVal += operand;
        }
    } else { //otherwise do this
        if(displayVal === firstOperand) { //3rd/5th click - inputs to secondOperand
            displayVal = operand;
        } else {
            displayVal += operand;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        //4th click - handles input of second operator
        secondOperator = operator;
        secondOperand = displayVal;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayVal = roundAccurately(result, 15).toString();
        firstOperand = displayVal;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        secondOperand = displayVal;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayVal = roundAccurately(result, 15).toString();
        firstOperand = displayVal;
        result = null;
    } else { 
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayVal;
    }
}

function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if(firstOperator === null) { //if no operator, display stays the same
        displayVal = displayVal;
    } else if(secondOperator != null) {
        //handles final result
        secondOperand = displayVal;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === 'lmao') {
            displayVal = 'lmao';
        } else {
            displayVal = roundAccurately(result, 15).toString();
            firstOperand = displayVal;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handles first operation
        secondOperand = displayVal;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'lmao') {
            displayVal = 'lmao';
        } else {
            displayVal = roundAccurately(result, 15).toString();
            firstOperand = displayVal;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

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



// function popOperatorButtons() {
//     const operator = document.createElement('div');
//     operator.classList.add('operators');
//     input.append(operator);
//     let operations = ['+', '-', '*', '/', '='];
//     for (let i = 0; i < operations.length; i++) {
//         const ops = document.createElement('button');
//         ops.innerHTML = `${operations[i]}`;
//         ops.classList.add(`operatorB${i}`);
//         operator.append(ops);
//     }
// }


// start
