// puzzle/js
// Ajax-JavaScript-CSS Puzzle by John Kraus
// john@johnfkraus.com johnkraus3@gmail.com www.johnfkraus.com
// October 2009, December 2012, March 2013
/**************/
/* INITIALIZE */
/**************/


window.alert = function (message) {
    jQuery(document.createElement('div'))
        .attr({title: 'Alert', 'class': 'alert'})
        .html(message)
        .dialog({
            buttons: {OK: function () {
                jQuery(this).dialog('close');
            }},
            close: function () {
                jQuery(this).remove();
            },
            draggable: true,
            modal: true,
            resizable: false,
            width: 'auto'
        });
};
var autoDisplace = []; // new Array(0);
var automatic = false;
var c = 0;
var cellText = "";
var counter = 0;
var currentCol = 0;
var currentMove = "";
var currentRow = 0;
var debug;
var displace = 0;
// display array is for debugging messages
var display = [];
var dragControl = true;
var dragging = 0;
var emptyClCol = 0;
var emptyClRow = 0;
var emptyLocationCode = "";
var hint = -1;
//var hintTileNumStr;
// is hinted tile selection highlighted?
//var hintShowing = false;
var initVarsFlag = 0;
var inputMapIntArr = new Array(16);
var lastMove = "";
var logString = "";
var map = new Array(36);
var moveCount = 0;
var moveNum = 0;
var moves = []; //new Array();
var moveStack = []; //new Array();
var msPerMoveInt = 1000;
var numText;
//var nextHintStr;
var oldDragControl;
var puzzleComplete = false;
var puzzleWrapDiv; // = document.getElementById("puzzlewrapper");
// scrambledMapString for testing
//var scrambleEnableFlag = 0;
var scrambleButtonEnabledFlag = 0;
var scrambledMapString = "12,14,13,9,5,6,3,0,15,10,11,2,8,7,4,1"; // for testing
var seed = 1;
var simpleMap = [16];
var slideH;
var slidePiece;
var slideV;
var solution = "";
var solutionArr = []; //new Array();
var t;
var t01, t02, t03, t04, t06, t07;
var timerArray = [t01, t02, t03, t04,  t06, t07];
var tileMap = []; //new Array(0);
var tiles;
var turboSolveEnabledFlag = 0;
var autoSolveEnabledFlag = 0;
var vertical;
function startPage() {
    debug = false;
    // whole page does barrel roll
    $("html").rotate({
        animateTo: 360,
        duration: 1000,
        callback: function () {
            // back to 0 degrees
            $("html").rotate(0);
        }
    });
    // default auto-solve speed: 1000 ms/move
    jQuery("#msPerMoveDropdown option[value='1000']").attr("selected", "selected");
    jQuery("div#black").css("background-color", "red");
    jQuery("div#black").fadeTo("slow", 0);
    jQuery("div#black").css("display", "none");
    jQuery("body").css("height", "200%");
    enableScrambleButton();
    // at this point, the progress bar is visible; the game board is not visible
    seed = makeRandInt();
    showPleaseWait();
    unHighlightAllTiles();
    puzzleWrapDiv = document.getElementById("puzzlewrapper");
    //scrollTopVal = document.getElementById("puzzlewrapper").scrollTop;
    showPleaseWait();
    // initialized variables for page display
    initVars();
    initMap();
    scramble();
    makeSimpleMap();
    placeTiles2();
    replaceNodeText("solved", " ");
    sleep(50);
    getSolution();
    //setTimeout('rotateJohnBoy()', 2000);
    // ENABLE CLICKABLES
    enableAutoSolveButton();
    //enableTurboSolveButton();
    enableScrambleButton();
    //enableDebugButton();
    activateBoards();
    //enableHintButton();
    // ENABLE EFFECTS
    enableProfilePhotoRotate();
    //enableScrambleButtonHoverEffect();
    hidePleaseWait();
    //checkEvents();
}
function initPageScramble() {
    seed = makeRandInt();
    unHighlightAllTiles();
    puzzleWrapDiv = document.getElementById("puzzlewrapper");
    showPleaseWait();
    // initialized variables for page display
    initVars();
    initMap();
    scramble();
    makeSimpleMap();
    placeTiles2();
    replaceNodeText("solved", " ");
    sleep(50);
    getSolution();
    hidePleaseWait();
}
function initVars() {
    initVarsFlag += 1;
    if (debug && console && console.log) {
        console.log("148 initVars() initVarsFlag = " + initVarsFlag);
    }
    replaceNodeText("solved", " ");
    unPlaceTiles();
    currentRow = 0;
    currentCol = 0;
    emptyClRow = 0;
    emptyClCol = 0;
    cellText = "";
    //msPerMoveInt = 1000;
    zeroMoves();
    autoDisplace = [];
    automatic = false;
    c = 0;
    counter = 0;
    currentMove = "";
    debug = false;
    if (debug && console && console.log) {
        console.log("167 initVars() debug = " + debug);
    }
    displace = 0;
    display = [];
    dragControl = true;
    dragging = 0;
    emptyLocationCode = "";
    hint = -1;
    inputMapIntArr = new Array(16);
    lastMove = "";
    logString = "";
    map = new Array(36);
    moveCount = 0;
    moveNum = 0;
    moves = []; //new Array();
    moveStack = []; //new Array();
    if (debug) {
        //msPerMoveInt = 1;
        jQuery("option[value='1']").attr('selected', 'selected');
        //jQuery("#msPerMoveDropdown option[value='1000']").attr("selected", "selected");
    } else {
        //msPerMoveInt = getMsPerMoveInt(); // 1000;
        if (debug && console && console.log) {
            console.log("getMsPerMoveInt() = " + getMsPerMoveInt());
        }
    }
    //msPerMoveInt = 0;
    numText = "";
    oldDragControl = null;
    puzzleComplete = false;
    scrambledMapString = "12,14,13,9,5,6,3,0,15,10,11,2,8,7,4,1";
    simpleMap = [16];
    slideH = null;
    slidePiece = null;
    slideV = null;
    solution = "";
    solutionArr = []; //new Array();
    timerArray = [t01, t02, t03, t04, t06, t07];
    tileMap = []; //new Array(0);
    tiles = [];
    vertical = null;
}
function makeSimpleMap() {
    simpleMap[0] = map[7];
    simpleMap[1] = map[8];
    simpleMap[2] = map[9];
    simpleMap[3] = map[10];
    simpleMap[4] = map[13];
    simpleMap[5] = map[14];
    simpleMap[6] = map[15];
    simpleMap[7] = map[16];
    simpleMap[8] = map[19];
    simpleMap[9] = map[20];
    simpleMap[10] = map[21];
    simpleMap[11] = map[22];
    simpleMap[12] = map[25];
    simpleMap[13] = map[26];
    simpleMap[14] = map[27];
    simpleMap[15] = map[28];
}
// initialize the map[] array
function initMap() {
    var i;
    var j;
    for (i = 0; i < map.length; i++) {
        map[i] = 0;
    }
    for (i = 0; i < 6; i++) {
        map[i] = 1;
        map[i * 6] = 1;
    }
    // put values in map[]
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            map[7 + i * 6 + j] = (i * 4 + j + 1) & 15;
        }
    }
    // tileMap maps row-column codes  "11", "12", "13", ... to array indexes 0, 1, 2 ...
    if (tileMap.length < 6) {
        tileMap.splice(0, 0, "11", "12", "13", "14", "21", "22", "23", "24", "31", "32", "33", "34", "41", "42", "43", "44");
    }
}
/******************/
/* RE-INITIALIZE */
/******************/

