const e = 2.71828;
const TOL = 10 ** (-14);

/**
 * Calculator class represents a calculator object that performs arithmetic operations.
 * @class
 * @param {HTMLElement} previousDisplayText - The element for displaying the previous calculation result.
 * @param {HTMLElement} currentDisplayText - The element for displaying the current calculation input.
 */
class Calculator {
    /**
     * Creates a new Calculator instance.
     * Initializes the previousDisplayText and currentDisplayText properties.
     * @constructor
     * @param {HTMLElement} previousDisplayText - The element for displaying the previous calculation result.
     * @param {HTMLElement} currentDisplayText - The element for displaying the current calculation input.
     */
    constructor(previousDisplayText, currentDisplayText) {
        this.previousDisplayText = previousDisplayText;
        this.currentDisplayText = currentDisplayText;
        this.clearAll();
    }

    /* Clear different variables */
    clearAll() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.lastOperation = undefined;
    }

    /* Delete single number to the left */
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    /* Add number to the screen every time user clicks number */
    appendNumber(number) {
        if (number === '.' && this.currentOperand.toString().includes('.')) return;

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    /**
     * Sets the operation for the calculator.
     * 
     * @param {string} operation - The operation to be set.
     */
    chooseOperation(operation) {
        if (this.currentOperand === '') {
            if (operation !== '%') this.operation = operation;
            return
        };

        if (this.previousOperand !== '') {
            if (operation === '%') {
                this.lastOperation = this.operation;
                this.operation = operation;
            }

            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    /**
     * Performs the computation based on the previous operand, current operand, and operation.
     * The result is stored in the current operand.
     * @returns {void}
     */
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // Check if the operands are valid numbers
        if (isNaN(prev) || isNaN(current)) return;

        // Perform the computation based on the selected operation
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;

            case '-':
                computation = prev - current;
                break;

            case 'x':
                computation = prev * current;
                break;

            case '÷':
                computation = prev / current;
                break;

            case '%':
                // Perform percentage computation based on the last operation
                switch (this.lastOperation) {
                    case '+':
                        computation = prev + ((prev * current) / 100);
                        break;

                    case '-':
                        computation = prev - ((prev * current) / 100);
                        break;

                    case 'x':
                        computation = prev * ((prev * current) / 100);
                        break;

                    case '÷':
                        computation = prev / ((prev * current) / 100);
                        break;
                    default:
                        return;
                }

                break;

            default:
                return;
        }

        // Update the current operand with the computed value
        this.currentOperand = computation;

        // Reset the operation and last operation variables
        this.operation = undefined;
        this.lastOperation = undefined;

        // Clear the previous operand
        this.previousOperand = '';
    }

    /**
     * Formats a number for display with a maximum of 4 decimal places.
     *
     * @param {number} number - The number to be formatted.
     * @returns {string} The formatted number.
     */
    getFormattedNumber(number) {
        const stringNumber = number.toString();

        // Extract the integer and decimal digits
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = stringNumber.split('.')[1];
        let integerDisplay;

        // Check if the integer part is NaN (not a number)
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            // Format the integer part with commas
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 4
            })
        }

        // Check if there are decimal digits
        if (decimalDigit != null) {
            // Return the formatted number with maximum 6 decimal places
            return `${integerDisplay}.${decimalDigit.substring(0, 6)}`;
        } else {
            // Return the formatted integer part only
            return integerDisplay;
        }
    }

    /**
     * Updates the display of the calculator with the current and previous operands and operation.
     */
    updateDisplay() {
        // Update the current operand display with formatted number
        this.currentDisplayText.innerText = this.getFormattedNumber(this.currentOperand);

        // Check if there is an operation in progress
        if (this.operation != null || this.operation != undefined) {

            // Check if previous operand is empty and set it to 0 if true
            if (this.previousOperand === '') this.previousOperand = 0;

            // Update the previous operand display with formatted numbers and operation
            this.previousDisplayText.innerText =
                `${this.getFormattedNumber(this.previousOperand)} ${this.operation} ${this.getFormattedNumber(this.currentOperand)}`;
        } else {
            this.previousDisplayText.innerText = '';
        }

        // Check if both current and previous operands are empty, set them to 0 and update the display
        if (this.currentOperand == '' && this.previousOperand == '') {
            this.previousDisplayText.innerText = 0;
            this.currentDisplayText.innerText = 0;
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const clearAllButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousDisplayText = document.querySelector('[data-previous-display]');
const currentDisplayText = document.querySelector('[data-current-display]');

const calculator = new Calculator(previousDisplayText, currentDisplayText);

// Handle keyboard down and trigger the corresponding button
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Escape':
            clearAllButton.click();
            break;

        case 'Backspace':
            deleteButton.click();
            break;

        case 'Enter':
            equalsButton.click();
            break;

        default:
            operationButtons.forEach(button => {
                if ((button.innerText === '÷' && e.key === '/') ||
                    (button.innerText === 'x' && e.key === '*')) {
                    button.click();
                } else if (button.innerText === e.key) {
                    button.click();
                }
            });

            numberButtons.forEach(button => {
                if ((button.innerText === '.' && e.key === ',') || button.innerText === e.key) {
                    button.click();
                }
            });
            break;
    }

});

// Add event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText); // Append the number to the calculator's input
        calculator.updateDisplay(); // Update the display
    })
});

// Add event listeners to operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText); // Choose the operation for the calculator
        calculator.updateDisplay();
    })
});

// Add event listener to equals button
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

// Add event listener to clear all button
clearAllButton.addEventListener('click', () => {
    calculator.clearAll();
    calculator.updateDisplay();
});

// Add event listener to delete button
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});