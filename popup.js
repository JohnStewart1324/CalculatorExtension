document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");

    let input = "";
    let old = "";
    let operator = null;

    //Button clicks handler
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.value;
            console.log(value);
            if (["+","-","*","/"].includes(value)) {
                operator = value;
                old = input;
                input = "";
                display.value = operator;
            }

            else if (value === "=") {
                switch (operator) {
                    case "+":
                        display.value = Number(old) + Number(input);
                    break;
                    case "-":
                        display.value = Number(old) - Number(input);
                    break;
                    case "*":
                        display.value = Number(old) * Number(input);
                    break;
                    case "/":
                        display.value = Number(old) / Number(input);
                    break;
                }
            }

            else if (value === "C") {
                input = "";
                old = "";
                operator = null;
                display.value = "";
                
            }

            else {
                input += value;
                display.value = input;
                
            }
        });
    });
});