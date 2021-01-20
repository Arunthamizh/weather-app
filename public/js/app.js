// const response  = require("express");

console.log('client js');
const weatherForm = document.querySelector('form');
const searchData = document.querySelector('input');
const message_1 = document.querySelector('#message-1');
const message_2 = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e) => {
    // Stop page refresh when submit the form 
    e.preventDefault();
    const searchValue = searchData.value;
    console.log(searchValue);
    message_1.innerHTML = "Loading ..."
    message_2.innerHTML = ""
    fetch('/weather?address='+searchValue).then((response) => {
        response.json().then((data) => {
            if (data.error) {
            return    message_1.innerHTML = data.error
                // return console.log('error', data.error);
            }
            message_1.innerHTML = data.location;
            message_2.innerHTML = data.forecast

        })
    })

}) 