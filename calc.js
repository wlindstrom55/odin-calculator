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

//console.logs for testing - should all equal 12
console.log(add(9, 3));
console.log(subtract(16, 4));
console.log(multiply(3, 4));
console.log(divide(48, 4));
console.log(operate(add, 9, 3));
console.log(operate(divide, 48, 4));
console.log(operate(subtract, 15, 3));
console.log(operate(multiply, 3, 4));