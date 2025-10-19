// This runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Get components from the HTML (like your member variables)
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    // Calculator state variables (same as your Java code)
    let num1 = null;
    let operator = null;
    let startOfNumber = true;

    // Add a click listener to EVERY button (like button.addActionListener(this))
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.innerText;

            // --- Case 1: The button is a digit or decimal ---
            if ((command >= '0' && command <= '9') || command === '.') {
                if (startOfNumber) {
                    display.value = command;
                    startOfNumber = false;
                } else {
                    display.value += command;
                }
            }
            // --- Case 2: The button is 'C' (Clear) ---
            else if (command === 'C') {
                display.value = '0';
                startOfNumber = true;
                num1 = null;
                operator = null;
            }
            // --- Case 3: The button is '=' (Equals) ---
            else if (command === '=') {
                if (num1 !== null && operator !== null) {
                    const num2 = parseFloat(display.value);
                    const result = calculate(num1, num2, operator);
                    display.value = result;

                    // Reset for next calculation
                    startOfNumber = true;
                    num1 = result; // Allow chaining calculations
                    operator = null;
                }
            }
            // --- Case 4: The button is an operator ---
            else {
                // Store the first number and the operator
                num1 = parseFloat(display.value);
                operator = command;
                startOfNumber = true; // Get ready for the next number
            }
        });
    });

    /**
     * Performs the calculation.
     * This is the logic you had in your '=' switch statement.
     */
    function calculate(n1, n2, op) {
        switch (op) {
            case '+': return n1 + n2;
            case '-': return n1 - n2;
            case '*': return n1 * n2;
            case '/':
                if (n2 === 0) {
                    return 'Error';
                }
                return n1 / n2;
            default:
                return n2;
        }
    }
});
a
