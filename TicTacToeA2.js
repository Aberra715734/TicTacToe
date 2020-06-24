/* Abdu Aberra */

const message = document.getElementById(`message`);

const overlay = document.getElementById(`overlay`);

// TODO document this

const board = document.getElementsByTagName("td");
// Create an array that contain 9 elements that correspond to td elements.
// assuming we index the 9 tic tac toe cells from left to right, top to
// bottom, as 0-8, these would be all of the winning combinations:

const winSets = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const winner = document.getElementById("winner");

// X always gets to go first
let player = "X";

// keep track of how many cells are empty at any time
let empty = board.length;

// keep track of game status - false if still playing
let gameOver = false;

/*
There's 2 types of functions in JavaScript, old "function"s and arrow functions

// this is arguably the worst, it is "hoisted" without you knowing.
function foo() {
	..code..

	return (value);
}

// this is declared right here, not earlier, not later, but this is known as an anonymous function as it doesn't have a name, but the variable does have a name
const foo = function() {
	..code..

	return (value);
}

// this is the shorter version that is also declared right here, and acts different regarding it's "this" value
const foo = () => {
	..code..

	return (value);
};

it can also be used to directly return a value:

const foo = () => (value);

So, a simple square function can be written 2 different ways:
function square(x) {
	return x * x;
}
or quite simply
const square = x => x * x;
*/

/* Function resetGame() is called when user clicks on the "game reset" button
 1. sets content of all 9 cells to nothing
 2. sets the starting player (this version, X always starts the game)
 3. updates the message to the current player
 4. resets the number of empty cells to 9
 5. sets the game over flag to false to indicate that the game is in progress
*/

const resetGame = () => {
	// TODO: document this code from class
	//makes the number disappear
	for(const element of board) {
		element.innerText = "";
	}

	// TODO reset player back to X and update it on the page

	// TODO reset gameOver and # of empty cells
	gameOver = true;
	empty = 9;
};

// attaches an event listener that waits for the user to click the tag, upon being clicked, clears the game board
message.addEventListener(`mouseup`, resetGame);

// displays the results window with the winner inside it: the method will
// either show the results or hide them (displayWin(true) shows and 
// displayWin(false) hides)
const displayWin = show => {
	overlay.style.display =
	message.style.display = show ?
		"initial" :
		"none";
};

// Function checkWin() is called to check all winning combinations and display results
const checkWin = () => {

	// TODO: document all of the code from class
	for (const winSet of winSets) {

		// Here, since we use winSet[0-2] more than once, we should be using a variable
		const tableSetZero = board[winSet[0]].innerText;
		const tableSetOne = board[winSet[1]].innerText;
		const tableSetTwo = board[winSet[2]].innerText;

		if(
			tableSetZero === tableSetOne
			&& tableSetOne === tableSetTwo
			&& tableSetZero !== ""
		) {
			gameOver = true;

			//if any of these algorithm matches as the one above, X wins
			if(
				tableSetZero === "X"
				|| tableSetOne === "X"
				|| tableSetTwo === "X"
			) {
				winner.innerText = "X wins!";

			// if any of the winning algortihm matches, O wins
			} else if(
				tableSetZero === "O"
				|| tableSetOne === "O"
				|| tableSetTwo === "O"
			) {
				winner.innerText = "O wins!";
			}

			// - call displayWin(true) function
			displayWin(true);

			// - break out of this loop: no point in continuing
			break;
		}
	}

	// TODO: if there are no empty cells left and game is not yet over,
	//	   it means that there is no winner for this game
	// - set gameOver variable: game is now over  
	// - display "No one wins! :(" in the winner H3
	// - call displayWin(true) function
	// - If it a tie, then no one wins

	if(empty === 0 && gameOver === false) {
		gameOver = true;
		winner.innerText = "No one wins!";
		displayWin(true);
	}
};

/* Function cellClicked() is called
 when the event listeners for the "td" cells fire which occurs
 when the user clicks on one of the nine cells of the board
 1. decreases # of empty cells by 1
 2. sets the content of the clicked cell to the current player's mark
 3. checks whether or not there is a winner
 4. flips (changes) the current player
 5. updates the message to the current player
*/

const displayedPlayer = document.getElementById("player");

const cellClicked = cell => {

	//TODO: 1-5 should occur only when the selected cell is empty and the game is 

	if(cell.innerText !== "")
		return; // exit early if the element already has X or O

	// TODO: decrease # of empty cells by 1

	//TODO: document this code from class
	--empty;

	cell.innerText = player;

	checkWin();

	// Changes the current player from X to O and vice versa
	player = player === "X"
		? "O"
		: "X";

	displayedPlayer.innerText = player;
};

/* Enhancements you can try:
- highlight (change background colour) of the cell that was just clicked to indicate that it was the last move; make sure it goes back to the regular background when the next user clicks
- make the starting player random
- keep track of statistics (how many times each player wins)
- hide the "Player X Go!" on startup; show it only while game is playing
- when a winner is determined, the player information still swaps: would be nice if it didn't (I would
automatically hide those things before the game starts and when it ends (Week 3))
- change the font colour of the winning combination (don't forget to change it back when the game is reset)
*/

// ==========================================================================
// DON'T TOUCH THESE LINES OF CODE  (we'll learn this stuff in a later lesson)

document.getElementById("reset")
.addEventListener("mouseup", resetGame);

message.addEventListener("click",
	displayWin.bind(null, false)
);

for(const tableSection of board) {
	tableSection.addEventListener("mouseup",
		cellClicked.bind(null, tableSection)
	);
}

// ================================================================