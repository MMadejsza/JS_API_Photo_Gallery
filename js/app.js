class Dog {
	//- When instantiating:
	constructor() {
		// assign repeatable url:
		this.apiUrl = 'https://dog.ceo/api';
		// fetch elements from DOM to work with:
		this.imgElement = document.querySelector('.featured-dog img');
		this.bcgElement = document.querySelector('.featured-dog__background');
		this.dogDescriptionElement = document.querySelector('.featured-dog__description p');
		this.tilesElement = document.querySelector('.tiles');
		this.spinnerElement = document.querySelector('.spinner');
		// call initializing function - straight away
		this.init();
	}

	showLoading() {
		// add to existing hidden overlay, class to reveal it with animation:
		this.spinnerElement.classList.add('spinner--visible');
	}
	hideLoading() {
		// remove to working overlay, class to hide it:
		this.spinnerElement.classList.remove('spinner--visible');
	}

	fetchBreeds() {
		// fetch list of all breads:
		return (
			fetch(`${this.apiUrl}/breeds/list/all`)
				// response transform to json:
				.then((resp) => resp.json())
				// return from this json proper content specifically named "message":
				.then((data) => {
					return data.message;
				})
		);
	}

	getRandomDogImage() {
		// fetch random dog image url from server:
		return (
			fetch(`${this.apiUrl}/breeds/image/random`)
				// response to json:
				.then((resp) => resp.json())
				// extract pure url
				.then((data) => data.message)
		);
	}

	getRandomDogImageOfBreed(breed) {
		// fetch random dog image url of chosen breed from server:
		return (
			fetch(`${this.apiUrl}/breed/${breed}/images/random`)
				// response to json:
				.then((resp) => resp.json())
				// extract pure url
				.then((data) => data.message)
		);
	}

	showImgWhenReady(imgSrc) {
		// passed url insert into existing fetched element as attribute
		this.imgElement.setAttribute('src', imgSrc);
		// insert this image again to background to blur behind:
		this.bcgElement.style.background = `url("${imgSrc}")`;
		// when shown, hide loading logo:
		this.hideLoading();
	}

	addBreedTile(breed, subBreed) {
		// passed breed name and eventually subbreed
		let name;
		let type;
		// if subbreed isn't passed/doesn't exist:
		if (typeof subBreed == 'undefined') {
			// assign received names to variables with getting 1st letter capital:
			name = breed.charAt(0).toUpperCase() + breed.slice(1);
			type = breed;
		} else {
			// if there is subbreed, capitalize only named which is displayed:
			name = `${breed.charAt(0).toUpperCase() + breed.slice(1)} ${
				subBreed.charAt(0).toUpperCase() + subBreed.slice(1)
			}`;
			// type not capitalized as it goes into url string:
			type = `${breed}/${subBreed}`;
		}

		// create div:
		const tile = document.createElement('div');
		// give it class name already styled in css:
		tile.classList.add('tiles__tile');
		// create next div with content:
		const tileContent = document.createElement('div');
		// give it class name already styled in css:
		tileContent.classList.add('tiles__tile-content');
		// insert content from server - breed name (if subbreed - with it):
		tileContent.innerText = name;
		// give listener:
		tileContent.addEventListener('click', () => {
			// on click scroll to top:
			window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
			// show loading logo:
			this.showLoading();
			// show photo of clicked breed
			this.getRandomDogImageOfBreed(type).then((receivedSrc) =>
				this.showImgWhenReady(receivedSrc),
			);
			// generate description inserting chosen breed name
			this.dogDescriptionElement.innerHTML = `<p>Chosen breed: <span>${name}</span></p>`;
		});
		// tile content into tile:
		tile.appendChild(tileContent);
		// tile into DOM element:
		this.tilesElement.appendChild(tile);
	}

	displayAllBreedsTiles() {
		// extracted list as promise put into loop:
		this.fetchBreeds().then((breeds) => {
			// for each breed name check:
			for (const breed in breeds) {
				// if it has only breed (it is not array of subbreeds):
				if (breeds[breed].length === 0) {
					// insert to DOM this name as a tile:
					this.addBreedTile(breed);
				} else {
					// it has subbreed:
					for (const subBreed of breeds[breed]) {
						this.addBreedTile(breed, subBreed);
					}
				}
			}
		});
	}
	init() {
		// When loading:
		this.showLoading(); // ... logo
		// fetch some dog image url and -> show it = insert url to DOM elements:
		this.getRandomDogImage().then((receivedSrc) => this.showImgWhenReady(receivedSrc));
		// display fetched breeds names:
		this.displayAllBreedsTiles();
	}
}

// instantiating class which by init() start entire program:
document.addEventListener('DOMContentLoaded', () => new Dog());