function printTileClasses(lineNum) {
    var obj = jQuery("div#letterbox a");
    if (debug && console && console.log) {
        console.log(obj.length);
        console.log("printTileClasses(" + lineNum + ")\n" + toArray(obj).join("\n"));
    }
}
function toArray(obj) {
    var i;
    var array = [];
    // iterate backwards ensuring that length is an UInt32
    for (i = obj.length >>> 0; i--;) {
        array[i] = jQuery(obj[i]).attr("class");
    }
    return array;
}
function scramble() {
    var i, j, k, l;
    if (true) {   //(!automatic)
        for (i = 0; i < 4; i++)
            for (j = 0; j < 4; j++)
                map[7 + i * 6 + j] = (i * 4 + j + 1) & 15;
        for (i = 0; i < 16; i++) {
            //l=(randi()>>5)%15;
            //l=Math.floor(randi()/32)%15;
            l = parseInt(randi() / 32, 10) % 15;
            //j=Math.floor(7+6*(l/4))+(l&3);
            j = parseInt(7 + 6 * parseInt(l / 4, 10), 10) + (l & 3);
            //l=Math.floor((randi()>>5)%15);
            l = parseInt(randi() / 32) % 15;
            k = parseInt(7 + 6 * parseInt(l / 4, 10), 10) + (l & 3);
            var debugCounter = 0;
            while (k === j) {
                //l=Math.floor((randi()>>5)%15);
                l = parseInt(randi() / 32, 10) % 15;
                k = parseInt(7 + 6 * parseInt(l / 4, 10), 10) + (l & 3);
                debugCounter++;
                if (debugCounter > 300) {
                    alert("debugCounter = " + debugCounter);
                    break;
                }
            }
            l = map[k];
            map[k] = map[j];
            map[j] = l;
        }

    }
    var inArrayStr = "scrambled map[" + map.length + "]";
    for (i = 0; i < map.length; i++) {
        inArrayStr += map[i] + ", ";
    }
}
/******************/
/* ENABLE/DISABLE */
/******************/
/*
function enableTurboSolveButton() {
    turboSolveEnabledFlag += 1;
    // call function scramble() when clicked
    if (turboSolveEnabledFlag < 2) {
        $("a#turboSolve").on("click", function () {
            msPerMoveInt = 1;
            setMovesPerSecStrLabel(getMsPerMoveInt());
            $("option[value='1']").attr('selected', 'selected');
            if (isItScrambled()) {
                playSolution();
            } else {
                alertNotScrambled();
            }
        });
        //linkUpstage("a#turboSolve", "a#solve");
    }
}
function disableTurboSolve() {
    turboSolveEnabledFlag -= 1;
    //jQuery("#turboSolve").css("display", "none");
    jQuery("#turboSolve").off("click", (function () {
    }));
}
*/
function enableAutoSolveButton() {
    autoSolveEnabledFlag += 1;
    if (debug && console && console.log) {
        console.log("autoSolveEnabledFlag = " + autoSolveEnabledFlag);
    }
    if (autoSolveEnabledFlag < 2) {
        $("a#solve").on("click", function () {
            if (isItScrambled()) {
                playSolution();
            } else {
                alertNotScrambled();
            }
        });
    }
}
function enableScrambleButton() {
    // call function scramble() when clicked
    scrambleButtonEnabledFlag += 1;
    if (scrambleButtonEnabledFlag < 2) {
        $("a#scramble").on("click", function () {
            printTileClasses("377");
            clearAllTimers();
            //enableSolveButton();
            t01 = setTimeout("initPageScramble()", 800);
            //scrambleButtonClicked();
            shake("div#letterboxmargin2", 2, 15);
            printTileClasses("383");
            t02 = setTimeout("rotateLetterBox()", 700);
        });
    }
}
/*
function disableScrambleButton() {
    $("a#scramble").off("click", function () {
        //scrambleButtonClicked();
    });
    clearTimeout(t03);
}
*/
function mouseEnter(elementIdStr) {
    // Bind the mouse enter to the second DIV.
    $(elementIdStr).bind("mouseenter mouseleave",
        //$("span#scrambleSpan").bind("mouseenter mouseleave",
        function (event) {
            if (debug && console && console.log) {
                console.log(event.type, " :: ", this.id);
            }
        }
    );
}
function enableProfilePhotoRotate() {
    jQuery("img#profilePhoto").click(function () {
        jQuery("img#profilePhoto").rotate({
            animateTo: 360,
            duration: 1000,
            callback: function () {
                // back to 0 degrees
                jQuery("img#profilePhoto").rotate(0);
            }
        });
    });
}
/**********************/
/* GRATUITOUS EFFECTS */
/**********************/
function rotateJohnBoy() {
    jQuery("img#profilePhoto").rotate({
        animateTo: -15,
        duration: 250,
        callback: function () {
            // back to 0 degrees
            jQuery("img#profilePhoto").rotate(0);
        }
    });
}
// one link upstages another
function linkUpstage(inUpElementString, inDownElementString) {
    var $inDownElement = $(inDownElementString); // link to be upstaged
    var $inUpElement = $(inUpElementString);  // link to do the upstaging
    $inUpElement.hover(function () {
        $inUpElement.css("font-size", "22px");
        $inUpElement.css("left", "10px");
        $inUpElement.css("top", "35px");
        $inDownElement.css("font-size", "12px");
        $inDownElement.css("left", "42px");
    }, function () {
        $inUpElement.css("font-size", "12px");
        $inUpElement.css("left", "17px");
        $inUpElement.css("top", "53px");
        $inDownElement.css("font-size", "22px");
        $inDownElement.css("left", "20px");
    });
}
function shake(shakeElementString, timesInt, distanceInt) {
    var $shakeElement = $(shakeElementString);
    $shakeElement.effect('shake', {times: timesInt, direction: 'left', distance: distanceInt}, 200);
    $shakeElement.effect('shake', {times: timesInt, direction: 'down', distance: distanceInt}, 100);
}
function animateLogo(x) {
    jQuery('#animateLogo').removeClass().addClass(x);
    var wait = window.setTimeout(function () {
        jQuery('#animateLogo').removeClass();
    }, 1300);
}
function rotateLetterBox() {
    $("#letterboxmargin2").rotate({
        animateTo: 360,
        duration: 1000,
        callback: function () {
            // back to 0 degrees
            $("#letterboxmargin2").rotate(0);
        }
    });
}
/*******************/
/* GETTERS/SETTERS */
/*******************/

