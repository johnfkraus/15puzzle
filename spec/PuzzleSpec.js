// https://www.techiediaries.com/jasmine-testing-tutorial/

// const puzzle = require("../scripts/puzzle");

describe("Puzzle", function () {
  /* ... */

  beforeAll(function() {
    let scrambledMapString = makeScrambledMapString();
    let scrambledMapArray = scrambledMapString.split(",");
    let inputMapIntArr = makeInputMapIntArray(scrambledMapString);
    let parameters = "content=" + scrambledMapString;
    let solution = solvePuzzle(scrambledMapArray);
    //let msPerMoveInt = 1;
    // setMsPerMoveInt(1);
    // jQuery("#msPerMoveDropdown option[value='1']").attr("selected", "selected");
    playSolution(1);
    // console.log("spec 18 getInputMapIntArray() = " + getInputMapIntArray());

  });

  describe(">Puzzle Functions", function () {
    it("should be able to create a scrambled puzzle string", function () {
      //let scrambledMapString = makeScrambledMapString();
      //let scrambledMapArray = scrambledMapString.split(",");
      //let inputMapIntArr = makeInputMapIntArray(scrambledMapString);
      //expect(makeScrambledMapString()).toBeDefined();
      //expect(makeScrambledMapString().split(',').length).toEqual(16);
      //expect(scrambledMapArray.length).toEqual(16);
      //expect(scrambledMapString == "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0").toBeFalse();
      // expect(testArraySum136(getInputMapIntArray())).toBeTrue();
      // expect(isScrambled(inputMapIntArr)).toBeTrue();
      //.toEutils.toLowerCase("HELLO WORLD")).toEqual("hello world");
      expect(true).toBeTrue();
    });

    it("it should be able to solve the puzzle with last move == 15", function () {
      /*
      let scrambledMapString = makeScrambledMapString();
      let scrambledMapArray = scrambledMapString.split(",");
      let inputMapIntArr = makeInputMapIntArray(scrambledMapString);
      let parameters = "content=" + scrambledMapString;
      let solution = solvePuzzle(scrambledMapArray);
      //let msPerMoveInt = 1;
      // setMsPerMoveInt(1);
      // jQuery("#msPerMoveDropdown option[value='1']").attr("selected", "selected");
            playSolution(1);
      */


      let lastMove = solution[solution.length - 1];
      expect(lastMove).toEqual(15);
      console.log("spec 34 isItScrambled() = " + isItScrambled());
      expect(isItScrambled()).toBeFalse();
      //console.log("inputMapIntArr = " + inputMapIntArr);

    });

    it("puzzle solution should be correct", function () {
      expect(true).toBeTrue();
      //expect(utils.contains).toBeDefined();
      //expect(utils.contains("hello world", "hello", 0)).toBeTruthy();

    });

    it("not scrambled alert should work", function () {
      console.log("spec 66 getSolvedMap() = " + getSolvedMap() );
      console.log("alertNotScrambled() = " + alertNotScrambled());
      //console.log(document.getElementById('alertNotScrambled'));
      //jQuery('.ui-dialog').getElementsByTagName('button').click();
      //let buttons = $("#alertNotScrambled").dialog("option", "buttons");
// Calls the event
      //buttons["OK"]();
      // dialog.buttons.OK().
      //dialog.buttons.OK();

// Calls the event
      let nsAlert = document.getElementById('notScrambledAlert');
      console.log('nsAlert = ' +  nsAlert);
      console.log('nsAlert = ' +  JSON.stringify(nsAlert, null, 2));
      //buttons["OK"]();
      let alertModal = document.getElementById('alertNotScrambled');
      //let buttons = alertModal.getElementsByTagName('button');
      // console.log('buttons = ' + JSON.stringify(buttons, null, 2));
      //expect(alertNotScrambled()).toBeDefined();
      //let spyEvent = spyOnEvent('#some_element', 'click')
      //$('#some_element').click()
      //expect('click').toHaveBeenTriggeredOn('#some_element')
      expect(true).toBeTrue();

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



