const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

const validPuzzle =
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const validPuzzleSolved =
  "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
const invalidPuzzle =
  "X.Q..Z.V4..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";

suite("Functional Tests", () => {
  // TEST 1
  test("1. Solve a puzzle with valid puzzle string: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({ puzzle: validPuzzle })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.solution, validPuzzleSolved);
        done();
      });
  });

  // TEST 2
  test("2. Solve a puzzle with missing puzzle string: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({})
      .end((err, res) => {
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field missing");
        done();
      });
  });

  // TEST 3
  test("3. Solve a puzzle with invalid characters: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle: invalidPuzzle,
      })
      .end((err, res) => {
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      });
  });

  // TEST 4
  test("4. Solve a puzzle with incorrect length: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({ puzzle: "123456789" })
      .end((err, res) => {
        assert.property(res.body, "error");
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long"
        );
        done();
      });
  });

  // TEST 5
  test("5. Solve a puzzle that cannot be solved: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle:
          "999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
      })
      .end((err, res) => {
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Puzzle cannot be solved");
        done();
      });
  });

  // TEST 6
  test("6. Check a puzzle placement with all fields: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: validPuzzle,
        coordinate: "A2",
        value: "3",
      })
      .end((err, res) => {
        assert.property(res.body, "valid");
        assert.isTrue(res.body.valid);
        done();
      });
  });

  // TEST 7
  test("7. Check a puzzle placement with single placement conflict: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: validPuzzle,
        coordinate: "A2",
        value: "4",
      })
      .end((err, res) => {
        assert.property(res.body, "valid");
        assert.isFalse(res.body.valid);
        assert.property(res.body, "conflict");
        assert.isArray(res.body.conflict);
        assert.lengthOf(res.body.conflict, 1);
        done();
      });
  });

  // TEST 8
  test("8. Check a puzzle placement with multiple placement conflicts: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: validPuzzle,
        coordinate: "A2",
        value: "1",
      })
      .end((err, res) => {
        assert.property(res.body, "valid");
        assert.isFalse(res.body.valid);
        assert.property(res.body, "conflict");
        assert.isArray(res.body.conflict);
        assert.lengthOf(res.body.conflict, 2);
        done();
      });
  });

  // TEST 9
  test("9. Check a puzzle placement with all placement conflicts: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: validPuzzle,
        coordinate: "A2",
        value: "2",
      })
      .end((err, res) => {
        assert.property(res.body, "valid");
        assert.isFalse(res.body.valid);
        assert.property(res.body, "conflict");
        assert.isArray(res.body.conflict);
        assert.lengthOf(res.body.conflict, 3);
        done();
      });
  });

  // TEST 10
  test("10. Check a puzzle placement with missing required fields: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({})
      .end((err, res) => {
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  // TEST 11
  test("11. Check a puzzle placement with invalid characters: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: invalidPuzzle,
        coordinate: "A1",
        value: "5",
      })
      .end((err, res) => {
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      });
  });

  // TEST 12
  test("12. Check a puzzle placement with incorrect length: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: ".1.2.5...",
        coordinate: "A1",
        value: "5",
      })
      .end((err, res) => {
        assert.property(res.body, "error");
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long"
        );
        done();
      });
  });

  // TEST 13
  test("13. Check a puzzle placement with invalid placement coordinate: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: validPuzzle,
        coordinate: "Z10",
        value: "5",
      })
      .end((err, res) => {
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid coordinate");
        done();
      });
  });

  // TEST 14
  test("14. Check a puzzle placement with invalid placement value: POST request to /api/check", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: validPuzzle,
        coordinate: "A1",
        value: "0",
      })
      .end((err, res) => {
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid value");
        done();
      });
  });
});