function setMsPerMoveStrLabel() {
    var secondsPerMoveStr = $('#msPerMove').find(":selected").text();
    var secondsPerMoveFloat = parseFloat(secondsPerMoveStr);
    //msPerMoveInt = secondsPerMoveFloat * 1000; //Math.round(1 / secondsPerMoveFloat);
    setMovesPerSecStrLabel(secondsPerMoveFloat * 1000);
    if (debug && console && console.log) {
        console.log("setMsPerMoveStrLabel() secondsPerMoveFloat = " + secondsPerMoveFloat + "; msPerMoveInt = " + getMsPerMoveInt());
    }
}
// called by select dropDown box on puzzle in index.html
function getMsPerMove() {
    var msPerMoveStr = $('#msPerMove').find(":selected").text();
    if (debug && console && console.log) {
        console.log("msPerMove = " + parseInt(msPerMoveStr, 10));
    }
    return parseInt(msPerMoveStr, 10);
}
function getMsPerMoveInt() {
    if (debug && console && console.log) {
        console.log("502 getMsPerMoveInt() = " + getSecondsPerMoveFloat() * 1000);
    }
    return getSecondsPerMoveFloat() * 1000;
}
function getSecondsPerMoveStr() {
    var count001 = 0;
    count001 += 1;
    var secondsPerMoveStr = $('#msPerMove').find(":selected").text();
    if (debug && console && console.log && (count001 % 11 === 0)) {
        console.log("476 secondsPerMoveStr = $('#msPerMove').find(':selected').text() = " + $('#msPerMove').find(":selected").text());
    }
    return $('#msPerMove').find(":selected").text();
}
// called by select dropdown box on puzzle in index.html
function getSecondsPerMoveFloat() {
    if (debug && console && console.log) {
        console.log("getSecondsPerMoveStr = " + parseFloat(getSecondsPerMoveStr()));
    }
    var mpm = $("#msPerMove").val();
    if (debug && console && console.log) {
        console.log("499 mpm = " + mpm + "; getSecondsPerMoveStr = " + getSecondsPerMoveStr() + "; parseFloat(getSecondsPerMoveStr()) = " + parseFloat(getSecondsPerMoveStr()));
    }
    return parseFloat(getSecondsPerMoveStr());
}
function setMovesPerSecStrLabel(msPerMoveInt) {
    var movesPerSecInt = 0;
    var movesPerSecRounded = 0;
    var rateUnitsStr = " moves/sec.";
    var secondsPerMove = msPerMoveInt / 1000;
    var movesPerSec = 1 / secondsPerMove;
    if (msPerMoveInt !== 0) {
        //movesPerSecInt = 1 / (msPerMoveInt / 1000);
        movesPerSecInt = 1000 / msPerMoveInt;
        if (movesPerSecInt === 1000) {
            movesPerSecRounded = "1,000"
        } else if (movesPerSecInt === 1) {
            movesPerSecRounded = "1";
            rateUnitsStr = " move/sec.";
        } else if (movesPerSecInt < 2) {
            movesPerSecRounded = movesPerSecInt.toFixed(2);
        } else {
            movesPerSecRounded = movesPerSecInt.toFixed(0);
        }
    }
    var movesPerSecStr = movesPerSecRounded + rateUnitsStr;
    replaceNodeText("movesPerSec", movesPerSecStr);
}
// generate a random integer where LowerBound <= random <=UpperBound
function makeRandInt() {
    var Lower_Bound = 1;
    var Upper_Bound = 3000;
    return Math.floor((Lower_Bound + Math.random() * (Upper_Bound - Lower_Bound) + 0.5));
}
function randi() {
    seed = (seed * 171) % 30269;
    return seed;
}
/*****************/
/* PLAY SOLUTION */
/*****************/

