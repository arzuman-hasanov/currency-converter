let input1 = document.querySelector(".inputSection1 input");
let input2 = document.querySelector(".inputSection2 input");

let fromButtons = document.querySelectorAll(".fromButtons li");
let toButtons = document.querySelectorAll(".toButtons li");

let fromInfo = document.querySelector(".inputSection1 span");
let toInfo = document.querySelector(".inputSection2 span");

let alert = document.querySelector(".alert");

let menuBtn = document.querySelector(".menuBtn");
let dropDownMenu = document.querySelector(".sidebar");
let closeDropDown = document.querySelector(".close");

menuBtn.addEventListener("click", (e) => {
  e.target.style.display = "none";
  dropDownMenu.style.left = 0;
});

closeDropDown.addEventListener("click", () => {
  menuBtn.style.display = "block";
  dropDownMenu.style.left = -100 + "%";
});

let currencyFROM = "RUB";
let currencyTO = "USD";

currencyFrom();

fromButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
      fromButtons.forEach((item) => {
        item.classList.remove("selected");
      });
      currencyFROM = e.target.innerHTML;
      currencyFrom();
      currencyTo();

      e.target.classList.add("selected");
    });
});

toButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
      toButtons.forEach((item) => {
        item.classList.remove("selected");
      });
      currencyTO = e.target.innerHTML;
      currencyFrom();
      currencyTo();

      e.target.classList.add("selected");
    });
});

function currencyFrom() {
  fetch(
    `https://api.exchangerate.host/latest?base=${currencyFROM}&symbols=${currencyTO}`
  )
    .then((res) => res.json())
    .then((data) => {
        fromInfo.innerHTML = `1 ${currencyFROM} = ${data.rates[currencyTO]} ${currencyTO}`;
        if (isNaN(input1.value)) {
          input2.value = "";
          alert.style.display = "block";
        } else {
          input2.value = (input1.value * data.rates[currencyTO]).toFixed(2);
          alert.style.display = "none";
        }

        input1.addEventListener("keyup", (e) => {
          input1.value = e.target.value;
          input1.value = input1.value.split(",").join(".");
          
          if (isNaN(input1.value)) {
            input2.value = "";
            alert.style.display = "block";
          } else {
            input2.value = (input1.value * data.rates[currencyTO]).toFixed(2);
            alert.style.display = "none";
          }
        });
    });
}

function currencyTo() {
  fetch(
    `https://api.exchangerate.host/latest?base=${currencyTO}&symbols=${currencyFROM}`
  )
    .then((res) => res.json())
    .then((data) => {
      toInfo.innerHTML = `1 ${currencyTO} = ${data.rates[currencyFROM]} ${currencyFROM}`;

      input2.addEventListener("keyup", (e) => {
        input2.value = e.target.value;
        input2.value = input2.value.split(",").join(".");

        if (isNaN(input2.value)) {
          input1.value = "";
          alert.style.display = "block";
        } else {
          input1.value = (input2.value * data.rates[currencyFROM]).toFixed(2);
          alert.style.display = "none";
        }
      });
    });
}

fetch(
  `https://api.exchangerate.host/latest?base=${currencyTO}&symbols=${currencyFROM}`
)
  .then((res) => res.json())
  .then((data) => {
      fromInfo.innerHTML = `1 ${currencyTO} = ${data.rates[currencyFROM]} ${currencyFROM}`;
      if (isNaN(input2.value)) {
        input1.value = "";
        alert.style.display = "block";
      } else {
        input1.value = (input2.value * data.rates[currencyFROM]).toFixed(2);
        alert.style.display = "none";
      }

      input2.addEventListener("keyup", (e) => {
        input2.value = e.target.value;
        input2.value = input2.value.split(",").join(".");

        if (isNaN(input2.value)) {
          input1.value = "";
          alert.style.display = "block";
        } else {
          input1.value = (input2.value * data.rates[currencyFROM]).toFixed(2);
          alert.style.display = "none";
        }
    });
  });
