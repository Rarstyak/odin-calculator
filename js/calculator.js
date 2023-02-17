function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(a, b, operation) {
    switch (operation) {
        case "+" : 
            console.log(`add ${a} and ${b}`);
            return add(a,b);
        case "-" : 
            console.log(`subtract ${a} and ${b}`);
            return subtract(a,b);
        case "x" :
            console.log(`multiply ${a} and ${b}`);
            return multiply(a,b);
        case "/" :
            console.log(`divide ${a} and ${b}`);
            return divide(a,b);
        case "=" :
            console.log(`return display ${b}`);
            return b;
        default :
            return "ERROR";
    }
}

function clear() {
    ans = 0;
    nextOperation = "=";
    display.textContent = 0;
}

function back() {
    let len = display.textContent.length;
    if (len > 1) {
        display.textContent = display.textContent.substring(0, len - 1);
    } else {
        clear();
    }
}

function addToDisplay(e) {
    if (justOperated) {
        display.textContent = 0;
    }
    // We only take 16 digits
    if (display.textContent.length >= 16) {
        return;
    }
    if (parseFloat(display.textContent) === 0) {
        display.textContent = e.target.textContent;
    } else {
        display.textContent += e.target.textContent;
    }
    justOperated = false;
}

function dot(e) {
    if (!display.textContent.includes(".")) {
        addToDisplay(e);
    }
}

function compute(e) {
    let dis = parseFloat(display.textContent);
    if (isNaN(dis)) {
        console.log("Not a Number");
        console.log(`Change next operator to ${e.target.textContent}`);
        nextOperation = e.target.textContent;
        return;
    }
    if (justOperated) {
        console.log(`Change next operator to ${e.target.textContent}`);
        nextOperation = e.target.textContent;
        return;
    }
    if (dis === 0 && nextOperation === '/') {
        display.textContent = "SNARKY MSG";
        console.log(`Change next operator to ${e.target.textContent}`);
        nextOperation = e.target.textContent;
        justOperated = true;
        return;
    }
    ans = operate(parseFloat(ans), dis, nextOperation);
    console.log(`Ans: ${ans}`);
    // We only take 16 digits
    if (String(ans).length > 16) {
        console.log("too long");
        ans = String(ans).substring(0,16);
    }
    display.textContent = ans;

    console.log(e.target.textContent);
    nextOperation = e.target.textContent;
    justOperated = true;
}

let ans = 0;
let nextOperation = "=";
let justOperated = false;

const display = document.querySelector('.display');

const btnClear = document.querySelector('.clear');
btnClear.addEventListener('click', clear);

const btnBack = document.querySelector('.back');
btnBack.addEventListener('click', back);

const btnDot = document.querySelector('.dot');
btnDot.addEventListener('click', dot);

const numbers = document.querySelectorAll('button.number');
numbers.forEach(number => 
    number.addEventListener('click', addToDisplay)
);

const operators = document.querySelectorAll('button.operation');
operators.forEach(operator => 
    operator.addEventListener('click', compute)
);