function runAuto() {
    if (debug && window.console && console.log) {
        // console.log("running puzzle.js run() line 554");
    }
    while ((counter <= 9) && (automatic)) {
        if (automatic) { // (counter <= 9)   //(automatic)
            counter++;
            displace = autoDisplace[counter];
            if ((displace & 31) === 0) {
                if (vertical) {
                    if (displace === 0) {
                        map[7 + slideH + 6 * slideV] = slidePiece;
                    } else {
                        map[7 + slideH + 6 * slideV + 6] = slidePiece;
                    }
                } else {
                    if (displace === 0) {
                        map[7 + slideH + 6 * slideV] = slidePiece;
                    } else {
                        map[7 + slideH + 6 * slideV + 1] = slidePiece;
                    }
                }
                swap(currentMove);
                moveNum++;
                incrementMoves();
                dragging = 0;
                if (moveNum >= moveCount) {
                    if (puzzleIsComplete()) {
                        win();
                        solvedAlert();
                        //enableSolveButton();
                    }
                    automatic = false;
                    dragControl = oldDragControl;
                    clearTimeout(t);
                } else {
                    lastMove = currentMove;
                    //unHighlightCurrentMove(currentMove);
                    currentMove = getNextMove();
                    //highlightCurrentMove(currentMove);
                    break;
                }
            }
        }
    }
}
function init() {
    makeXmlHttpRequestDivHidden();
    var i;
    var j;
    for (i = 0; i < map.length; i++) {
        map[i] = 0;
    }
    for (i = 0; i < 6; i++) {
        map[i] = 1;
        map[i * 6] = 1;
    }
    // put values in map[]
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            map[7 + i * 6 + j] = (i * 4 + j + 1) & 15;
        }
    }
    // tileMap maps row-column codes  "11", "12", "13", ... to array indexes 0, 1, 2 ...
    tileMap.splice(0, 0, "11", "12", "13", "14", "21", "22", "23", "24", "31", "32", "33", "34", "41", "42", "43", "44");
    moves = solution.split(",");
    moveStack = solution.split(",");
    moveCount = moves.length;
    for (i = 0; i < moves.length; i++) {
        moves[i] = moves[i].trim();
    }
    var inArrayStr2 = "moves[" + moves.length + "]";
    for (i = 0; i < moves.length; i++) {
        inArrayStr2 += moves[i] + ", ";
    }
    autoDisplace.splice(0, 0, 0, 5, 12, 21, 32, 32, 27, 20, 11, 0);
    automatic = true;
    moveNum = 0;
    currentMove = getNextMove();
    oldDragControl = dragControl;
    dragControl = false;
}  // end init()
function getNextMove() {// Called by the automatic solver, get move from queue.
    //printMap();
    var i, j;
    //j = moves[moveNum];
    j = moveStack.shift();
    i = parseInt(j / 4, 10);
    j = parseInt(j & 3, 10);
    if (j < 3 && inMap(j + 1, i) == 0) {
        dragging = 2;
        slideH = j;
        slideV = i;
    }
    else if (j > 0 && inMap(j - 1, i) == 0) {
        dragging = 2;
        slideH = j - 1;
        slideV = i;
    }
    else if (i < 3 && inMap(j, i + 1) == 0) {
        dragging = 1;
        slideH = j;
        slideV = i;
    }
    else if (i > 0 && inMap(j, i - 1) == 0) {
        dragging = 1;
        slideH = j;
        slideV = i - 1;
    }
    // dragging==1 means vertical
    vertical = (dragging == 1);
    if (slideH == j && slideV == i) {
        displace = 0;
        counter = 0;
    }
    else {
        displace = 32;
        counter = 5;
    }
    slidePiece = inMap(j, i);
    map[7 + j + 6 * i] = 0;
    automatic = true;
    return moves[moveNum];
}
// display array elements separated by commas in a String for an error message/alert
function printArray(inArray) {
    var inArrayStr = "inArrayStr[" + inArray.length + "]";
    for (var i = 0; i < inArray.length; i++) {
        inArrayStr += inArray[i] + ", ";
    }
    inArrayStr += "\n" + document.write(inArray);
    return inArrayStr;
}
// returns value in map[] given horizontal row number (range=0-3) and vertical column number (range=0-3)
function inMap(h, v) {
    var index = parseInt(7 + h + 6 * v, 10);
    return map[index];
}
// parameter = 1-15
function highlightCurrentMove(currentMove) {
    var locCode = tileMap[currentMove];
    highlightCurrentMoveLocationCode(locCode);
}
// parameter is location code: string of two numbers, first=row, second=column, like 23 for row 2, column 3
// same as id for tile anchors
function highlightCurrentMoveLocationCode(locCode) {
    if (locCode) {
        var txt;
        var currentMoveDivClassName;
        try {
            currentMoveDivClassName = document.getElementById(locCode).className;
        } catch (err) {
            txt = "659 - There was an error on this page.\n\n";
            txt += "in highlightCurrentMoveLocationCode(locCode = " + locCode + "}\n\n";
            txt += "Error description: " + err.message + "\n\n";
            txt += "locCode = " + locCode + "\n\n";
            txt += "Click OK to continue.\n\n";
            alert(txt);
        }
        document.getElementById(locCode).className = currentMoveDivClassName + " highlight";
    }
}
function unHighlightBlankTile() {
    updateBlankTileLoc();
    var emptyTileClassName = document.getElementById(emptyLocationCode).className;
    var modifiedEmptyTileClassName = emptyTileClassName.replace(/highlight/, "");
    document.getElementById(emptyLocationCode).className = modifiedEmptyTileClassName;
}
function unHighlightAllTiles() {
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    var currentTileClassName = "";
    var modifiedTileClassName = "";
    for (var i = 0; i < tiles.length; i++) {
        currentTileClassName = tiles[i].className;
        modifiedTileClassName = currentTileClassName.replace(/highlight/, "");
        tiles[i].className = modifiedTileClassName;
    }
}
function swap(currentMove) {
    var txt;
    var numberedCellTileClasses;
    var numberedCellClassName;
    if (debug && window.console && console.log) {
        console.log("698 currentMove = " + currentMove);
        console.log("699 tileMap[] = " + tileMap.toString());
    }
    var currentMoveId = tileMap[currentMove];
    if (updateBlankTileLoc() === false) {
        alert("can't find empty tile");
    }
    try {
        numberedCellClassName = document.getElementById(currentMoveId).className;  // "tile b1 tx3 n?"
    }
    catch (err) {
        txt = "702 - There was an error on this page.<br /><br />";
        txt += "Error description: " + err.message + "<br />r /><br />";
        txt += "Click OK to continue.<br /><br />";
        alert(txt);
        //initPageScramble();
    }
    var emptyCellClassName = document.getElementById(emptyLocationCode).className;  // "tile b1 tx4 n16"
    try {
        numberedCellTileClasses = numberedCellClassName.split(" ");
    }
    catch (err) {
        txt = "713 - There was an error on this page.<br /><br />";
        txt += "Error description: " + err.message + "<br /><br />";
        txt += "Click OK to continue.<br /><br />";
        alert(txt);
        //initPageScramble();
    }
    var numberClass = numberedCellTileClasses[3];
    var numberOnTile = parseInt(numberClass.substring(1, 3), 10);
    var modifiedEmptyCellClassName = emptyCellClassName.replace(/n\d{1,2}/, "n" + numberOnTile);
    document.getElementById(emptyLocationCode).className = modifiedEmptyCellClassName;
    unHighlightAllTiles();
    highlightCurrentMoveLocationCode(emptyLocationCode);
    var modifiedNumberedCellClassName = numberedCellClassName.replace(/n\d{1,2}/, "n0");
    document.getElementById(currentMoveId).className = modifiedNumberedCellClassName;
    updateBlankTileLoc();
    unHighlightBlankTile();
}
function doHighlighting() {
    unHighlightAllTiles();
    highlightCurrentMove(currentMove);
    unHighlightBlankTile();
}
function runControl(msPerMoveInt) {
    if (debug && console && console.log) {
        console.log("781 runControl() getMsPerMoveInt() = " + getMsPerMoveInt() + "; local msPerMoveInt = " + msPerMoveInt);
    }
    runAuto();
    t06 = setTimeout("doHighlighting()", msPerMoveInt / 2);
    t07 = setTimeout("runControl(getMsPerMoveInt())", msPerMoveInt);
}
function showPleaseWait() {
    var lbBackgroundDivStyle = document.getElementById("letterboxBackground").style;
    lbBackgroundDivStyle.visibility = 'visible';
}
function hidePleaseWait() {
    var lbBackgroundDivStyle = document.getElementById("letterboxBackground").style;
    lbBackgroundDivStyle.visibility = 'hidden';
}
function makeXmlHttpRequestDivHidden() {
    var xmlDivStyle = document.getElementById("xmlHttpRequestDiv").style;
    xmlDivStyle.visibility = 'hidden';
}
function makeXmlHttpRequestDivVisible() {
    var xmlDivStyle = document.getElementById("xmlHttpRequestDiv").style;
    xmlDivStyle.visibility = 'visible';
}
// Functions in alpha order start here
function activateBoards() {
    var boards = document.getElementById("thumbnails").getElementsByTagName("img");
    for (var i = 0; i < boards.length; i++) {
        boards[i].onclick = newBoard;
    }
    var boardsLeft = document.getElementById("thumbnailsLeft").getElementsByTagName("img");
    for (i = 0; i < boardsLeft.length; i++) {
        boardsLeft[i].onclick = newBoard;
    }
}
function unsetBlankTileImage() {
    var emptyCellClassName = (tiles[cellIndex(emptyClRow, emptyClCol)].className);  // "tile tx1 n?"
    emptyCellClassName = emptyCellClassName.replace(/n16/, "n0");
    if (debug && console && console.log) {
        console.log("786 emptyCellClassName = " + emptyCellClassName);
    }
    (tiles[cellIndex(emptyClRow, emptyClCol)].className) = emptyCellClassName;
}
function setBlankTileImage() {
    var emptyCellClassName = (tiles[cellIndex(emptyClRow, emptyClCol)].className);  // "tile b# t## n16"
    emptyCellClassName = emptyCellClassName.replace(/n0/, "n16");
    if (debug && console && console.log) {
        console.log("786 emptyCellClassName = " + emptyCellClassName);
    }
    (tiles[cellIndex(emptyClRow, emptyClCol)].className) = emptyCellClassName;
}
// returns index (0-15) in var tiles[] array based on letterbox row
// and column location; rows from 1-4 and columns from 1-4
function cellIndex(row, col) {
    return (((row - 1) * 4) + (col - 1));
}
function cellIsEmpty(row, col) {
    updateBlankTileLoc();
    return (row === emptyClRow) && (col === emptyClCol);
}
function cellNumIs16(myThis) {
    var row = getRowNum(myThis);
    var col = getColNum(myThis);
    var squareNum49 = getSquareNumber(row, col);
    return ('' + row + col) === "16";
}
function clearAllTimers() {
    var i;
    for (i = 0; i < timerArray.length; i++) {
        clearTimeout(timerArray[i]);
    }
}
/* given tile row and col, returns the number (as text) graphically in the square and
 contained in the className after the n, "tile b# t11 n12" */
