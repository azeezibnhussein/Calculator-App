const e = 2.71828;
const TOL = 10 ** (-14);

function add(number1, number2) {
    if (typeof number1 != "number" || typeof number2 != "number") {
        return "a parameter given is not a number";
    }
    else {
        return number1 + number2;
    }
}

function subtract(number1, number2) {
    if (typeof number1 != "number" || typeof number2 != "number") {
        return "a parameter given is not a number";
    }
    else {
        return number1 - number2;
    }
}

function multiply(number1, number2) {
    if (typeof number1 != "number" || typeof number2 != "number") {
        return "A parameter given is not a number";
    }
    else {
        return number1 * number2;
    }
}

function divide(number1, number2) {
    if (typeof number1 != "number" || typeof number2 != "number") {
        return "A parameter given is not a number";
    }
    else if (number2 < TOL) {
        return "You can't divide by zero =( It is not a defined mathmatical value";
    }
    else {
        return number1 / number2;
    }
}

function power(number1, number2) {
    if (typeof number1 != "number" || typeof number2 != "number") {
        return "A parameter given is not a number";
    }
    else {
        return number1 ** number2;
    }
}

function root(number1, number2) {
    if (typeof number1 != "number" || typeof number2 != "number") {
        return "A parameter given is not a number";
    }
    else if (number2 < TOL) {
        return "You can't perform a zero-th or negative number root =(";
    }
    else {
        return number1 ** (1 / number2);
    }
}

function factorial(number) {
    if (typeof number != "number") {
        return "Parameter given is not a number";
    }
    else if (number < 0) {
        return "factorial is not defined for negative numbers";
    }
    else {
        let answer;
        if (number >= 1 || answer < TOL) {answer = 1;}
        else {answer = 0;}
        
        while (number >= 1) {
            answer *= number
            number--
        }
        
        if (number > TOL) {
            const dt = 0.001;
            for (let t = 0; t < 100; t += dt) {
                answer += (t ** number) * (e ** (- t)) * dt;
            }
        }
        
        return answer
    }
}

console.log(add(1, 2));
console.log(subtract(1, 2));
console.log(multiply(1, 2));
console.log(divide(1, 2));
console.log(divide(1, 0));
console.log(power(0, 0));
console.log(root(9, 2));
console.log(root(0, 0));
console.log(power(root(90, 14), 14));
console.log(factorial(4));
console.log(factorial(0.5));
console.log(factorial(0));
console.log(factorial(1));