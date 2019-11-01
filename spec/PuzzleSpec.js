// https://www.techiediaries.com/jasmine-testing-tutorial/

// const puzzle = require("../scripts/puzzle");

describe("Puzzle", function () {
  /* ... */

  describe(">Puzzle Functions", function () {
    it("should be able to create a scrambled puzzle string", function () {
      let scrambledMapString = makeScrambledMapString();
      let scrambledMapArray = scrambledMapString.split(",");
      let inputMapIntArr = makeInputMapIntArray(scrambledMapString);
      expect(makeScrambledMapString()).toBeDefined();
      expect(makeScrambledMapString().split(',').length).toEqual(16);
      expect(scrambledMapArray.length).toEqual(16);
      expect(scrambledMapString == "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0").toBeFalse();
      expect(testArraySum136(getInputMapIntArray())).toBeTrue();
      expect(isScrambled(inputMapIntArr)).toBeTrue();
      //.toEutils.toLowerCase("HELLO WORLD")).toEqual("hello world");
    });

    it("it should be able to solve the puzzle with last move == 15", function () {
      let scrambledMapString = makeScrambledMapString();
      let scrambledMapArray = scrambledMapString.split(",");
      let inputMapIntArr = makeInputMapIntArray(scrambledMapString);
      let parameters = "content=" + scrambledMapString;
      let solution = solvePuzzle(scrambledMapArray);
      //let msPerMoveInt = 1;
      // setMsPerMoveInt(1);
      // jQuery("#msPerMoveDropdown option[value='1']").attr("selected", "selected");
      playSolution(1);
      let lastMove = solution[solution.length - 1];
      expect(lastMove).toEqual(15);
      //console.log("inputMapIntArr = " + inputMapIntArr);

    });

    it("puzzle solution should be correct", function () {
      expect(true).toBeTrue();
      //expect(utils.contains).toBeDefined();
      //expect(utils.contains("hello world", "hello", 0)).toBeTruthy();

    });

    it("not scrambled alert should work", function () {
       expect(alertNotScrambled()).toBeDefined();
     });

  });

/*
  describe("Math Utils", function () {
    describe("Basic Math Utils", function () {
      it("should be able to tell if a number is even", function () {
        expect().nothing();
      });
      it("should be able to tell if a number is odd", function () {
        expect().nothing();
      });

    });
    describe("Advanced Math Utils", function () {
      it("should be able to tell if a number is prime", function () {
        expect().nothing();
      });
      it("should be able to calculate the fibonacci of a number", function () {
        expect().nothing();
      });
      it("should explicitly fail", function () {
        fail('Forced to fail');
      });
    });
  });
*/
});



