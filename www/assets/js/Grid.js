/***************************
Grid
***************************/

// Class Grid
function Grid(height, width) {
	this.height = height;
	this.width = width;
	this.checkMatrix = [];
	this.attachedCoinMatrix = [];

	// Initialize checkMatrix and attachedCoinMatrix filling them with 0s
	this.init = function() {
		for (var i = 0; i < this.height; i++) {
			this.checkMatrix[i] = [];
			this.attachedCoinMatrix[i] = [];
			for (var j = 0; j < this.width; j++) {
				this.checkMatrix[i][j] = 0;
				this.attachedCoinMatrix[i][j] = false;
			}
		}
	};

	// Update logical matrix
	this.update = function(row, col, playerN) {
		this.checkMatrix[row][col] = playerN;
	};

	// Check and return the right row
	this.findNext = function(j) {
		for (var i = this.height - 1; i >= 0; i--) if (this.checkMatrix[i][j] === 0) return i;
		return -1;
	};

	// Check if valid move
	this.valid = function(i, j) {
		return i < 0 || j < 0 || i >= this.height || j >= this.width ? -1 : this.checkMatrix[i][j];
	};

	// Check by rows
	this.checkRows = function() {
		for (var j = 0; j < this.height; j++)
			for (var i = 0; i < this.width; i++)
				if (
					this.valid(j, i) > 0 &&
					this.valid(j, i) === this.valid(j, i + 1) &&
					this.valid(j, i) === this.valid(j, i + 2) &&
					this.valid(j, i) === this.valid(j, i + 3)
				)
					return this.checkMatrix[j][i];
		return 0;
	};

	// Check by cols
	this.checkCols = function() {
		for (var j = 0; j < this.height; j++)
			for (var i = 0; i < this.width; i++)
				if (
					this.valid(j, i) &&
					this.valid(j, i) === this.valid(j + 1, i) &&
					this.valid(j, i) === this.valid(j + 2, i) &&
					this.valid(j, i) === this.valid(j + 3, i)
				)
					return this.checkMatrix[j][i];
		return 0;
	};

	// Check by diagonals
	this.checkDiags = function() {
		for (var j = 0; j < this.height; j++)
			for (var i = 0; i < this.width; i++)
				for (var k = -1; k <= 1; k += 2)
					if (
						this.valid(j, i) &&
						this.valid(j, i) === this.valid(j + k * 1, i + 1) &&
						this.valid(j, i) === this.valid(j + k * 2, i + 2) &&
						this.valid(j, i) === this.valid(j + k * 3, i + 3)
					)
						return this.checkMatrix[j][i];
		return 0;
	};

	// Check and return winner
	this.checkWinner = function() {
		// Rows
		var player = this.checkRows();
		if (player > 0) return player;

		// Columns
		player = this.checkCols();
		if (player > 0) return player;

		// Diagonals
		player = this.checkDiags();
		if (player > 0) return player;

		return 0;
	};

	// Check if game ended without a winner
	this.checkDrawMatch = function() {
		for (var j = 0; j < this.width; j++) if (this.attachedCoinMatrix[0][j] == false) return false;
		return true;
	};

	//Print logical matrix
	this.toString = function() {
		var gridView = '';

		for (var i = 0; i < this.height; i++) {
			for (var j = 0; j < this.width; j++) gridView += this.checkMatrix[i][j] + ' ';
			gridView += '\n';
		}
		return gridView;
	};

	// Print attachedCoinMatrix
	this.toStringAttached = function() {
		var gridView = '';

		for (var i = 0; i < this.height; i++) {
			for (var j = 0; j < this.width; j++) gridView += this.attachedCoinMatrix[i][j] + ' ';
			gridView += '\n';
		}
		return gridView;
	};
}
