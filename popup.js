document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const divButton = document.getElementById("/");
    const multButton = document.getElementById("*");
    const addButton = document.getElementById("+");
    const subButton = document.getElementById("-");
    const clearButton = document.getElementById("C");


    let input = "";
    let old = "";
    let result = "";
    let operator = null;
    let hasDecimal = false;
    let hasComputed = false;
    let hasOperator = true;

    //Button clicks handler
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.value;
            console.log(value);
            
            
            if (["+","-","*","/"].includes(value)) {
                if (operator == null) {
                    hasDecimal = false;
                    console.log("resetDecimal");
                    hasOperator = true;
                }    
                    

                input = display.value;
                operator = value;
                old = input;
                input = "";
                
                setOperatorColors(value);
            }

            else if (value === "=") {
                
                switch (operator) {
                    case "+":
                        result = Number(old) + Number(input);
                    break;
                    case "-":
                        result = Number(old) - Number(input);
                    break;
                    case "*":
                        result = Number(old) * Number(input);
                    break;
                    case "/":
                        result = Number(old) / Number(input);
                    break;
                }
                
                old = result;
                result = Number(result).toPrecision(5);
                display.value = parseFloat(result);
                hasComputed = true;
                setOperatorColors(null);
            }

            else if (value == "C") {
                switch (clearButton.textContent) {
                    case "C":
                        input = "";
                        display.value = "";
                        document.getElementById("C").textContent = "AC";
                        hasDecimal = false;
                    break;
                    case "AC":
                        setOperatorColors(null);
                        operator = null;
                        input = "";
                        old = "";
                        display.value = "";
                        hasDecimal = false;

                    break;
                }
                
            }

            else if (value == "copy") {
                navigator.clipboard.writeText(display.value).then(
                alert("Copied to clipboard: " + display.value));
            }

            else if (value == "del") {
                input = input.slice(0, -1);
                display.value = input;
            }

            else if (value == "sqrt") {
                if (input != "") {
                    result = Math.sqrt(Number(input));
                    display.value = parseFloat(Number(result).toPrecision(5));
                    input = result;
                    old = result;
                }
            }

            else if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(value)) {
                if (hasComputed) {
                    input = "";
                    display.value = "";
                    document.getElementById("C").textContent = "C";
                }
                if (operator == null) {
                    input += value;
                } else {
                    if (display.value == old) {
                        input = value;
                        document.getElementById("C").textContent = "C";
                    } else if (old == "") {
                        document.getElementById("C").textContent = "C";
                    }else {
                        input += value;
                    }
                    
                }
                display.value = input;
                
                hasComputed = false;
            }
            

            else if (value == ".") {
                
                if (!hasDecimal) {
                    if (input == "") {
                        input += "0."
                        display.value = input;
                    } else {
                        input += ".";
                        display.value = input;
                    }
                }
                hasDecimal = true;
            }

            else {
                input = old;
                document.getElementById("C").textContent = "C";
                
            }
            
        });

        function setOperatorColors(operator) {
            switch (operator) {
                case "+":
                    addButton.style.backgroundColor = "#ecb959";
                    subButton.style.backgroundColor = "#f0aa13";
                    multButton.style.backgroundColor = "#f0aa13";
                    divButton.style.backgroundColor = "#f0aa13";
                break;
                case "-":
                    subButton.style.backgroundColor = "#ecb959";
                    addButton.style.backgroundColor = "#f0aa13";
                    multButton.style.backgroundColor = "#f0aa13";
                    divButton.style.backgroundColor = "#f0aa13";
                break;
                case "*":
                    multButton.style.backgroundColor = "#ecb959";
                    subButton.style.backgroundColor = "#f0aa13";
                    addButton.style.backgroundColor = "#f0aa13";
                    divButton.style.backgroundColor = "#f0aa13";
                break;
                case "/":
                    divButton.style.backgroundColor = "#ecb959";
                    subButton.style.backgroundColor = "#f0aa13";
                    multButton.style.backgroundColor = "#f0aa13";
                    addButton.style.backgroundColor = "#f0aa13";
                break;
                case null:
                    divButton.style.backgroundColor = "#f0aa13";
                    subButton.style.backgroundColor = "#f0aa13";
                    multButton.style.backgroundColor = "#f0aa13";
                    addButton.style.backgroundColor = "#f0aa13";
                break;

            }
        }
    });
});