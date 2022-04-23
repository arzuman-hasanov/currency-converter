let input = document.querySelector(".inputSection input");
let output = document.querySelector(".outputSection input");

// buttons from currency
let fromButtons = document.querySelectorAll(".fromButtons li");

// buttons to currency
let toButtons = document.querySelectorAll(".toButtons li");

// first info
let fromInfo = document.querySelector(".inputSection span");

// second info
let toInfo = document.querySelector(".outputSection span");

// alert message selection
let alert = document.querySelector(".alert");

let currencyFROM = "RUB";
let currencyTO = "USD";

fetch(
  `https://api.exchangerate.host/latest?base=${currencyFROM}&symbols=${currencyTO}`
)
  .then((res) => res.json())
  .then((data) => {
    input.addEventListener("keyup", (e) => {
      input.value = e.target.value;
      input.value = input.value.split(",").join(".");

      if (isNaN(input.value)) {
        output.value = "";
        alert.style.display = "block";
      } else {
        output.value = input.value * data.rates[currencyTO];
        alert.style.display = "none";
      }
    });
    output.value = input.value * data.rates[currencyTO];
  });

fromButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    fromButtons.forEach((item) => {
      item.classList.remove("selected");
    });
    currencyFROM = e.target.innerHTML;
    fetch(
      `https://api.exchangerate.host/latest?base=${currencyFROM}&symbols=${currencyTO}`
    )
      .then((res) => res.json())
      .then((data) => {
        fromInfo.innerHTML = `1 ${currencyFROM} = ${data.rates[currencyTO]} ${currencyTO}`;
        if (isNaN(input.value)) {
          output.value = "";
          alert.style.display = "block";
        } else {
          output.value = input.value * data.rates[currencyTO];
          alert.style.display = "none";
        }
        input.addEventListener("keyup", (e) => {
          input.value = e.target.value;
          input.value = input.value.split(",").join(".");
          output.value = input.value * data.rates[currencyTO];
        });
      });

    fetch(
      `https://api.exchangerate.host/latest?base=${currencyTO}&symbols=${currencyFROM}`
    )
      .then((res) => res.json())
      .then((data) => {
        toInfo.innerHTML = `1 ${currencyTO} = ${data.rates[currencyFROM]} ${currencyFROM}`;
      });

    e.target.classList.add("selected");
  });
});

toButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    toButtons.forEach((item) => {
      item.classList.remove("selected");
    });

    currencyTO = e.target.innerHTML;
    fetch(
      `https://api.exchangerate.host/latest?base=${currencyFROM}&symbols=${currencyTO}`
    )
      .then((res) => res.json())
      .then((data) => {
        fromInfo.innerHTML = `1 ${currencyFROM} = ${data.rates[currencyTO]} ${currencyTO}`;
        if (isNaN(input.value)) {
          output.value = "";
          alert.style.display = "block";
        } else {
          output.value = input.value * data.rates[currencyTO];
          alert.style.display = "none";
        }
        input.addEventListener("keyup", (e) => {
          input.value = e.target.value;
          input.value = input.value.split(",").join(".");
          output.value = input.value * data.rates[currencyTO];
        });
      });

    fetch(
      `https://api.exchangerate.host/latest?base=${currencyTO}&symbols=${currencyFROM}`
    )
      .then((res) => res.json())
      .then((data) => {
        toInfo.innerHTML = `1 ${currencyTO} = ${data.rates[currencyFROM]} ${currencyFROM}`;
      });

    e.target.classList.add("selected");
  });
});
