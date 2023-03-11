class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  validate(sudoku) {
    // Parsing the input string into array and remove unnecessary symbols and blanks
    let board = sudoku
      .split("\n")
      .map(row =>
        row
          .replaceAll("-", "")
          .replaceAll("+", "")
          .replaceAll("|", "")
          .trim()
          .split(" ")
      )
      .filter(row => row.length > 0 && row.every(val => val !== ""));

    // Check if only numbers 0-9 are used
    let validNumbers = /^[0-9]$/;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!validNumbers.test(board[i][j])) {

          return "Sudoku is invalid.";
        }
      }
    }

    // Check if the sudoku is complete and count empty cells
    let emptyCells = 0;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] == 0) {
          emptyCells++;
        }
      }
    }

    // Scenario with empty cells
    if (!emptyCells) {
      // Check if the rows and columns are valid
      for (let col = 0; col < 9; col++) {
        let colSet = new Set();
        let rowSet = new Set();
        for (let row = 0; row < 9; row++) {
          colSet.add(board[row][col]);
          rowSet.add(board[row][col]);
        }
        if (colSet.size != 9 || rowSet.size != 9) {

          return "Sudoku is invalid.";
        }
      }

      // Check if the 3x3 boxes are valid
      for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
          let boxSet = new Set();
          for (let r = row; r < row + 3; r++) {
            for (let c = col; c < col + 3; c++) {
              boxSet.add(board[r][c]);
            }
          }
          if (boxSet.size != 9) {

            return "Sudoku is invalid.";
          }
        }
      }
    }

    // Check if the sudoku has 0 and is valid
    if (emptyCells !== 0) {
      // Check if the rows and columns are valid
      for (let row = 0; row < 9; row++) {
        let noZerosRowSet = new Set();
        let noZerosColSet = new Set();
        for (let col = 0; col < 9; col++) {
          if (board[row][col] != 0) {
            noZerosRowSet.add(board[row][col]);
            noZerosColSet.add(board[row][col]);
          }
        }
        let uniqueRowSet = new Set(noZerosRowSet);
        let uniqueColSet = new Set(noZerosColSet);
        if (JSON.stringify(uniqueRowSet) != JSON.stringify(noZerosRowSet) || JSON.stringify(uniqueColSet) != JSON.stringify(noZerosColSet)) {

          return "Sudoku is invalid.";
        }
      }

      // Check if the 3x3 boxes are valid
      for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
          let subgridSet = new Set();
          for (let r = row; r < row + 3; r++) {
            for (let c = col; c < col + 3; c++) {
              let value = board[r][c];
              if (value != 0) {
                if (subgridSet.has(value)) {

                  return "Sudoku is invalid.";
                } else {
                  subgridSet.add(value);
                }
              }
            }
          }
        }
      }

      return "Sudoku is valid but incomplete.";
    }

    // If all checks pass Sudoku must be valid
    return "Sudoku is valid.";
  }
}

module.exports = Validator