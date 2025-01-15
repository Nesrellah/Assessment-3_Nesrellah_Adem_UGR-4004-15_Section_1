document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const clearButton = document.getElementById("clear");
    const equalsButton = document.getElementById("equals");

    let currentInput = ""; 
    let isNewCalculation = false;
    let lastResult = null; 
    let lastOperator = null; 
    let lastOperand = null; 

    const updateDisplay = (value) => {
        display.value = value;
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            
            if (isNewCalculation && value.match(/[0-9]/)) {
                currentInput = ""; 
                isNewCalculation = false; 
            }

            if (value.match(/[0-9]|\./)) {
                currentInput += value;
                isNewCalculation = false; 
            } else if (["+", "-", "*", "/"].includes(value)) {
                
                if (currentInput && ["+", "-", "*", "/"].includes(currentInput.slice(-1))) {
                    
                    currentInput = currentInput.slice(0, -1) + value;
                } else if (currentInput) {
                    
                    currentInput += value;
                }
                lastOperator = value;
                isNewCalculation = false; 
            }

            updateDisplay(currentInput);
        });
    });

    // Handle the clear button
    clearButton.addEventListener("click", () => {
        currentInput = ""; 
        updateDisplay(currentInput);
        isNewCalculation = false; 
        lastResult = null; 
        lastOperator = null; 
        lastOperand = null; 
    });


    equalsButton.addEventListener("click", () => {
        try {
            if (!currentInput) return; 

            if (!isNewCalculation) {

                const parts = currentInput.split(/([+\-*/])/);
                const firstOperand = parseFloat(parts[0]);
                const operator = parts[1];
                const secondOperand = parseFloat(parts[2]);

                if (!operator || isNaN(secondOperand)) return; 

                lastResult = eval(`${firstOperand} ${operator} ${secondOperand}`);
                lastOperator = operator; 
                lastOperand = secondOperand; 
            } else {
                if (lastResult !== null && lastOperator && lastOperand !== null) {
                    lastResult = eval(`${lastResult} ${lastOperator} ${lastOperand}`);
                }
            }

            updateDisplay(lastResult); 
            currentInput = lastResult.toString(); 
            isNewCalculation = true; 
        } catch (error) {
            updateDisplay("Math Error"); 
            currentInput = ""; 
            isNewCalculation = false; 
            lastResult = null;
            lastOperator = null;
            lastOperand = null;
        }
    });
});
