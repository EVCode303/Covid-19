'use strict';

const countriesInfo = "countries.json";
const globalInfo = "https://covid2019-api.herokuapp.com/v2/total";
const countryQueryInfo = "https://covid2019-api.herokuapp.com/v2/country/";
var cbxCountries;
var totalCases, deaths, recovered, active;
var gCases, gDeaths, gRecovered, gActive;

window.addEventListener("load", function(){
	start();
});

function start(){
	getDom();
	promises();
}

function promises(){
	fetch(countriesInfo)
	.then(data => data.json())
	.then(data => {
		fillCbxCountries(data);
		return fetch(globalInfo);
	})
	.then(data => data.json())
	.then(data => {
		saveGlobalInfo(data.data);
		initEvent();
		showPage();
	})
	.catch(e => {
		alert("Error al conectar con los datos\n"+e);
	});
}

function initEvent(){
	cbxCountries.addEventListener("change", function(){
		if(this.value == "default"){
			printGlobalInfo();
		}else{
			fetchInfo(this.value);
		}
	});
}

function fetchInfo(value){
	fetch(countryQueryInfo+value)
	.then(info => info.json())
	.then(info => {
		try{
			totalCases.innerHTML = info.data.confirmed.toLocaleString();
            deaths.innerHTML = info.data.deaths.toLocaleString();
            active.innerHTML = info.data.active.toLocaleString();
            recovered.innerHTML = info.data.recovered.toLocaleString();
		}catch(e){
			alert("Información no encontrada");
		}
	})
	.catch(e => {
		alert("Error al mostrar la información");
	});
}

function fillCbxCountries(data){
	data.forEach((x) => {
		cbxCountries.innerHTML += `
			<option value=${x.code}>${x.name}</option>
		`;
	});
}

function getDom(){
	cbxCountries = document.querySelector("#countryPicker");
	totalCases = document.querySelector("#total-cases");
	deaths = document.querySelector("#deaths");
	recovered = document.querySelector("#recovered");
	active = document.querySelector("#actives");
}

function saveGlobalInfo(data){
	gCases = data.confirmed;
	gDeaths = data.deaths;
	gRecovered = data.recovered;
	gActive = data.active;
	
	printGlobalInfo();
}

function printGlobalInfo(){
	totalCases.innerHTML = gCases.toLocaleString();
	deaths.innerHTML = gDeaths.toLocaleString();
	recovered.innerHTML = gRecovered.toLocaleString();
	active.innerHTML = gActive.toLocaleString();
}

function showPage(){
	document.querySelector("#carga").className += "fade";
	document.querySelector("#footer").className = "";
	document.querySelector("body").className = "";
}