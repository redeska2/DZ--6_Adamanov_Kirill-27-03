// Gmail Validation

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regex.test(email);
}
const emailInput = document.querySelector("#emailInput");
const form = document.querySelector(".form_gmail");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value;

  if (isValidEmail(email)) {
    alert("Email принят: валидный Gmail-адрес.");
  } else {
    alert("Email не принят: недопустимый Gmail-адрес.");
  }
});

const small = document.querySelector(".small");

let posX = 0;
let posY = 0;
let chek = false;
let chekup = false;

const move = () => {
  if (posX <= 440 && chek === false) {
    posX += 10;
    small.style.left = `${posX}px`;
    setTimeout(move, 40);
  } else if (posX >= 440 && posY <= 440) {
    posY += 10;
    small.style.top = `${posY}px`;
    setTimeout(move, 40);
  } else if (posX > 0 && posY >= 440) {
    chek = true;
    posX -= 10;
    small.style.left = `${posX}px`;
    setTimeout(move, 40);
  } else if (chekup === false && posY > 0) {
    if (posY === 10) chek = false;
    posY -= 10;
    small.style.top = `${posY}px`;
    setTimeout(move, 40);
  }
};

move();
// секундомер
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("ml-seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let startTime;
let elapsedTime = 0;
let timerInterval;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function displayTime() {
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  minutesDisplay.style.color = getRandomColor();
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
  secondsDisplay.style.color = getRandomColor();
  millisecondsDisplay.textContent = String(milliseconds).padStart(2, "0");
  millisecondsDisplay.style.color = getRandomColor();
}

startButton.addEventListener("click", function () {
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
      elapsedTime = Date.now() - startTime;
      displayTime();
    }, 10);
  }
});

stopButton.addEventListener("click", function () {
  if (startTime) {
    clearInterval(timerInterval);
    startTime = null;
  }
});

resetButton.addEventListener("click", function () {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  displayTime();
});

// обменник

const somElement = document.querySelector("#som");
const usdElement = document.querySelector("#usd");
const eurElement = document.querySelector("#euro");

const convert = (elem, target, target2, response) => {
  const amount = parseFloat(elem.value);

  if (isNaN(amount)) {
    target.value = "";
    target2.value = "";
  } else {
    if (elem === somElement) {
      target.value = (amount / response.dollar).toFixed(2);
      target2.value = (amount / response.euro).toFixed(2);
    } else if (elem === usdElement) {
      target.value = (amount * response.dollar).toFixed(2);
      target2.value = (amount * (response.dollar / response.euro)).toFixed(2);
    } else if (elem === eurElement) {
      target.value = (amount * response.euro).toFixed(2);
      target2.value = (amount * (response.euro / response.dollar)).toFixed(2);
    }
  }
};

const isNumberOrDot = (char) => {
  return /^\d|\.$/.test(char);
};

const clearInvalidInput = (input) => {
  const value = input.value;
  const isValid = /^[0-9.]+$/.test(value);
  if (!isValid) {
    input.value = "";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const request = new XMLHttpRequest();
  request.open("GET", "../data/home_works.json");
  request.setRequestHeader("Content-type", "application/json");
  request.send();

  request.onload = () => {
    if (request.status === 200) {
      const response = JSON.parse(request.response);

      somElement.addEventListener("input", () => {
        convert(somElement, usdElement, eurElement, response);
      });

      usdElement.addEventListener("input", () => {
        convert(usdElement, somElement, eurElement, response);
      });

      eurElement.addEventListener("input", () => {
        convert(eurElement, somElement, usdElement, response);
      });

      // Add blur event listener for each input to clear invalid values
      const inputs = document.querySelectorAll(".css");
      inputs.forEach((input) => {
        input.addEventListener("blur", () => {
          clearInvalidInput(input);
        });
      });
    } else {
      console.error("Error loading JSON file.");
    }
  };

  request.onerror = () => {
    console.error("Error sending request.");
  };
});