function getSquareNumber(row, col) {
    var tileClassName = (tiles[cellIndex(row, col)].className);
    var tileClasses = tileClassName.split(" ");
    var squareNum = tileClasses[3].substring(1, 3);
    return squareNum;
}
function getTilesIndexIntegerFromSquareNumberText(tileNumText) {
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    var tileClassName1 = "";
    var tileClassesArr1 = [];
    var tileNum1 = "";
    for (var i = 0; i < tiles.length; i++) {
        tileClassName1 = tiles[i].className;  // "tile b1 t11 n12"
        tileClassesArr1 = tileClassName1.split(" ");  // "tile b1 t11 n12"
        tileNum1 = tileClassesArr1[3].substring(1, 3);
        if (tileNum1 === tileNumText) {
            return i;
        }
    }
    return "ERROR-ERROR-ERROR";
}
/* given tile array index, returns the number (as text) displayed graphically in the square (unless it is a numbers-hidden puzzle) and contained in the className after the n, "tile b# t11 n12" */
function getSquareNumberAsText(index) {
    var tileClassName = (tiles[index].className);
    var tileClasses = tileClassName.split(" ");
    var squareNum = tileClasses[3].substring(1, 3);
    return squareNum;
    /* (tiles[cellIndex(row,col)].className).substring(13,15);  // example result: "12" of "tile b1 t11 n12" */
}
function getLocationCode(myThis) {
    var tileClassName = myThis.className;
    var tileClasses = tileClassName.split(" ");
    return tileClasses[2].substring(1, 3);
}
function getRowNum(myThis) {
    var locationCode = getLocationCode(myThis);
    var rowNum = (locationCode.charAt(0));
    return rowNum;
}
function getColNum(myThis) {
    var locationCode = getLocationCode(myThis);
    var colNum = (locationCode.charAt(1));
    return colNum;
}
function incrementMoves() {
    var movesDiv = document.getElementById("moves");
    var movesNode = movesDiv.firstChild;
    var movesText = movesNode.nodeValue;
    var pieces = movesText.split(" ");
    var currentMoves = parseInt(pieces[0], 10);
    currentMoves += 1;
    if ((currentMoves === 1) || (moveNum === 1)) {
        if (automatic === true) {
            movesNode.nodeValue = moveNum + " Move";
        } else {
            movesNode.nodeValue = currentMoves + " Move";
        }
    } else {
        if (automatic === true) {
            movesNode.nodeValue = moveNum + " Moves";
        } else {
            movesNode.nodeValue = currentMoves + " Moves";
        }
    }
}
function makeRandomArray() {
    //var arr = [];
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // array of numbers
    arr.sort(function () {
        return Math.floor(Math.random() * 5) - 1
    }); // randomize the array
    return arr;
}
// recall  // "tile b# t## n16"
function makeHash() {
    var hash = "";
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    for (var i = 0; i < tiles.length; i++) {
        hash += getSquareNumberAsText(i);
    }
    return hash;
}
function makeSortedArray() {
    //var arr2 = [];
    var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 12, 13, 14, 15]; // array of numbers
    return arr2;
}
function newBoard() {
    clearTimeout(t);
    jQuery('li#autosolve').css('display', 'block');
    jQuery('li#scrambleCommand').css('display', 'block');
    var boardId = (this.id.charAt(0));
    var boardClassName = "tile b" + boardId;
    var newTileClassName = "";
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    var oldTileClassName;
    for (var i = 0; i < tiles.length; i++) {
        oldTileClassName = tiles[i].className;
        newTileClassName = tiles[i].className.replace(/tile b\d/, boardClassName);
        tiles[i].className = newTileClassName;
    }
    initPageScramble(); // calls initVars()
    updateBlankTileLoc();
}
// add numbers 0-15 to each tile classname -> " n##"
function placeTiles2() {
    // randomize the array
    // var frequencyTable = makeArray();
    // tileMap.splice(0,0,"11","12","13","14","21","22","23","24","31","32","33","34","41","42","43","44");
    var number = 0;
    var tileId = "";
    var classname = "";
    var currentElem;
    for (var i = 0; i < simpleMap.length; i++) {
        number = simpleMap[i];
        tileId = tileMap[i];
        currentElem = document.getElementById(tileId);
        classname = currentElem.className;
        classname = classname + ' n' + number;
        currentElem.className = classname;
    }
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    for (i = 0; i < tiles.length; i++) {
        //var number = frequencyTable[i];
        // assign a number to each tile in the letterbox -- randomly
        //tiles[i].className = tiles[i].className + ' n' + number;
        tiles[i].onclick = tileClick;
    }
    updateBlankTileLoc();
}
// add numbers 0-15 to each tile classname -> " n##" randomly
function placeTiles() {
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    // randomize the array
    var frequencyTable = makeRandomArray();
    for (var i = 0; i < tiles.length; i++) {
        var number = frequencyTable[i];
        // assign a number to each tile in the letterbox -- randomly
        tiles[i].className = tiles[i].className + ' n' + number;
        tiles[i].onclick = tileClick;
    }
    updateBlankTileLoc();
}
function puzzleIsComplete() {
    var hash = makeHash();
    if ((hash == "12345678910111612131415") || (hash == "12316456789101112131415") || (hash == "12345671689101112131415") ||
        (hash == "12345678910111213141516") || (hash == "1234567891011012131415") || (hash == "1230456789101112131415") ||
        (hash == "1234567089101112131415") || (hash == "1234567891011121314150")) {
        updateBlankTileLoc();
        puzzleComplete = true;
        return true;
    } else {
        return false;
    }
}
function replaceContent(show) {
    document.getElementById("your_div").innerHTML = display[show];
}
function sleep(ms) {
    var dt = new Date();
    dt.setTime(dt.getTime() + ms);
    while (new Date().getTime() < dt.getTime());
}
/*
function showClasses() {
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    //tiles = letterboxDiv.getElementsByTagName("a");
    var cellText = "";
    var numText = "";
    for (var i = 0; i < tiles.length; i++) {
        cellText += "(" + i + ") " + tiles[i].className + ", ";
        numText += "(" + i + ") " + (tiles[i].className).substring(10, 13) + ", ";
        if (( (i + 1) % 4 == 0 ) || (i == 15)) {
            cellText += "<br />";
            numText += "<br />";
        }
    }
}
*/
function slideRow(currentRow, emptyClRow, myThis) {
    var tileText = "";
    var emptyLocationCode = '' + emptyClRow + emptyClCol;
    var shiftNum = currentCol - emptyClCol;
    var shiftNumSign = 0;
    if (shiftNum < 0) {
        shiftNumSign = -1
    } else if (shiftNum > 0) {
        shiftNumSign = 1
    } else {
        alert("shiftNumSign = 0");
        return;
    }
    if (currentRow !== emptyClRow) {
        alert("currentRow!=emptyClRow!   ");
    }
    updateBlankTileLoc();
    var x = shiftNum;
    var y = shiftNumSign;
    var numberedCellCol = 0;
    var alerta = document.getElementById("alerta");
    var alert0 = document.getElementById("alert0");
    var alert1 = document.getElementById("alert1");
    var alert2 = document.getElementById("alert2");
    var alert3 = document.getElementById("alert3");
    var alert4 = document.getElementById("alert4");
    var alert5 = document.getElementById("alert5");
    var alert6 = document.getElementById("alert6");
    var alert7 = document.getElementById("alert7");
    var i = Math.abs(shiftNum);
    for (i; i > 0; i--) {
        if (false) {
            for (var j = 0; j < tiles.length; j++) {
                if (j == 0) {
                    tileText += "<br />ARRAY:<br /> ";
                }
                tileText += tiles[j].className + "; eCol = " + emptyClCol + " eLoc = " + emptyLocationCode + "<br />";
            }
        }
        updateBlankTileLoc();
        if (false) {
            alert6.innerHTML += " emptyLocationCode = " + emptyLocationCode + " emptyClCol = " + emptyClCol + "; ";
        }
        numberedCellCol = parseInt(emptyClCol, 10) + parseInt(shiftNumSign, 10);
        if (false) {
            alerta.innerHTML +=
                " numberedCellCol = emptyClCol (" + parseInt(emptyClCol, 10) + ") + " + parseInt(shiftNumSign, 10) + " = " + numberedCellCol + "; ";
            alert0.innerHTML += "sNum = " + i + "; ";
            display[0] += " shiftNum = " + i + "; ";
        }
        var numberedCellClassName = (tiles[cellIndex(currentRow, numberedCellCol)].className);  // "tile b1 tx3 n?"
        var emptyCellClassName = (tiles[cellIndex(currentRow, emptyClCol)].className);  // "tile b1 tx4 n16"
        var numberedCellNum = getSquareNumber(currentRow, numberedCellCol);
        var modifiedNumberedCellClassName = numberedCellClassName.replace(/n\d{1,2}/, "n0");
        (tiles[cellIndex(currentRow, numberedCellCol)].className) = modifiedNumberedCellClassName;
        var modifiedEmptyCellClassName = emptyCellClassName.replace(/n\d{1,2}/, "n" + numberedCellNum);
        (tiles[cellIndex(currentRow, emptyClCol)].className) = modifiedEmptyCellClassName;
        updateBlankTileLoc();
    }
}
function slideCol(currentCol, emptyClCol, myThis) {
    var emptyLocationCode = '' + emptyClRow + emptyClCol;
    var tileText = '';
    var shiftNum = (currentRow - emptyClRow);
    var shiftNumSign = 0;
    if (shiftNum < 0) {
        shiftNumSign = -1
    } else if (shiftNum > 0) {
        shiftNumSign = 1
    } else {
        alert("shiftNumSign = 0");
        return;
    }
    if (currentCol !== emptyClCol) {
        alert("currentCol!=emptyClCol!   ");
    }
    updateBlankTileLoc();
    //var x = shiftNum;
    //var y = shiftNumSign;
    var numberedCellRow = 0;
    var i = Math.abs(shiftNum);
    for (i; i > 0; i--) {
        if (false) {
            for (var j = 0; j < tiles.length; j++) {
                if (j === 0) {
                    tileText += "<br />ARRAY:<br /> ";
                }
                tileText += tiles[j].className + "; eCol = " + emptyClRow + " eLoc = " + emptyLocationCode + "<br />";
            }
        }
        updateBlankTileLoc();
        numberedCellRow = parseInt(emptyClRow, 10) + parseInt(shiftNumSign, 10);
        var numberedCellClassName = (tiles[cellIndex(numberedCellRow, currentCol)].className);  // "tile b1 tx3 n?"
        var emptyCellClassName = (tiles[cellIndex(emptyClRow, currentCol)].className);  // "tile b1 tx4 n16"
        var numberedCellNum = getSquareNumber(numberedCellRow, currentCol);
        var modifiedNumberedCellClassName = numberedCellClassName.replace(/n\d{1,2}/, "n0");
        (tiles[cellIndex(numberedCellRow, currentCol)].className) = modifiedNumberedCellClassName;
        var modifiedEmptyCellClassName = emptyCellClassName.replace(/n\d{1,2}/, "n" + numberedCellNum);
        (tiles[cellIndex(emptyClRow, currentCol)].className) = modifiedEmptyCellClassName;
        updateBlankTileLoc();
    }
}
/*
function sortTiles() {
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    var frequencyTable = makeSortedArray();
    for (var i = 0; i < tiles.length; i++) {
        var number = frequencyTable[i];
        // assign a number to each tile in the letterbox -- randomly
        tiles[i].className = tiles[i].className.replace(/n\d{1,2}/, "n" + (number));
        tiles[i].onclick = tileClick;
    }
    updateBlankTileLoc();
    zeroMoves();
    if (puzzleIsComplete()) {
        win();
    }
}
*/
function solvedAlert() {
    replaceNodeText("solved", "Solved in");
}
/*************/
/* tileClick */
/*************/
function tileClick() {
    unHighlightAllTiles();
    if (isItScrambled()) {
        updateBlankTileLoc();
        unsetBlankTileImage();
        currentRow = parseInt(getRowNum(this), 10);
        currentCol = parseInt(getColNum(this), 10);
        // var clickedLocationCode = '' + currentRow + currentCol;
        // don't move any tiles if user clicked the blank tile
        if (cellIsEmpty(currentRow, currentCol)) {
            return;
        }
        if (cellNumIs16(this)) {
            return;
        }
        // slide row if user clicked row with the empty tile
        if (currentRow === emptyClRow) {
            //enableSolveButton();
            slideRow(currentRow, emptyClRow, this);
        } else if (currentCol === emptyClCol) {
            //enableSolveButton();
            slideCol(currentCol, emptyClCol, this);
        } else {
            return;
        }
        updateBlankTileLoc();
        if (puzzleIsComplete()) {
            win();
            solvedAlert();
        }
        incrementMoves();
        getSolution();
    }
}  // end function tileClick()
function updateBlankTileLoc() {
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].onclick = tileClick;
        var tileClassName = (tiles[i].className);
        var tileClasses = tileClassName.split(" ");
        var numberClass = tileClasses[3];
        var locationClass = tileClasses[2];
        var x = numberClass.substring(1, 3);
        if ((numberClass.substring(1, 3) === "0") ||
            (numberClass.substring(1, 3) === "16")) {
            emptyLocationCode = locationClass.substring(1, 3);
            emptyClRow = parseInt(emptyLocationCode.charAt(0), 10);
            emptyClCol = parseInt(emptyLocationCode.charAt(1), 10);
            return true;
        }
    }
    return false;
}
function getBlankTileLocCodeStr() {
    var blankTileLocCodeStr;
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].onclick = tileClick;
        var tileClassName = (tiles[i].className);
        var tileClasses = tileClassName.split(" ");
        var numberClass = tileClasses[3];
        var locationClass = tileClasses[2];
        if ((numberClass.substring(1, 3) === "0") ||
            (numberClass.substring(1, 3) === "16")) {
            blankTileLocCodeStr = locationClass.substring(1, 3);
        }
    }
    return blankTileLocCodeStr;
}
function getEmptyClRow() {
    return parseInt(getBlankTileLocCodeStr().charAt(0), 10);
}
function getEmptyClCol() {
    return parseInt(getBlankTileLocCodeStr().charAt(1), 10);
}
function unPlaceTiles() {
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].className = tiles[i].className.substring(0, 11);
    }
}
function win() {
    unHighlightAllTiles();
    updateBlankTileLoc();
    setBlankTileImage();
    setHintTooltipSolved();
    jQuery('li#autosolve').css('display', 'block');
    jQuery('li#scrambleCommand').css('display', 'block');
}
function zeroMoves() {
    var movesDiv = document.getElementById("moves");
    var movesNode = movesDiv.firstChild;
    movesNode.nodeValue = "0 Moves";
}
/* used with unhide to hide/unhide blocks of text */
function replaceNodeText(id, newText) {
    var node = document.getElementById(id);
    while (node.firstChild)
        node.removeChild(node.firstChild);
    node.appendChild(document.createTextNode(newText));
}
/* UTILITIES */
/* what follows is a package of utility functions */
/* source:  http://www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html  */
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
}
/***********/
/*  HINTS  */
/***********/

