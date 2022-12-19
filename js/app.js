function fetchBreeds() {
	return fetch('https://dog.ceo/api/breeds/list/all')
		.then((resp) => resp.json())
		.then((data) => {
			return data.message;
		});
}
fetchBreeds().then((messageAsBreeds) => console.log(messageAsBreeds));
