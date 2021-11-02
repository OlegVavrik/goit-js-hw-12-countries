import countryMarkup from './template/country.hbs';
import { debounce } from 'lodash';
import fetchCountries from './fetchCountries'
import "@pnotify/core/dist/PNotify.css" 
import '@pnotify/core/dist/BrightTheme.css';
import { info, error } from '@pnotify/core';

const input = document.querySelector('.input');
const listUl = document.querySelector('.ul_list');
const markup = document.querySelector('.markup');

input.addEventListener('input', debounce(onInput, 500));

 
function onInput(e) {
	const userCountry = e.target.value;
	 fetchCountries(userCountry)
	 .then(renderMarkup)
	 .catch(fetchError);
 };
 
 function renderMarkup(data) {

	 if (data.length === 1) {
			return (markup.innerHTML = countryMarkup(data[0]));
		 }

		 if (data.length >= 10) {
			 fetchError(error,
				 'To many matches found. Please enter more specific query!');
			 return;
		 }

		 else {
			 fetchError(info,
				 'No matches found!');
		  }
		 }
	  
 function fetchError(typeInfo ,text) {
	listUl.innerHTML = ''
	typeInfo({
		text: `${text}`,
		delay: 500,
		closerHover: true,
	   animation: 'fade',
		animateSpeed: 'normal',
	   color: 'green',
	});
 }
//  jjjj



