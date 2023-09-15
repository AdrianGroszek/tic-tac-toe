'use strict';

const gameBoard = document.querySelector('.game-board');
const playerDisplay = document.querySelector('.player-turn');
const startCells = ['', '', '', '', '', '', '', '', ''];

let go = 'circle';
playerDisplay.textContent = `${go} goes first`;

const createFields = function () {
	startCells.forEach((_cell, id) => {
		const fieldEl = document.createElement('div');
		fieldEl.classList.add('square');
		fieldEl.id = id;
		gameBoard.append(fieldEl);

		fieldEl.addEventListener('click', addGo);
	});
};

const addGo = function (e) {
	const goDisplay = document.createElement('div');
	goDisplay.classList.add(go);
	e.target.append(goDisplay);
	go = go === 'circle' ? 'cross' : 'circle';

	if (go === 'circle') {
		playerDisplay.classList.remove('cross-turn');
		playerDisplay.classList.add('circle-turn');
	}

	if (go === 'cross') {
		playerDisplay.classList.remove('circle-turn');
		playerDisplay.classList.add('cross-turn');
	}

	playerDisplay.textContent = `It is now ${go}'s go.`;
	e.target.removeEventListener('click', addGo);
	checkIsWins();
};

const checkIsWins = function () {
	const allSquares = document.querySelectorAll('.square');

	const winRules = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	winRules.forEach((arr) => {
		const circleWins = arr.every((cell) =>
			allSquares[cell].firstChild?.classList.contains('circle')
		);

		if (circleWins) {
			playerDisplay.textContent = 'Circle Wins!';
			allSquares.forEach((square) =>
				square.replaceWith(square.cloneNode(true))
			);
			playerDisplay.classList.remove('cross-turn');
			playerDisplay.classList.add('circle-turn');
			return;
		}
	});

	winRules.forEach((arr) => {
		const crossWins = arr.every((cell) =>
			allSquares[cell].firstChild?.classList.contains('cross')
		);

		if (crossWins) {
			playerDisplay.textContent = 'Cross Wins!';
			allSquares.forEach((square) =>
				square.replaceWith(square.cloneNode(true))
			);
			playerDisplay.classList.remove('circle-turn');
			playerDisplay.classList.add('cross-turn');
			return;
		}
	});
};

createFields();
