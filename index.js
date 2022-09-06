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
	try {
		const searched = input.value.trim();

		const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${searched}
		&limit=5&offset=0&rating=g`;

		const response = await fetch(url);

		//получаем объект с data, pagination, meta
		const searchedData = await response.json();
		console.log(searchedData);
		// нужно получить только data
		const gifData = searchedData.data;
		console.log(gifData);

		// если ничего не найдено
		if (searchedData.data.length === 0) {
			gifBlock.innerHTML = `
				<div>Ничего не найдено</div>
			`;
			setTimeout(() => {
				gifBlock.innerHTML = '';
			}, 3000);
		}

		// перебираем каждый элемент data (массив из 5 элементов)
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
		<div>Упс... Что-то пошло не так... Попробуйте зайти позже</div>
		`;
	}
}