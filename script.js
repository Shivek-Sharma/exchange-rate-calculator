const currencyEl1 = document.getElementById('currency-one');
const currencyEl2 = document.getElementById('currency-two');
const amountEl1 = document.getElementById('amount-one');
const amountEl2 = document.getElementById('amount-two');
const swapEl = document.getElementById('swap');
const rateEl = document.getElementById('rate');

calculate();

function calculate() {
    const currency1 = currencyEl1.value;
    const currency2 = currencyEl2.value;

    //GET request to fetch data from API
    fetch(`https://v6.exchangerate-api.com/v6/ac77d4dbcab134ef1afdadba/latest/${currency1}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            const rate = data.conversion_rates[currency2];

            rateEl.innerHTML = `1 ${currency1} = ${rate} ${currency2}`;
            amountEl2.value = (amountEl1.value * rate).toFixed(2);
        });
}

//Event Listeners
currencyEl1.addEventListener('change', calculate);
currencyEl2.addEventListener('change', calculate);
amountEl1.addEventListener('input', calculate);
amountEl2.addEventListener('input', calculate);

swapEl.addEventListener('click', () => {
    const temp = currencyEl1.value;
    currencyEl1.value = currencyEl2.value;
    currencyEl2.value = temp;

    calculate();
});