class Dog {
	constructor() {
		this.apiUrl = 'https://dog.ceo/api';
		this.imgElement = document.querySelector('.featured-dog img');
		this.bcgElement = document.querySelector('.featured-dog__background');
		this.tilesElement = document.querySelector('.tiles');
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

	addBreed(breed, subBreed) {
		let name;
		let type;
		if (typeof subBreed == 'undefined') {
			name = breed;
			type = breed;
		} else {
			name = `${breed} ${subBreed}`;
			type = `${breed}/${subBreed}`;
		}

		const tile = document.createElement('div');
		tile.classList.add('tiles__tile');
		const tileContent = document.createElement('div');
		tileContent.classList.add('tiles__tile-content');
		tileContent.innerText = name;
		tileContent.addEventListener('click', () => {
			this.getRandomDogImageByBreed(type).then((src) => {
				this.imgElement.setAttribute('src', src);
				this.bcgElement.style.background = `url("${src}")`;
			});
		});
		tile.appendChild(tileContent);
		this.tilesElement.appendChild(tile);
	}

	showAllBreeds() {
		this.fetchBreeds().then((breeds) => {
			for (const breed in breeds) {
				if (breeds[breed].length === 0) {
					this.addBreed(breed);
				} else {
					for (const subBreed of breeds[breed]) {
						this.addBreed(breed, subBreed);
					}
				}
			}
		});
	}
	init() {
		this.getRandomDogImage().then((src) => {
			this.imgElement.setAttribute('src', src);
			this.bcgElement.style.background = `url("${src}")`;
		});
		this.showAllBreeds();
	}
}

document.addEventListener('DOMContentLoaded', () => new Dog());
