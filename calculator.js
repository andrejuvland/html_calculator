const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayNumber = display.textContent;
    Array.from(key.parentNode.children).forEach((key) =>
      key.classList.remove("is-clicked")
    );
    const previousKeyType = calculator.dataset.previousKeyType;
    if (!action) {
      if (displayNumber === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayNumber + keyContent;
      }
    }
    if (
      action === "add" ||
      action === "subtract" ||
      action === "divide" ||
      action === "multiply"
    ) {
      key.classList.add("is-clicked");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayNumber;
      calculator.dataset.operator = action;
    }
    if (action === "decimal") {
      display.textContent = displayNumber + ".";
    }
    if (action === "clear") {
      display.textContent = "0";
    }
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      console.log(firstValue)
      const operator = calculator.dataset.operator;
      const secondValue = displayNumber;
      console.log(secondValue)
      display.textContent = calculate(firstValue, operator, secondValue);
    }
  }
});

const calculate = (num1, operator, num2) => {
  let result = "";
  if (operator === "add") {
    result = parseFloat(num1) + parseFloat(num2);
  } else if(operator === 'subtract') {
    result = parseFloat(num1) - parseFloat(num2);
  } else if (operator === 'divide') {
    result = parseFloat(num1) / parseFloat(num2);
  } else if (operator === 'multiply') {
    result = parseFloat(num1) * parseFloat(num2);
  }
  return result;
};
