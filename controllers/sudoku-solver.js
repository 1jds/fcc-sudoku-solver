class SudokuSolver {
  hasDuplicateStrings(obj) {
    console.log("LET'S SEE WHAT'S COMING IN HERE BABY!!: ", obj);
    let anyDuplicates = false;

    for (const property in obj) {
      let arr = obj[property];
      const seen = {};
      const arrLength = arr.length;
      for (let i = 0; i < arrLength; i++) {
        const currentString = arr[i];
        if (seen[currentString]) {
          anyDuplicates = true;
        }
        seen[currentString] = true;
      }
    }
    return anyDuplicates;
  }

  defineRowsColumnsRegions(str) {
    let rows = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };
    let columns = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };
    let regions = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        rows[i + 1][j] = str[i * 9 + j];
        columns[i + 1][j] = str[j * 9 + i];
      }
    }
    let k = 1;
    let m = 0;
    while (m < 63) {
      regions[k] = [
        str[m + 0],
        str[m + 1],
        str[m + 2],
        str[m + 9],
        str[m + 10],
        str[m + 11],
        str[m + 18],
        str[m + 19],
        str[m + 20],
      ];
      k++;
      if (m === 6 || m === 33) {
        m = m + 21;
      } else {
        m = m + 3;
      }
    }
    return { rows, columns, regions };
  }

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return 1;
    } else if (!/^[0-9.]+$/.test(puzzleString)) {
      return 2;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let newRowVal;
    switch (row) {
      case "A":
        newRowVal = 0;
        break;
      case "B":
        newRowVal = 1;
        break;
      case "C":
        newRowVal = 2;
        break;
      case "D":
        newRowVal = 3;
        break;
      case "E":
        newRowVal = 4;
        break;
      case "F":
        newRowVal = 5;
        break;
      case "G":
        newRowVal = 6;
        break;
      case "H":
        newRowVal = 7;
        break;
      case "I":
        newRowVal = 8;
        break;
    }
    let newColVal = column - 1;
    let sliceIndx = newRowVal * 9 + newColVal;
    let newStrLeft = puzzleString.slice(0, sliceIndx);
    let newStrRight = puzzleString.slice(sliceIndx + 1);
    let newStr = newStrLeft + value + newStrRight;
    const areas = this.defineRowsColumnsRegions(newStr);
    let targetRow = areas.rows[newRowVal + 1].filter((item) => item != ".");
    return this.hasDuplicateStrings({ [newRowVal + 1]: targetRow });
  }

  checkColPlacement(puzzleString, row, column, value) {
    let newRowVal;
    switch (row) {
      case "A":
        newRowVal = 0;
        break;
      case "B":
        newRowVal = 1;
        break;
      case "C":
        newRowVal = 2;
        break;
      case "D":
        newRowVal = 3;
        break;
      case "E":
        newRowVal = 4;
        break;
      case "F":
        newRowVal = 5;
        break;
      case "G":
        newRowVal = 6;
        break;
      case "H":
        newRowVal = 7;
        break;
      case "I":
        newRowVal = 8;
        break;
    }
    let newColVal = column - 1;
    let sliceIndx = newRowVal * 9 + newColVal;
    let newStrLeft = puzzleString.slice(0, sliceIndx);
    let newStrRight = puzzleString.slice(sliceIndx + 1);
    let newStr = newStrLeft + value + newStrRight;
    const areas = this.defineRowsColumnsRegions(newStr);
    let targetColumn = areas.columns[column].filter((item) => item != ".");
    return this.hasDuplicateStrings({ [column]: targetColumn });
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let newRowVal;
    switch (row) {
      case "A":
        newRowVal = 0;
        break;
      case "B":
        newRowVal = 1;
        break;
      case "C":
        newRowVal = 2;
        break;
      case "D":
        newRowVal = 3;
        break;
      case "E":
        newRowVal = 4;
        break;
      case "F":
        newRowVal = 5;
        break;
      case "G":
        newRowVal = 6;
        break;
      case "H":
        newRowVal = 7;
        break;
      case "I":
        newRowVal = 8;
        break;
    }
    let newColVal = column - 1;
    let sliceIndx = newRowVal * 9 + newColVal;
    let newStrLeft = puzzleString.slice(0, sliceIndx);
    let newStrRight = puzzleString.slice(sliceIndx + 1);
    let newStr = newStrLeft + value + newStrRight;
    const areas = this.defineRowsColumnsRegions(newStr);

    let region;
    if (newColVal < 3) {
      if (newRowVal < 3) {
        region = 1;
      } else if (newRowVal >= 3 && newRowVal < 6) {
        region = 4;
      } else {
        region = 7;
      }
    } else if (newColVal >= 3 && newColVal < 6) {
      if (newRowVal < 3) {
        region = 2;
      } else if (newRowVal >= 3 && newRowVal < 6) {
        region = 5;
      } else {
        region = 8;
      }
    } else {
      if (newRowVal < 3) {
        region = 3;
      } else if (newRowVal >= 3 && newRowVal < 6) {
        region = 6;
      } else {
        region = 9;
      }
    }
    let targetRegion = areas.regions[region].filter((item) => item != ".");
    return this.hasDuplicateStrings({ [region]: targetRegion });
  }

  solve(puzzleString) {
    const stringToBoard = (str) => {
      let returnArr = [];
      for (let i = 0; i < 9; i++) {
        let newRow = [];
        for (let j = 0; j < 9; j++) {
          newRow.push(str[j + i * 9]);
        }
        returnArr.push(newRow);
      }
      return returnArr;
    };

    const _board = stringToBoard(puzzleString);

    function isValid(board, row, col, k) {
      for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + (i % 3);
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
          return false;
        }
      }
      return true;
    }

    function sodokoSolver(data) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (data[i][j] == ".") {
            for (let k = 1; k <= 9; k++) {
              if (isValid(data, i, j, k)) {
                data[i][j] = `${k}`;
                if (sodokoSolver(data)) {
                  return true;
                } else {
                  data[i][j] = ".";
                }
              }
            }
            return false;
          }
        }
      }
      return true;
    }
    sodokoSolver(_board);
    // console.log(_board);
    // Credit to mojtaba ramezani on Stack Overflow for the solution to how
    // to make a sudoku solver. I have worked this out previously independently,
    // but am using this 'backtracking' approach here for convenience.
    console.log(_board.flat().join(""));
    let result = _board.flat().join("");
    const areas = this.defineRowsColumnsRegions(result);
    const hasDuplicatesInRows = this.hasDuplicateStrings(areas.rows);
    const hasDuplicatesInColumns = this.hasDuplicateStrings(areas.columns);
    const hasDuplicatesInRegions = this.hasDuplicateStrings(areas.regions);
    if (/^[.]+$/.test(result)) {
      return { error: "puzzle could not be solved" };
    } else if (
      hasDuplicatesInRows ||
      hasDuplicatesInColumns ||
      hasDuplicatesInRegions
    ) {
      console.log("GOT HERE, and HAS DUPLICATES!!!!!!!!");
      return { error: "puzzle could not be solved" };
    }
    return result;
  }
}

module.exports = SudokuSolver;