function setHintTooltip() {
    if (solution) {
        var hintString = " " + getHint(solution) + " ";
        jQuery("#hintLink").attr("title", hintString)
    }
}
function setHintTooltipSolved() {
    if (solution) {
        var hintString = " Solved! ";
        jQuery("#hintLink").attr("title", hintString)
    }
}
function getHint(solution) {
    if (debug && console && console.log) {
        // console.log("getHint(solution), solution = " + solution);
    }
    var solutionArr = solution.split(",");
    var tileIndex = solutionArr[0];
    var boardArrayIndex = parseInt(solutionArr[0], 10) + 1;
    var locCode = tileMap[tileIndex];
    var tileNum = getSquareNumberAsText(tileIndex);
    var hintString = ("hint = rowCol:" + locCode + "; arrayIndex:" + boardArrayIndex + "; tile#:" + tileNum);
    if (debug && console && console.log) {
        // console.log(hintString);
        //console.log("hint = (" + locCode + ")" + (parseInt(hint, 10)) + "#" + tileNum);
    }
    return tileNum;
}
function playSolution() {
    if (debug && console && console.log) {
        console.log("solution = " + solution);
    }
    jQuery('li#autosolve').css('display', 'none');
    jQuery('li#scrambleCommand').css('display', 'none');
    if ((isItScrambled()) && testArraySum136(getInputMapIntArray())) {
        //disableSolveButton();
        init();
        makeXmlHttpRequestDivHidden();
        runControl(getMsPerMoveInt());
        if (debug && console && console.log) {
            console.log("scrambledMapString = " + makeScrambledMapString());
        }
        inputMapIntArr = getInputMapIntArray(); // makeInputMapIntArray(scrambledMapString);
    }
    //jQuery('li#autosolve').css('display','block');
}
// using jQuery Ajax
function getSolution() {
    //debug = true;
    //getProblemAndSolution();
    var scrambledMapString = makeScrambledMapString();
    if (debug && console && console.log) {
        // console.log("scrambledMapString = " + scrambledMapString);
    }
    var inputMapIntArr = makeInputMapIntArray(scrambledMapString);
    // inputMapIntArr = makeInputMapIntArray(scrambledMapString);
    if ((isScrambled(inputMapIntArr)) && testArraySum136(inputMapIntArr)) {
        //disableSolveButton();
        var parameters = "content=" + scrambledMapString;
        if (debug && console && console.log) {
            // console.log("parameters = " + parameters);
        }
        //makeXmlHttpRequestDivVisible();
        $.ajax({
            type: "POST",
            url: "http://104.238.80.20:8080/johns15puzz/solve",
            data: parameters
        }).done(function (msg) {
                solution = msg;
                if (debug && console && console.log) {
                    // console.log("msg/solution = " + solution);
                }
                hint = getHint(solution);
                setHintTooltip();
            });
    }
}
function makeScrambledMapString() {
    scrambledMapString = "";
    // get scrambled tile values from web page
    tiles = document.getElementById("letterbox").getElementsByTagName("a");
    for (var i = 0; i < tiles.length; i++) {
        var tileClassName = (tiles[i].className);
        var tileClasses = tileClassName.split(" ");
        var numberClass = tileClasses[3];
        //var locationClass = tileClasses[2];
        //var emptyLocationCode = "";
        scrambledMapString += numberClass.substring(1, 3);
        if (i < tiles.length - 1) {
            scrambledMapString += ",";
        }
    }
    return scrambledMapString;
}
// blank tile value is 0 until the puzzle is solved when the blank tile value becomes 16
// this is a model integrity test
function testArraySum136(inputMapIntArr) {
    var inArrayIntSum = 0;
    for (var i = 0; i < inputMapIntArr.length; i++) {
        //inArrayStr += inputMapIntArr[i] + ", ";
        inArrayIntSum += inputMapIntArr[i];
    }
    //inArrayStr += (" Sum = " + inArrayIntSum);
    if ((inArrayIntSum === 120) || (inArrayIntSum === 136)) {
        return true;
    } else {
        alert("Data error.  Tiles don't sum to 120 or 136. " + inArrayIntSum + " " + printArray(inputMapIntArr));
        return false;
    }
}
function getInputMapIntArray() {
    return makeInputMapIntArray(makeScrambledMapString());
}
// convert the string of scrambled tile values "12,14,13,9,5,6,3,0,15,10,11,2,8,7,4,1" into a string array
function makeInputMapIntArray(scrambledMapString) {
    var inputMapStrArr = scrambledMapString.split(",");
    // convert the string array of scrambled tile values into an INTEGER array
    for (var i = 0; i < inputMapStrArr.length; i++) {
        inputMapIntArr[i] = parseInt(inputMapStrArr[i], 10);
    }
    return inputMapIntArr;
}
function isItScrambled() {
    return isScrambled(getInputMapIntArray());
}
function isScrambled(inputMapIntArr) {
    //alert("running isScrambled" + inputMapIntArr.toString());
    var k = 0;
    var i;
    for (i = 0; i < inputMapIntArr.length; i++) {
        k = i + 1;
        if (inputMapIntArr[i] !== (k)) {
            if (debug && console && console.log) {
                // console.log("isScrambled(inputMapIntArr) returning true");
            }
            return true;
        }
    }
    return false;
}
function alertNotScrambled() {
    alert("<div id='alertNotScrambled' style='margin:0px auto; display:block; width: 178px;'>" +
        "<img src='images/error-60x.png' " +
        "align='middle' alt='Error!!!'/>" +
        "<span style='font-weight:bold;font-size:24px;position:relative; top:10px;left:10px;'>OOPS!</span></div><br />" +
        "You clicked \"Solve\".<br />This 15 Tile Puzzle is already solved, however.<br />" +
        "The tiles are in numerical order and are not scrambled.<br />" +
        "The current tile order is: <br />" + inputMapIntArr.toString() + "<br />(where 0 or 16 = the empty space)<br /><br />" +
        "No tiles, therefore, can be moved and no solution<br />or hint can be computed.<br />" +
        "To play, click \"Scramble\" or <em>Refresh</em> the Page.<br />" +
        "<br />Or click one of the alternate game board icons.");
    jQuery('.ui-dialog').css('left', '40px;');
    //jQuery(".ui-dialog").css('width', '600px;');
    jQuery('.ui-dialog').css('width', '600px');
}

