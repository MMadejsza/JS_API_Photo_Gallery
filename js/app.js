class Dog {
	constructor() {
		this.apiUrl = 'https://dog.ceo/api';
		this.imgElement = document.querySelector('.featured-dog img');
		this.bcgElement = document.querySelector('.featured-dog__background');
		this.tilesElement = document.querySelector('.tiles');
		this.spinnerElement = document.querySelector('.spinner');
		this.init();
	}

	showLoading() {
		this.spinnerElement.classList.add('spinner--visible');
	}
	hideLoading() {
		this.spinnerElement.classList.remove('spinner--visible');
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

	getRandomDogImageOfBreed(breed) {
		return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
			.then((resp) => resp.json())
			.then((data) => data.message);
	}

	showImgWhenReady(imgSrc) {
		this.imgElement.setAttribute('src', imgSrc);
		this.bcgElement.style.background = `url("${imgSrc}")`;
		this.hideLoading();
	}

	addBreedTile(breed, subBreed) {
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
			window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
			this.showLoading();
			this.getRandomDogImageOfBreed(type).then((receivedSrc) =>
				this.showImgWhenReady(receivedSrc),
			);
		});
		tile.appendChild(tileContent);
		this.tilesElement.appendChild(tile);
	}

	displayAllBreedsTiles() {
		this.fetchBreeds().then((breeds) => {
			for (const breed in breeds) {
				if (breeds[breed].length === 0) {
					this.addBreedTile(breed);
				} else {
					for (const subBreed of breeds[breed]) {
						this.addBreedTile(breed, subBreed);
					}
				}
			}
		});
	}
	init() {
		this.showLoading();
		this.getRandomDogImage().then((receivedSrc) => this.showImgWhenReady(receivedSrc));
		this.displayAllBreedsTiles();
	}
}

document.addEventListener('DOMContentLoaded', () => new Dog());
