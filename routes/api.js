"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const puzzle = req.body.puzzle;
    const coordinate = req.body.coordinate;
    const value = req.body.value;
    if (!puzzle || !coordinate || !value) {
      return res.json({ error: "Required field(s) missing" });
    }

    if (value.length > 1 || !/[1-9]/.test(value)) {
      return res.json({ error: "Invalid value" });
    }

    if (
      coordinate.length !== 2 ||
      !/[A-I]/.test(coordinate[0]) ||
      !/[1-9]/.test(coordinate[1])
    ) {
      return res.json({ error: "Invalid coordinate" });
    }

    const errorCheck = solver.validate(puzzle);
    if (errorCheck === 1) {
      return res.json({ error: "Expected puzzle to be 81 characters long" });
    } else if (errorCheck === 2) {
      return res.json({ error: "Invalid characters in puzzle" });
    }

    let row = coordinate[0];
    let column = coordinate[1];
    let isRowValid = true;
    let isColValid = true;
    let isRegValid = true;
    let conflict = [];
    if (solver.checkRowPlacement(puzzle, row, column, value)) {
      isRowValid = false;
      conflict.push("row");
    }
    if (solver.checkColPlacement(puzzle, row, column, value)) {
      isColValid = false;
      conflict.push("column");
    }
    if (solver.checkRegionPlacement(puzzle, row, column, value)) {
      isRegValid = false;
      conflict.push("region");
    }

    if (isRowValid && isColValid && isRegValid) {
      return res.json({ valid: true });
    } else {
      return res.json({
        valid: false,
        conflict,
      });
    }
  });

  app.route("/api/solve").post((req, res) => {
    const puzzle = req.body.puzzle;
    if (!puzzle) {
      return res.json({ error: "Required field missing" });
    }
    const errorCheck = solver.validate(puzzle);
    if (errorCheck === 1) {
      return res.json({ error: "Expected puzzle to be 81 characters long" });
    } else if (errorCheck === 2) {
      return res.json({ error: "Invalid characters in puzzle" });
    }
    const solution = solver.solve(puzzle);
    if (solution.error) {
      return res.json({ error: "Puzzle cannot be solved" });
    }
    return res.json({ solution });
  });
};
