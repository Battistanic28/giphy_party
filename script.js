// Global constants
const submitForm = document.querySelector('#inputsForm');
const searchButton = document.querySelector('.searchBtn');
const resetButton = document.querySelector('.resetBtn');
const displayDiv = document.querySelector('.results');

// Event Listeners
searchButton.addEventListener('click', handleClick);
resetButton.addEventListener('click', reset);

// Handle Click
async function handleClick(e) {
	e.preventDefault();
	// get value from textInput
	const api = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC';
	const searchCriteria = document.querySelector('.textInput').value;

	const gif = await getGif(api, searchCriteria);
	// create new image element
	const newImg = document.createElement('img');
	newImg.classList.add(searchCriteria);
	newImg.classList.add('m-2');
	newImg.src = gif;
	displayDiv.append(newImg);
	// append new image to page
	document.querySelector('.textInput').value = '';
}

async function getGif(api, searchCriteria) {
	let response = await axios.get(`${api}&q=${searchCriteria}`);
	let responseData = response.data.data;
	let random = Math.floor(Math.random() * responseData.length);
	let gif = responseData[random].images.original.url;
	return gif;
}

// Reset results
function reset() {
	while (displayDiv.lastElementChild) {
		displayDiv.removeChild(displayDiv.lastElementChild);
	}
}
