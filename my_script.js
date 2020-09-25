const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const result = document.getElementById('result');
const display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(op) {
  let localOperationMemory = display.value;
  if(op.toString() == 'sqrt'){
	  if(localOperationMemory < 0)
	  {
		  display.value = 'Корень не извлекается';
	  }else{
			display.value = Math.sqrt(localOperationMemory);
	  }
  }else if(op == 'del'){
	  if(localOperationMemory.length <=1)
	  {
		  display.value = 0;
	  }else{
		  display.value = localOperationMemory.toString().substr(0,localOperationMemory.length - 1);
	  }
  }else if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  }else if(op == '1/x'){
	  display.value = 1/localOperationMemory;
  } else if(op == 'ln'){
	  display.value = Math.log(localOperationMemory);
  } else if(op == '+/-'){
	  display.value = -localOperationMemory;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += +localOperationMemory;
	  MemoryCurrentNumber = MemoryCurrentNumber.toFixed(6);
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= +localOperationMemory;
	  MemoryCurrentNumber = MemoryCurrentNumber.toFixed(6);
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= +localOperationMemory;
	  MemoryCurrentNumber = MemoryCurrentNumber.toFixed(6);
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= +localOperationMemory;
	  MemoryCurrentNumber = MemoryCurrentNumber.toFixed(6);
    }else if (MemoryPendingOperation === '^') {
      MemoryCurrentNumber  = Math.pow(MemoryCurrentNumber,localOperationMemory);
	  MemoryCurrentNumber = MemoryCurrentNumber.toFixed(6);
    }else {
      MemoryCurrentNumber = +localOperationMemory;
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  }
}

function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}
