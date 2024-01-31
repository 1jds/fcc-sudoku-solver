// // [
// //   '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
// //   '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
// // ]

// // const exampleString =
// //   "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";

// // const stringToBoard = (str) => {
// //   let returnArr = [];
// //   // 9x9
// //   for (let i = 0; i < 9; i++) {
// //     let newRow = [];
// //     for (let j = 0; j < 9; j++) {
// //       newRow.push(str[j + i * 9]);
// //     }
// //     returnArr.push(newRow);
// //   }

// //   return returnArr;
// // };

// // const _board = stringToBoard(exampleString);
// // console.log(_board);

// // // const _board = [
// // //   [".", "9", ".", ".", "4", "2", "1", "3", "6"],
// // //   [".", ".", ".", "9", "6", ".", "4", "8", "5"],
// // //   [".", ".", ".", "5", "8", "1", ".", ".", "."],
// // //   [".", ".", "4", ".", ".", ".", ".", ".", "."],
// // //   ["5", "1", "7", "2", ".", ".", "9", ".", "."],
// // //   ["6", ".", "2", ".", ".", ".", "3", "7", "."],
// // //   ["1", ".", ".", "8", ".", "4", ".", "2", "."],
// // //   ["7", ".", "6", ".", ".", ".", "8", "1", "."],
// // //   ["3", ".", ".", ".", "9", ".", ".", ".", "."],
// // // ];

// // function isValid(board, row, col, k) {
// //   for (let i = 0; i < 9; i++) {
// //     const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
// //     const n = 3 * Math.floor(col / 3) + (i % 3);
// //     if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
// //       return false;
// //     }
// //   }
// //   return true;
// // }

// // function sodokoSolver(data) {
// //   for (let i = 0; i < 9; i++) {
// //     for (let j = 0; j < 9; j++) {
// //       if (data[i][j] == ".") {
// //         for (let k = 1; k <= 9; k++) {
// //           if (isValid(data, i, j, k)) {
// //             data[i][j] = `${k}`;
// //             if (sodokoSolver(data)) {
// //               return true;
// //             } else {
// //               data[i][j] = ".";
// //             }
// //           }
// //         }
// //         return false;
// //       }
// //     }
// //   }
// //   return true;
// // }
// // sodokoSolver(_board);
// // console.log(_board);
// // // Credit to mojtaba ramezani on Stack Overflow for the solution to how
// // // to make a sudoku solver. I have worked this out previously independently,
// // // but am using this 'backtracking' approach here for convenience.

const exampleString =
  "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

// function solve(puzzleString) {
//   const stringToBoard = (str) => {
//     let returnArr = [];
//     for (let i = 0; i < 9; i++) {
//       let newRow = [];
//       for (let j = 0; j < 9; j++) {
//         newRow.push(str[j + i * 9]);
//       }
//       returnArr.push(newRow);
//     }
//     return returnArr;
//   };

//   const _board = stringToBoard(puzzleString);

//   function isValid(board, row, col, k) {
//     for (let i = 0; i < 9; i++) {
//       const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
//       const n = 3 * Math.floor(col / 3) + (i % 3);
//       if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
//         return false;
//       }
//     }
//     return true;
//   }

//   function sodokoSolver(data) {
//     for (let i = 0; i < 9; i++) {
//       for (let j = 0; j < 9; j++) {
//         if (data[i][j] == ".") {
//           for (let k = 1; k <= 9; k++) {
//             if (isValid(data, i, j, k)) {
//               data[i][j] = `${k}`;
//               if (sodokoSolver(data)) {
//                 return true;
//               } else {
//                 data[i][j] = ".";
//               }
//             }
//           }
//           return false;
//         }
//       }
//     }
//     return true;
//   }
//   sodokoSolver(_board);
//   // console.log(_board);
//   // Credit to mojtaba ramezani on Stack Overflow for the solution to how
//   // to make a sudoku solver. I have worked this out previously independently,
//   // but am using this 'backtracking' approach here for convenience.
//   console.log(_board.flat().join(""));

//   return _board.flat().join("");
// }

// solve(exampleString);

// // let coordinate = "a3";
// // if (
// //   !coordinate.length === 2 ||
// //   !coordinate[0].match(/[A-I]/) ||
// //   !coordinate[1].match(/[1-9]/)
// // ) {
// //   console.log({ error: "Invalid coordinate" });
// // }

const hasDuplicateStrings = (arr) => {
  const seen = {};
  const arrLength = arr.length;
  for (let i = 0; i < arrLength; i++) {
    const currentString = arr[i];
    if (seen[currentString]) {
      return true;
    }
    seen[currentString] = true;
  }
  return false;
};

const defineRowsColumnsRegions = (str) => {
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
};

defineRowsColumnsRegions(exampleString);

// console.log(hasDuplicateStrings(["7", "9", "9", "8", "5", "1", "4", "3", "2"]));

let x = "abc";
x[1] = "z";
console.log(x);
