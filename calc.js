let displayVal = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button'); //all buttons selected here

//this event listener, for each key pressed, takes the keyCode returned from the
//keypress event and finds the button associated with it, and simulates a 'click' on it
//doesnt sync up with my operator keys though - try to research
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
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
function routeButtons() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
        if(buttons[i].classList.contains('operand')) { //class check for button type
            inputOperand(buttons[i].value);
            popDisplay();
        } else if(buttons[i].classList.contains('operator')) {
            inputOperator(buttons[i].value);
        } else if(buttons[i].classList.contains('equals')) {
            inputEquals();
            popDisplay();
        } else if(buttons[i].classList.contains('decimal')) {
            inputDecimal(buttons[i].value);
            popDisplay();
        } else if(buttons[i].classList.contains('percent')) {
            inputPercent(displayVal);
            popDisplay();
        } else if(buttons[i].classList.contains('sign')) {
            inputSign(displayVal);
            popDisplay();
        } else if(buttons[i].classList.contains('clear'))
            clearDisplay();
            popDisplay();
        })}
    //digits.style.gridTemplateColumns = 'repeat(100px, 1fr)'; //these may not be necessary
    //digits.style.gridTemplateRows = 'repeat(100px, 1fr)';
}

routeButtons(); //run

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
        displayVal = roundAccurately(result, 10).toString();
        firstOperand = displayVal;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        secondOperand = displayVal;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayVal = roundAccurately(result, 10).toString();
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
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator); //calc done here
        if(result === '80085') { //in case divide by 0
            displayVal = '80085';
        } else { //return val
            displayVal = roundAccurately(result, 10).toString();
            firstOperand = displayVal; //set firstoperand to show on display
            secondOperand = null; // then reset everything
            firstOperator = null;
            secondOperator = null;
            result = null; 
        }
    } else {
        //handles first operation
        secondOperand = displayVal;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === '80085') {
            displayVal = '80085';
        } else { //return val
            displayVal = roundAccurately(result, 10).toString();
            firstOperand = displayVal;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputDecimal(dot) {
    if(displayVal === firstOperand || displayVal === secondOperand) {
        displayVal = '0';
        displayVal += dot;
    } else if(!displayVal.includes(dot)) { //if there's another decimal, only one is included.
        displayVal += dot;
    } 
}

function inputPercent(num) {
    displayVal = (num/100).toString();
}

function inputSign(num) { 
    displayVal = (num * -1).toString();
}

function roundAccurately(num, places) {
    //parsefloat parses our argument, returns fp number
    //our arg is the number to the 15th place then rounded, then truncated back down 15 places.
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

function clearDisplay() { //reset
    displayVal = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if(firstOperand != null) {
        firstOperand = null;
        popDisplay();
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

function operate(a, b, operator) {
    let result;
    if(operator == '+') {
        result = add(a,b);
    }
    else if(operator == '-') {
        result = subtract(a,b);
    }
    else if( operator == '*') {
        result = multiply(a,b);
    }
     else if(operator == '/') {
        if (b == 0) {
            return '80085';
        }
        result = divide(a,b);
    }
    return result;
}
