'use strict';

const covidInfo = "https://api.covid19api.com/summary";
var cbxCountries;
var covidData;

window.addEventListener("load", function(){
	start();
});

function start(){
	getDom();
	fetchInfo();
	showPage();
}

function getDom(){
	cbxCountries = document.querySelector("#countryPicker");
}

function fetchInfo(){
	getCovidInfo()
	.then(data => data.json())
	.then(data => {
		covidData = data;
		console.log(covidData);
		fillCbx(data.Countries);
	})
	.catch(e => {
		alert("Error al conectar con la base de datos");
	});
}

function fillCbx(data){
	data.forEach((x, i) => {
		cbxCountries.innerHTML += `
			<option value=${i}>${x.Country}</option>
		`;
	});
}

function showPage(){
	document.querySelector("#carga").className += "fade";	
}

function getCovidInfo(){
	return fetch(covidInfo);
}


