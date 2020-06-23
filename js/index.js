'use strict';

const covidInfo = "https://api.covid19api.com/summary";
var cbxCountries;

window.addEventListener("load", function(){
	start();
});

function start(){
	showPage();
	getDom();
	fetchInfo();
}

function getDom(){
	cbxCountries = document.querySelector("#countryPicker");
}

function fetchInfo(){
	getCovidInfo()
	.then(data => data.json())
	.then(data => {
		console.log(data);
	})
	.catch(e => {
		console.log(e);
	});
}

function fillCbx(){
	
}

function showPage(){
	document.querySelector("#carga").className += "fade";	
}

function getCovidInfo(){
	return fetch(covidInfo);
}


