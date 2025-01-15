document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const clearButton = document.getElementById("clear");
    const equalsButton = document.getElementById("equals");

    let currentInput = ""; // Stores the current mathematical expression
    let isNewCalculation = false; // Tracks if the last operation was "="
    let lastResult = null; // Stores the last result
    let lastOperator = null; // Stores the last operator
    let lastOperand = null; // Stores the last operand for repeated operations

    // Update the display
    const updateDisplay = (value) => {
        display.value = value;
    };

    // Add event listeners to all buttons
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            // Handle clearing the previous result for new input
            if (isNewCalculation && value.match(/[0-9]/)) {
                currentInput = ""; // Clear input for new calculation
                isNewCalculation = false; // Reset the flag
            }

            if (value.match(/[0-9]|\./)) {
                // Allow digits and decimal point
                currentInput += value;
                isNewCalculation = false; // Allow continued input
            } else if (["+", "-", "*", "/"].includes(value)) {
                // Check if the last character is an operator
                if (currentInput && ["+", "-", "*", "/"].includes(currentInput.slice(-1))) {
                    // Replace the last operator with the new one
                    currentInput = currentInput.slice(0, -1) + value;
                } else if (currentInput) {
                    // Append the operator if it's valid
                    currentInput += value;
                }
                lastOperator = value; // Update the last operator
                isNewCalculation = false; // Allow continued input
            }

            updateDisplay(currentInput);
        });
    });

    // Handle the clear button
    clearButton.addEventListener("click", () => {
        currentInput = ""; // Reset input
        updateDisplay(currentInput);
        isNewCalculation = false; // Reset the calculation flag
        lastResult = null; // Clear the last result
        lastOperator = null; // Clear the last operator
        lastOperand = null; // Clear the last operand
    });

    // Handle the equals button
    equalsButton.addEventListener("click", () => {
        try {
            if (!currentInput) return; // Do nothing if input is empty

            if (!isNewCalculation) {
                // If it's the first equals press after a calculation
                const parts = currentInput.split(/([+\-*/])/); // Split into operands and operator
                const firstOperand = parseFloat(parts[0]);
                const operator = parts[1];
                const secondOperand = parseFloat(parts[2]);

                if (!operator || isNaN(secondOperand)) return; // If expression is incomplete, return

                // Perform the calculation
                lastResult = eval(`${firstOperand} ${operator} ${secondOperand}`);
                lastOperator = operator; // Store the last operator
                lastOperand = secondOperand; // Store the last operand for repetition
            } else {
                // If repeating the calculation, use lastResult and lastOperand
                if (lastResult !== null && lastOperator && lastOperand !== null) {
                    lastResult = eval(`${lastResult} ${lastOperator} ${lastOperand}`);
                }
            }

            updateDisplay(lastResult); // Show the result on the display
            currentInput = lastResult.toString(); // Store the result for further operations
            isNewCalculation = true; // Set flag to indicate a completed calculation
        } catch (error) {
            updateDisplay("Math Error"); // Display "Math Error" for invalid expressions or division by zero
            currentInput = ""; // Reset the input
            isNewCalculation = false; // Reset the calculation flag
            lastResult = null; // Clear the last result
            lastOperator = null; // Clear the last operator
            lastOperand = null; // Clear the last operand
        }
    });
});
