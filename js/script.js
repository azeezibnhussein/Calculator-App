const e = 2.71828;
const TOL = 10 ** (-14);

let dotPressed = false;
let operatorPressed = false;
const supportedOperators = ["+", "-", "*", "/", "^", "!", "sqrt"];

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

function sqrt(number) {
    if (typeof number != "number") {
        return "Parameter given is not a number";
    }
    else {
        return number ** (0.5);
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

function operate(operator, number1, number2 = false) {
    if (number2 === false && operator == "!") {return factorial(number1);}
    else if (number2 !== false && operator == "+") {return add(number1, number2);}
    else if (number2 !== false && operator == "-") {return subtract(number1, number2);}
    else if (number2 !== false && operator == "*") {return multiply(number1, number2);}
    else if (number2 !== false && operator == "/") {return divide(number1, number2);}
    else if (number2 !== false && operator == "^") {return power(number1, number2);}
    else if (number2 === false && operator == "sqrt") {return sqrt(number1, number2);}
    else {
        return "operator use was not valid!";
    }
}

function check_valid_input(input) {
    input = input.replaceAll(" ", "");
    
    let lastElement = "";
    let numbersFirst = false;
    
    for (let i = 0; i < input.length; i) {
        if (!isNaN(parseFloat(input.slice(i, input.length))) && lastElement != "number") {
            if (input[i] == "+" && lastElement != "!") {
                input = input.replace("+", "");
            }
            else if (["+", "-"].includes(input[i]) && lastElement == "!") {
                i += 1;
            }
            i += parseFloat(input.slice(i, input.length)).toString().length;
            
            numbersFirst = true;
            lastElement = "number";
        }
        else if (!numbersFirst && lastElement != "operator") {
            if (input.slice(i, i + 4) == "sqrt") {i += 4;}
            else {return false;}
            
            lastElement = "operator"
        }
        else if (supportedOperators.includes(input[i]) && lastElement != "operator") {
            if (input[i] != "!") {lastElement = "operator";}
            else if (lastElement == "!") {return false;}
            else {lastElement = "!";}
            
            
            i += 1;
        }
        else if (input.slice(i, i + 4) == "sqrt" && lastElement == "operator") {i += 4;}
        else {return false;}
    }
    
    if (lastElement == "operator") {return false;}
    else {return input;}
}

function display(toDisplay) {
    const unwantedStartElements = ["0", "+", "-", "*", "/", "^", "!"]
    displayElement = document.querySelector(".display");
    
    if (!isNaN(toDisplay) && unwantedStartElements.toString().includes(displayElement.value)) {
        displayElement.value = "";
    }
    else if (toDisplay == "sqrt" && unwantedStartElements.toString().includes(displayElement.value)) {
        displayElement.value = "";
    }
    else if (isNaN(toDisplay) && toDisplay.length > 5) {
        displayElement.value = "";
    }
    displayElement.value += toDisplay;
}

function get_display_content() {
    displayElement = document.querySelector(".display");
    let displayTextContent = check_valid_input(displayElement.value);
    if (displayTextContent == false) {return "Invalid Input!";}
    
    const calculationTerms = [];
    const numbers = [];
    const operators = [];
    let lengthOfElement = 0;
    let lengthNeeded = 3;
    
    for (let i = 0; displayTextContent.length > 0; i++) {
        if (displayTextContent[0] == "!") {
            if (operators.length == 0) {lengthNeeded = 2;}
            operators.push("!");
            displayTextContent = displayTextContent.replace("!", "");
        }
        else if (lengthOfElement >= lengthNeeded) {
            calculationTerms.push(operators.toString() + " " + numbers.toString())
            
            numbers.splice(0, numbers.length);
            operators.splice(0, operators.length);
            lengthOfElement = -1;
            lengthNeeded = 2;
            
            if (displayTextContent == " ") {displayTextContent = "";}
        }
        else if (["-", "+"].includes(displayTextContent[0]) && 
                 (calculationTerms.length > 0 || numbers.length > 0) && 
                 operators.length == 0) {
            operators.push(displayTextContent[0]);
            displayTextContent = displayTextContent.replace(displayTextContent[0], "")
        }
        else if (!isNaN(parseFloat(displayTextContent))) {
            numbers.push(parseFloat(displayTextContent));
            displayTextContent = displayTextContent.replace(parseFloat(displayTextContent).toString(), "");
        }
        else if (displayTextContent.slice(0, 4) == "sqrt") {
            if (operators.length == 0) {lengthNeeded = 2;}
            else if (numbers.length > 0) {lengthNeeded = 4;}
            else {lengthNeeded = 3;}
            operators.push("sqrt");
            displayTextContent = displayTextContent.replace("sqrt", "");
        }
        else {
            operators.push(displayTextContent[0]);
            displayTextContent = displayTextContent.replace(operators, "")
        }
        
        lengthOfElement += 1;
        if (i > 100) {break;}
        if (displayTextContent.length == 0 && numbers.length + operators.length > 0)
            displayTextContent = " "
    }
    
    return calculationTerms;
}

function calculate_terms(terms) {
    let result = 0;
    
    let termResult;
    let tempResult;
    for (let i = 0; i < terms.length; i++) {
        if (!Number.isSafeInteger(result)) {result = BigInt(result);}
        
        termResult = 0;
        const operators = terms[i].split(" ")[0].split(",");
        const numbers = terms[i].split(" ")[1].split(",");
        
        if (numbers.length == 1 && operators.length == 0) {return numbers[0];}
        else if (numbers.length == 2 && operators.length == 1) {
            tempResult = operate(operators[0], parseFloat(numbers[0]), parseFloat(numbers[1]));
            if (typeof tempResult == "string") {return tempResult;}
            termResult += tempResult;
        }
        else if (numbers.length == 1 && operators.length == 1) {
            if (["!", "sqrt"].includes(operators[0])) {
                tempResult = operate(operators[0], parseFloat(numbers[0]));
                if (typeof tempResult == "string") {return tempResult;}
                termResult += tempResult;
            }
            else {
                tempResult = operate(operators[0], result, parseFloat(numbers[0]));
                if (typeof tempResult == "string") {return tempResult;}
                termResult += tempResult
                result = 0;
            }
        }
        else if (numbers.length == 1 && numbers.length < operators.length) {
            tempResult = parseFloat(numbers[0]);
            if (operators.includes("sqrt")) {
                tempResult = operate("sqrt", tempResult, false);
                if (typeof tempResult == "string") {return tempResult;}
            }
            if (operators.includes("!")) {
                tempResult = operate("!", tempResult, false);
                if (typeof tempResult == "string") {return tempResult;}
            }
            if (operators.length == 3) {
                tempResult += operate(operators[0], result, tempResult);
                if (typeof tempResult == "string") {return tempResult;}
                termResult = tempResult;
                result = 0;
            }
            else {termResult += tempResult}
        }
        else if (numbers.length == 2 && numbers.length <= operators.length) {
            tempResult = parseFloat(numbers[1]);
            if (operators.includes("sqrt")) {
                tempResult = operate("sqrt", tempResult, false);
                if (typeof tempResult == "string") {return tempResult;}
            }
            if (operators.includes("!")) {
                tempResult = operate("!", tempResult, false);
                if (typeof tempResult == "string") {return tempResult;}
            }
            
            tempResult += operate(operators[0], parseFloat(numbers[0]), tempResult);
            if (typeof tempResult == "string") {return tempResult;}
            termResult = tempResult
        }
        else {return "Failed";}
        
        result += termResult;
    }
    
    return parseFloat(result.toFixed(5));
}

function clear_display(start = 0, stop = -1) {
    displayElement = document.querySelector(".display");
    textContent = displayElement.value;
    if (stop == -1) {displayElement.value = textContent.slice(0, start);}
    else {displayElement.value = textContent.slice(0, start) + textContent.slice(stop, textContent.length);}
    
    if (displayElement.value == "") {displayElement.value = "0";}
    if (!displayElement.includes(.)) {dotPressed = false;}
}

document.querySelector(".display").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#confirm").click();
  }
});

document.querySelector(".numbers").addEventListener("click", (event) => {
    const checkNodeName = event.target.nodeName == "BUTTON";
    if (checkNodeName) {
        if (event.target.textContent == "." && dotPressed == false) {
            display(event.target.textContent);
            dotPressed = true;
        }
    }
})

document.querySelector(".operators").addEventListener("click", (event) => {
    const checkNodeName = event.target.nodeName == "BUTTON";
    if (checkNodeName) {
        let displayText = "";
        
        if (event.target.textContent == "=") {
            displayText = get_display_content();
            if (typeof displayText != "string") {displayText = calculate_terms(displayText);}
            clear_display();
            operatorPressed = false;
            dotPressed = false;
        }
        else {
            displayText = event.target.textContent;
            operatorPressed = event.target.textContent;
        }
        display(displayText);
    }
})

document.querySelector(".deleters").addEventListener("click", (event) => {
    start = 0;
    stop = document.querySelector(".display").value.length;
    if (event.target.textContent == "←") {
        start = document.querySelector(".display").value.length - 1;
    }
    
    clear_display(start, stop);
})