function getPuzzleComplete() {
    return puzzleComplete;
}




/*************/
/* DEBUGGING */
/*************/

function showData() {
    //jQuery('p#dataHere').append(msPerMoveInt);
    //jQuery('p#dataHere').innerHTML = msPerMoveInt;
    if (debug && console && console.log) {
        console.log("1483 msPerMoveInt = " + getMsPerMoveInt() + "; secPerMoveFl = " + getSecondsPerMoveFloat() + "; OK = " +
            (getMsPerMoveInt() == getSecondsPerMoveFloat() * 1000));
    }
}
/**********************/
/* NOT USED */
/**********************/
// display the tile values from map[] in a matrix on the HTML page with a position code matrix to the right

/*
 By John Kraus
 john@johnfkraus.com
 www.johnfkraus.com
 The 15 Puzzle is solved in a Java class, puzzle.PuzzleSolver.
 PuzzleSolver is deployed on a server and
 called by puzzle.SolvePuzzleServlet.  John Kraus extracted the
 solution algorithm in PuzzleSolver from a Java applet by Karl Hornell
 http://www.javaonthebrain.com/index.html
 John Kraus translated the applet into a Java business class,
 "puzzle.PuzzleSolver".
 TO DO:
 Convert to object-oriented JavaScript or add a namespace to help prevent naming collisions
 Add Ajax to asynchronously obtain the puzzle solution upon initialization
 and every time state changes.
 Add capability for user to request a hint for the next puzzle move.
 Debug filters
 Debug logging

 */

