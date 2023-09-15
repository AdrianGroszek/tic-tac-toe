'use strict';
const playAgainBtn = document.querySelector('.play-again-btn');
const resetScoreBtn = document.querySelector('.reset-btn');

const circleScoreDisplay = document.querySelector('.circle-score');
const crossScoreDisplay = document.querySelector('.cross-score');
const activePlayerCircle = document.querySelector('.score-box-circle');
const activePlayerCross = document.querySelector('.score-box-cross');

const gameBoard = document.querySelector('.game-board');
const playerDisplay = document.querySelector('.player-turn');
const startCells = ['', '', '', '', '', '', '', '', ''];

let circleScore = 0;
let crossScore = 0;
let count = 0;
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
		activePlayerCross.classList.remove('move');
		activePlayerCircle.classList.add('move');
	}

	if (go === 'cross') {
		playerDisplay.classList.remove('circle-turn');
		playerDisplay.classList.add('cross-turn');
		activePlayerCross.classList.add('move');
		activePlayerCircle.classList.remove('move');
	}

	playerDisplay.textContent = `It is now ${go}'s go.`;
	e.target.removeEventListener('click', addGo);
	checkIsWins();
};

const checkIsWins = function () {
	count++;

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
			count = 0;
			circleScore++;
			circleScoreDisplay.textContent = `${circleScore.toString()}`;
			activePlayerCircle.classList.remove('move');
			activePlayerCross.classList.remove('move');
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
			count = 0;
			crossScore++;
			crossScoreDisplay.textContent = `${crossScore.toString()}`;
			activePlayerCircle.classList.remove('move');
			activePlayerCross.classList.remove('move');
			return;
		}
	});

	if (
		count === 9 &&
		(playerDisplay.textContent !== 'Cross Wins!' ||
			playerDisplay.textContent !== 'circle Wins!')
	) {
		playerDisplay.textContent = 'Draw! Play Again!';
		count = 0;
		activePlayerCircle.classList.remove('move');
		activePlayerCross.classList.remove('move');
	}
};

const playAgain = function () {
	gameBoard.innerHTML = '';
	go = 'circle';
	count = 0;
	playerDisplay.textContent = `${go} goes first`;
	playerDisplay.classList.add('circle-turn');
	playerDisplay.classList.remove('cross-turn');
	activePlayerCircle.classList.add('move');
	activePlayerCross.classList.remove('move');
	createFields();
};

const resetScore = function () {
	circleScore = 0;
	crossScore = 0;
	circleScoreDisplay.textContent = `${circleScore.toString()}`;
	crossScoreDisplay.textContent = `${crossScore.toString()}`;
	playAgain();
};

createFields();

playAgainBtn.addEventListener('click', playAgain);
resetScoreBtn.addEventListener('click', resetScore);
