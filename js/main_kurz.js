// fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function(result) {
//     return result.json()
// }).then(function(data) {

// })

let exchange = {};
let elementUSD = document.querySelector('[data-value="USD"]');
let elementEUR = document.querySelector('[data-value="EUR"]');
let elementGBP = document.querySelector('[data-value="GBP"]');

let input = document.querySelector('#input');
let result = document.querySelector('#result');
let select = document.querySelector('#select');

getCurrencies();
setInterval(getCurrencies, 10000);

async function getCurrencies() {
    let responce = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    let data = await responce.json();
    let result = await data;

    // console.log(result.Valute.USD.Value);

    exchange.USD = result.Valute.USD;
    exchange.EUR = result.Valute.EUR;
    exchange.GBP = result.Valute.GBP;

    elementUSD.textContent = exchange.USD.Value.toFixed(2);
    elementEUR.textContent = exchange.EUR.Value.toFixed(2);
    elementGBP.textContent = exchange.GBP.Value.toFixed(2);

    if(exchange.USD.Value > exchange.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('bottom');
    }

    if(exchange.EUR.Value > exchange.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }

    if(exchange.GBP.Value > exchange.GBP.Previous) {
        elementGBP.classList.add('top');
    } else {
        elementGBP.classList.add('bottom');
    }
};

input.oninput = convertValue;
select.oninput = convertValue;

function convertValue() {
    result.value = (parseFloat(input.value) / exchange[select.value].Value).toFixed(2);
};
