'use strict';

const covidInfo = "https://api.covid19api.com/summary";
var cbxCountries;
var covidData;
var gTotal, gNew, gDeaths, gRecovered;
var totalCases, newCases, totalDeaths, totalRecovered;

window.addEventListener("load", function(){
	start();
});

function start(){
	getDom();
	fetchInfo();
	initEvents();
}

function getDom(){
	cbxCountries = document.querySelector("#countryPicker");
	totalCases = document.querySelector("#total-cases");
	newCases = document.querySelector("#new-cases");
	totalDeaths = document.querySelector("#total-deaths");
	totalRecovered = document.querySelector("#total-recovered");
}

function fetchInfo(){
	getCovidInfo()
	.then(data => data.json())
	.then(data => {
		covidData = data;
		fillCbx(data.Countries);
		loadDefault(data.Countries);
	})
	.catch(() => {
		alert("Error al conectar con la base de datos");
	});
}

function loadDefault(data){
	gTotal = covidData.Global.TotalConfirmed;
    gNew = covidData.Global.NewConfirmed;
    gDeaths = covidData.Global.TotalDeaths;
    gRecovered = covidData.Global.TotalRecovered;

    totalCases.innerHTML = formatNumber(gTotal);
    newCases.innerHTML = formatNumber(gNew);
    totalDeaths.innerHTML = formatNumber(gDeaths);
    totalRecovered.innerHTML = formatNumber(gRecovered);
	
	covidData = data;
	showPage();
}

function initEvents(){
	cbxCountries.addEventListener("change", function(){
		setValues(this.value);
	});
}

function formatNumber(num){
	return new Intl.NumberFormat().format(num);
}

function fillCbx(data){
	data.forEach((x, i) => {
		cbxCountries.innerHTML += `
			<option value=${i}>${x.Country}</option>
		`;
	});
}

function setValues(value){
	if(value == "default"){
		totalCases.innerHTML = formatNumber(gTotal);
		newCases.innerHTML = formatNumber(gNew);
		totalDeaths.innerHTML = formatNumber(gDeaths);
		totalRecovered.innerHTML = formatNumber(gRecovered);
    }else{
		setCountryValues(value);
    }
}

function setCountryValues(value){
	covidData.forEach((x, i) => {
		if(i == value){
			totalCases.innerHTML = x.TotalConfirmed;
            newCases.innerHTML = x.NewConfirmed;
            totalDeaths.innerHTML = x.TotalDeaths;
            totalRecovered.innerHTML = x.TotalRecovered;
		}
	});
}

function showPage(){
	document.querySelector("#carga").className += "fade";
	document.querySelector("#footer").className = "";
}

function getCovidInfo(){
	return fetch(covidInfo);
}


