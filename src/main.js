import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function () {
  $('#weatherLocation').click(function () {
    const city = $('#location').val();
    $('#location').val("");
    const zip = $('#zip').val();
    $('#zip').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    let zipRequest = new XMLHttpRequest();
    const zipUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${process.env.API_KEY}`;

    zipRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    zipRequest.open("GET", zipUrl, true);
    zipRequest.send();

    function getElements(response) {
      const degreesFahrenheit = Math.round((response.main.temp - 273.15) * 9/5 + 32);
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${degreesFahrenheit} degrees.`);
    }
  });
});

