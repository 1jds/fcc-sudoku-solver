const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

const validPuzzleStr =
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const validPuzzleStrComplete =
  "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
const invalidPuzzleStrOne =
  "999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

suite("Unit Tests", () => {
  // TEST 1
  test("1. Logic handles a valid puzzle string of 81 characters", (done) => {
    assert.equal(solver.solve(validPuzzleStr), validPuzzleStrComplete);
    done();
  });

  // TEST 2
  test("2. Logic handles a puzzle string with invalid characters", (done) => {
    let invalidPuzzleStrTwo =
      "X.Q..Z.V4..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    assert.equal(solver.validate(invalidPuzzleStrTwo), 2);
    done();
  });

  // TEST 3
  test("3. Logic handles a puzzle string that is not 81 characters in length", (done) => {
    let invalidPuzzleStrThree =
      ".2.84..63.12.7.2..5.....9..1....8.2.74.3.7.2..9.47...8..1..16....926914.37.";
    assert.equal(solver.validate(invalidPuzzleStrThree), 1);
    done();
  });

  // TEST 4
  test("4. Logic handles a valid row placement", (done) => {
    assert.equal(
      solver.checkRowPlacement(validPuzzleStr, "B", "1", "9"),
      false // false means no duplicates, so it's an ok placement
    );
    done();
  });

  // TEST 5
  test("5. Logic handles an invalid row placement", (done) => {
    assert.equal(
      solver.checkRowPlacement(validPuzzleStr, "B", "1", "2"),
      true // true means duplicates, so it's not an ok placement
    );
    done();
  });

  // TEST 6
  test("6. Logic handles a valid column placement", (done) => {
    assert.equal(
      solver.checkColPlacement(validPuzzleStr, "B", "1", "9"),
      false // false means no duplicates, so it's an ok placement
    );
    done();
  });

  // TEST 7
  test("7. Logic handles an invalid column placement", (done) => {
    assert.equal(
      solver.checkColPlacement(validPuzzleStr, "B", "1", "8"),
      true // true means duplicates, so there's a clash and consequently it's not an ok placement
    );
    done();
  });

  // TEST 8
  test("8. Logic handles a valid region (3x3 grid) placement", (done) => {
    assert.equal(
      solver.checkRegionPlacement(validPuzzleStr, "B", "1", "8"),
      false // as above
    );
    done();
  });

  // TEST 9
  test("9. Logic handles an invalid region (3x3 grid) placement", (done) => {
    assert.equal(
      solver.checkRegionPlacement(validPuzzleStr, "B", "1", "6"),
      true // as above
    );
    done();
  });

  // TEST 10
  test("10. Valid puzzle strings pass the solver", (done) => {
    assert.equal(solver.solve(validPuzzleStr), validPuzzleStrComplete);
    done();
  });

  // TEST 11
  test("11. Invalid puzzle strings fail the solver", (done) => {
    assert.deepEqual(solver.solve(invalidPuzzleStrOne), {
      error: "puzzle could not be solved",
    });
    done();
  });

  // TEST 12
  test("12. Solver returns the expected solution for an incomplete puzzle", (done) => {
    assert.equal(solver.solve(validPuzzleStr), validPuzzleStrComplete);
    done();
  });
});
