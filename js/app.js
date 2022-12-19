function fetchBreeds() {
	return fetch('https://dog.ceo/api/breeds/list/all')
		.then((resp) => resp.json())
		.then((data) => {
			return data.message;
		});
}
fetchBreeds().then((messageAsBreeds) => console.log(messageAsBreeds));

function getRandomDogImage() {
	return fetch('https://dog.ceo/api/breeds/image/random')
		.then((resp) => resp.json())
		.then((data) => data.message);
}

const exampleImg = document.querySelector('img');

function getRandomDogImageByBreed(breed) {
	return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
		.then((resp) => resp.json())
		.then((data) => data.message);
}

getRandomDogImageByBreed('boxer').then((src) => exampleImg.setAttribute('src', src));
