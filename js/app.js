class Dog {
	constructor() {
		this.apiUrl = 'https://dog.ceo/api';
	}

	fetchBreeds() {
		return fetch(`${this.apiUrl}/breeds/list/all`)
			.then((resp) => resp.json())
			.then((data) => {
				return data.message;
			});
	}

	getRandomDogImage() {
		return fetch(`${this.apiUrl}/api/breeds/image/random`)
			.then((resp) => resp.json())
			.then((data) => data.message);
	}

	getRandomDogImageByBreed(breed) {
		return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
			.then((resp) => resp.json())
			.then((data) => data.message);
	}
}
