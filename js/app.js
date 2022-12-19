class Dog {
	constructor() {
		this.apiUrl = 'https://dog.ceo/api';
		this.imgElement = document.querySelector('.featured__dog img');

		this.init();
	}

	fetchBreeds() {
		return fetch(`${this.apiUrl}/breeds/list/all`)
			.then((resp) => resp.json())
			.then((data) => {
				return data.message;
			});
	}

	getRandomDogImage() {
		return fetch(`${this.apiUrl}/breeds/image/random`)
			.then((resp) => resp.json())
			.then((data) => data.message);
	}

	getRandomDogImageByBreed(breed) {
		return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
			.then((resp) => resp.json())
			.then((data) => data.message);
	}

	init() {
		this.getRandomDogImage().then((src) => this.imgElement.setAttribute('src', src));
		this.fetchBreeds().then((breeds) => console.log(breeds));
	}
}

document.addEventListener('DOMContentLoaded', () => new Dog());
