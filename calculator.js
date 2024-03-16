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
        calculator.dataset.previousKeyType = "number";
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
      if (!display.textContent.includes(".") && previousKeyType !== 'operator') {
        display.textContent = displayNumber + ".";
    } else if (previousKeyType === "operator") {
        display.textContent = '0.';
    }
    calculator.dataset.previousKeyType = "decimal";
    }
    if (action === "clear") {
      display.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
    }
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayNumber;
      display.textContent = calculate(firstValue, operator, secondValue);
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

const calculate = (num1, operator, num2) => {
  let result = "";
  let firstNum = parseFloat(num1);
  let secondNum = parseFloat(num2);
  if (operator === "add") {
    result = firstNum + secondNum;
  } else if (operator === "subtract") {
    result = firstNum - secondNum;
  } else if (operator === "divide") {
    result = firstNum / secondNum;
  } else if (operator === "multiply") {
    result = firstNum * secondNum;
  }
  return result;
};
