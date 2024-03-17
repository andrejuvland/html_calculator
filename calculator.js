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
      if (
        displayNumber === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayNumber + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }
    if (
      action === "add" ||
      action === "subtract" ||
      action === "divide" ||
      action === "multiply"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayNumber;
      if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== 'calculate') {
        const calculatedValue = calculate(firstValue, operator, secondValue);
        display.textContent = calculatedValue;
        calculator.dataset.firstValue = calculatedValue;
      } else {
        calculator.dataset.firstValue = displayNumber;
      }
      key.classList.add("is-clicked");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }
    if (action === "decimal") {
      if (
        !display.textContent.includes(",") &&
        previousKeyType !== "operator"
      ) {
        display.textContent = displayNumber + ",";
      } else if (previousKeyType === "operator" || previousKeyType === 'calculate') {
        display.textContent = "0,";
      }
      calculator.dataset.previousKeyType = "decimal";
    }
    if (action === "clear") {
      display.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
      calculator.dataset.firstValue = '';
      calculator.dataset.modValue = '';
      calculator.dataset.operator = '';
      calculator.dataset.previousKeyType = '';
    }
    if (action === "clearOne") {
      let str = display.textContent;
      if (str === "undefined") {
        display.textContent = "0";
      } else if (str.length > 1 && str !== "undefined") {
        str = str.slice(0, -1);
        display.textContent = str;
      } else {
        display.textContent = "0";
        calculator.dataset.operator = '';
      }
    }
    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayNumber;
      if (firstValue) {
        if(previousKeyType === 'calculate') {
          firstValue = displayNumber;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key.match(/[0-9]|\,|\+|\-|\*|\/|Enter|Delete|Backspace/)) {
    const button = document.querySelector(`button[data-key='${key}']`);
    if (button) {
      button.click();
    }
  } else if (key === "Enter") {
    const calculateBtn = document.querySelector(
      `button[data-action='calculate']`
    );
    calculateBtn.click();
  } else if (key === "Delete") {
    const clearBtn = document.querySelector(`button[data-action='clear']`);
    clearBtn.click();
  } else if (key === "Backspace") {
    const clearOneBtn = document.querySelector(
      `button[data-action='clearOne']`
    );
    clearOneBtn.click();
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
    if (firstNum === 0 && secondNum === 0) {
      return (result = "undefined");
    }
    result = firstNum / secondNum;
  } else if (operator === "multiply") {
    result = firstNum * secondNum;
  }
  return result;
};
