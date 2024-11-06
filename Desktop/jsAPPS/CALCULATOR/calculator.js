const display = document.querySelector('.display');
let firstValue = '';
let operator = '';
let shouldResetScreen = false;

// Event listeners for buttons
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => handleButtonPress(button));
});

function handleButtonPress(button) {
  const action = button.getAttribute('data-action');

  if (isNumber(action)) {
    handleNumber(action);
  } else if (action === 'clear') {
    clear();
  } else if (action === 'plus-minus') {
    toggleSign();
  } else if (action === 'percent') {
    calculatePercent();
  } else if (action === 'decimal') {
    addDecimal();
  } else if (action === 'equals') {
    calculateResult();
  } else {
    handleOperator(action);
  }
  updateDisplay();
}

function isNumber(value) {
  return !isNaN(value);
}

function handleNumber(num) {
  if (shouldResetScreen) {
    display.textContent = num;
    shouldResetScreen = false;
  } else {
    display.textContent = display.textContent === '0' ? num : display.textContent + num;
  }
}

function handleOperator(op) {
  if (operator) calculateResult();
  firstValue = display.textContent;
  operator = op;
  shouldResetScreen = true;
}

function calculateResult() {
  let secondValue = display.textContent;
  let result;

  switch (operator) {
    case 'add':
      result = parseFloat(firstValue) + parseFloat(secondValue);
      break;
    case 'subtract':
      result = parseFloat(firstValue) - parseFloat(secondValue);
      break;
    case 'multiply':
      result = parseFloat(firstValue) * parseFloat(secondValue);
      break;
    case 'divide':
      result = parseFloat(firstValue) / parseFloat(secondValue);
      break;
    default:
      return;
  }
  display.textContent = result;
  operator = '';
  shouldResetScreen = true;
}

function clear() {
  display.textContent = '0';
  firstValue = '';
  operator = '';
}

function toggleSign() {
  display.textContent = (parseFloat(display.textContent) * -1).toString();
}

function calculatePercent() {
  display.textContent = (parseFloat(display.textContent) / 100).toString();
}

function addDecimal() {
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function updateDisplay() {
  display.textContent = display.textContent.slice(0, 12); // Limit display length
}
