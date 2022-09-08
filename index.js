const gifBlock = document.querySelector('.gif-block'),
	input = document.querySelector('input'),
	form = document.querySelector('form'),
	APIKEY = '5dgSNNvzyA27rpa7OWK3dTfFWrLKf4FA';

document.addEventListener('DOMContentLoaded', search);

function search() {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		getGif();
	});
}

async function getGif() {
	const searched = input.value.trim();

	try {
		const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${searched}
		&limit=5&offset=0&rating=g`;

		const response = await fetch(url);

		//получаем объект с data, pagination, meta
		const searchedData = await response.json();
		// нужно получить только data
		const gifData = searchedData.data;

		// если ничего не найдено
		if (searchedData.data.length === 0) {
			gifBlock.innerHTML = `
				<div>Ничего не найдено</div>
			`;
			setTimeout(() => {
				gifBlock.innerHTML = '';
			}, 3000);
		}

		// перебираем каждый элемент data
		gifData.forEach(item => {
			const gifItem = document.createElement('div'),
				img = document.createElement('img'),
				title = document.createElement('h2');

			img.classList.add('gif-block__img');

			gifBlock.append(gifItem);
			gifItem.append(title);
			gifItem.append(img);

			img.src = item.images.downsized.url;
			img.alt = item.title;
			title.textContent = item.title;
		});

		input.value = '';
	} catch (err) {
		console.error(err);
		gifBlock.innerHTML = `
		<div>Сервер не доступен. Попробуйте зайти позже</div>
		`;
	}
}