// puzzle/js
// Ajax-JavaScript-CSS Puzzle by John Kraus
// john@johnfkraus.com johnkraus3@gmail.com www.johnfkraus.com
// October 2009, December 2012, March 2013


// ============
// SOLVE PUZZLE
// ============

// java to javascript lessons learned:
// in javascript, if you want an array filled with zeros, you must explicitly insert the zeros.
// puzzle solver:
// jQuery(document).ready(function () {
// debugger;
// console.log('Hello from MarPuzzleSolver.js, line ' + new Error().lineNumber);
// alert('Hello from MarPuzzleSolver.js, line ' + new Error().lineNumber);
// console.log('thisline = ' + new Error().lineNumber);

var autoDisplace = [0, 5, 12, 21, 32, 32, 27, 20, 11, 0 ];
var detour;
var detour1 = [11, 10, 6, 7, 11, 10, 6, 7, 3, 2, 6, 7, 11, -1];
var detour2 = [15, 14, 10, 11, 15, 14, 10, 11, 7, 6, 10, 11, 15, -1];
var detour3 = [6, 2, 3, 7, -1];
var detour4 = [3, 7, -1];
var detour5 = [10, 6, 7, 11, -1];
var detour6 = [7, 11, -1];
var detour7 = [13, 12, 8, 9, -1];
var detour8 = [8, 9, -1];
var detour9 = [10, 14, 13, 9, 10, 14, 13, 9, 8, 12, 13, 9, 10, -1];
var detour10 = [14, 13, 9, 10, -1];
var detour11 = [9, 10, -1];
var detour12 = [11, 15, 14, 10, 11, 15, 14, 10, 9, 13, 14, 10, 11, -1];
// var dragControl = true;
// private int[] inputMap;
// private int[] moves = new int[400];
// var moves = Array.apply(null, Array(400)).map(Number.prototype.valueOf,0);
// var moveCount = 0;
// var moveNum = 0;
var holder = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var i, j;
var map = Array.apply(null, Array(36)).map(Number.prototype.valueOf,0);
var moves = Array.apply(null, Array(400)).map(Number.prototype.valueOf,0);
var ppath = Array.apply(null, Array(9)).map(Number.prototype.valueOf,0);
var problemAndSolution;
var roundabout = [11, 10, 14, 15, -1];
var roundDisp = [-4, -3, 1, 5, 4, 3, -1, -5, -4, -3, 1, 5, 4, 3, -1, -5, -4, -3, 1, 5, 4, 3, -1, -5, -4];
var rounddx = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0];
var solution = [];
var subGoals = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 8, 0, 9, 13, 0, 10, 14, 0, 11, 12, 15, 0, 16];
// var testMap3 = [1, 12, 11, 13, 5, 2, 7, 9, 10, 15, 3, 14, 6, 8, 4, 0];
// var thisline = new Error().lineNumber;

assert(holder.length == 20, "assertion error, holder length = " + holder.length);
// var displace;

function dec2bin(dec){
    // return (dec >>> 0).toString(2);
    return "0b" + (dec >>> 0).toString(2);
}

function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

function makeDetour(dList, hole) {
    i = 0;
    j = hole;
    while (dList[i] >= 0) {
        holder[j] = holder[dList[i]];
        holder[dList[i]] = 0;
        j = dList[i];
        moves[this.moveCount++] = dList[i++];
    }
}


function moveHole(tg, ppos) {
    // document.getElementById("map").innerHTML = "map = " + map;
    k = 0;
    posCount = 0;
    negCount = 0;
    // document.getElementById("holder").innerHTML = "holder = " + holder;
    i = locate(0);
    // alert('line ' + new Error().lineNumber + (i & 3));
    // alert('line ' + new Error().lineNumber + (ppos & 3));
    var while_counter = 0;
    while (Math.abs((i & 3) - (ppos & 3)) > 1 || Math.abs(i / 4 - ppos / 4) > 1) {
        // document.getElementById("map").innerHTML = "map = " + map;
        // document.getElementById("holder").innerHTML = "holder = " + holder;
        // console.log('line ' + new Error().lineNumber + ", i = " + i);
        while_counter += 1;
        if (while_counter > 500) {
            // document.getElementById("message").innerHTML = "62 Exited when while_counter = " + while_counter;
            // exit();
            alert("102 while_counter = " + while_counter);
        }
        //if ((i & 3) != 0) {
            // alert("i & 3 != 0");
        //}
        if (false) {
            if (confirm('line ' + new Error().lineNumber + ", Math.abs((i & 3) - (ppos & 3)) = " + Math.abs((i & 3) - (ppos & 3)))) {
                // resume
            } else {
                // document.getElementById("message").innerHTML = "78 Exited intentionally";
                alert('exit()');
            }
        }

        k = (i & 3) < (tg & 3) && holder[i + 1] > 0 ? i + 1 : ((i & 3) > (tg & 3) && holder[i - 1] > 0 ? i - 1 : (i / 4 < tg / 4 && holder[i + 4] > 0 ? i + 4 : i - 4));
        moves[moveCount++] = k;
        holder[i] = holder[k];
        holder[k] = 0;
        i = k;
    }
    if (i != tg) {
        j = 8;
        while (i != ppos + roundDisp[j]) {
            // alert('line ' + new Error().lineNumber);
            ++j;
        }
        k = j;
        while (ppos + roundDisp[k] != tg) {
            // alert('line ' + new Error().lineNumber);
            if (ppos + roundDisp[++k] >= 0 && ppos + roundDisp[k] < 16 && (ppos & 3) + rounddx[k] < 4 && (ppos & 3) + rounddx[k] >= 0 && holder[ppos + roundDisp[k]] > 0) {
                ++posCount;
                continue;
            }
            posCount+=50;
        }
        k = j;
        while (ppos + roundDisp[k] != tg) {
            if (ppos + roundDisp[--k] >= 0 && ppos + roundDisp[k] < 16 && (ppos & 3) + rounddx[k] < 4 && (ppos & 3) + rounddx[k] >= 0 && holder[ppos + roundDisp[k]] > 0) {
                ++negCount;
                continue;
            }
            negCount+=50;
        }
        l = posCount <= negCount ? 1 : -1;
        while (i != tg) {
            // alert('line ' + new Error().lineNumber);
            k = ppos + roundDisp[j+=l];
            moves[moveCount++] = k;
            holder[i] = holder[k];
            holder[k] = 0;
            i = k;
        }
    }
}

function moveTo(p, t) {

    i3 = 0;
    whereNow = i3 = locate(p);
    j3 = 0;
    while ((i3 & 3) != (t & 3)) {
        i3 = (i3 & 3) < (t & 3) ? ++i3 : --i3;
        ppath[j3++] = i3;
    }
    while (i3 > t) {
        ppath[j3++] = i3-=4;
    }
    holder[whereNow] = -1;
    for (i3 = 0; i3 < j3; ++i3) {
        moveHole(ppath[i3], whereNow);
        moves[moveCount++] = whereNow;
        holder[whereNow] = 0;
        holder[ppath[i3]] = -1;
        whereNow = ppath[i3];
        // document.getElementById("moves").innerHTML = "moves = " + moves;
        // printHolderAlone();
    }
}

function solvePuzzle(inputMap) {
    problemAndSolution = inputMap.toString();
    init_solver();
    // random int between 1 and 3000
    seed = Math.floor(Math.random() * 3000) + 1;
    // console.log('109 seed = ' + seed);
    // map =
    fillMap(inputMap);
    // console.log("112 >>>>>>>>>>>>>>>> 94 fillMap map = " + map.toString());
    // printMap();
    solve();
    // printMap();
    // document.getElementById("moves").innerHTML = "moves = " + moves;
    // run();

    solution = new Array(moveCount);
    for (var i = 0; i < moveCount; ++i) {
        solution[i] = moves[i];
    }
    console.log("typeof solution = " + (typeof solution));
    console.log("solution = " + solution);
    return solution;
    /*
    solution = new int[moveCount];
    for (int i = 0; i < moveCount; ++i) {
        solution[i] = moves[i];
    }
    appendToProblemAndSolution("|" + formatInteger(solution.length) + "|" + Arrays.toString(solution));
    return solution;
    */
}
function inMap(h, v) {
    myArray = new Array(36);
    i = 0;
    while (i < myArray.length) {
        myArray[i] = i++;
    }
    return map[7 + h + 6 * v];
}

function locate(num) {
    assert(holder.length == 20, "assertion error, holder length = " + holder.length);
    li = 0;
    while (li < holder.length - 1 && holder[li] != num) {
        ++li;
    }
    return li;
}

function solve() {
    var solve_while_counter_4 = 0;
    var holder_index = 0;
    var value_for_holder_from_inmap = 0;
    // alert('solve() line ' + new Error().lineNumber);
    // document.getElementById("holder").innerHTML = "holder = " + holder;
    try {
        var i2 = 0;
        // solve while #1
        while (i2 < 4) {
            // alert('line ' + new Error().lineNumber);
            // console.log("229 solve while i2 < 4, i2 = " + i2);
            var j2 = 0;
            // solve while #1 inner 1
            while (j2  < 4) {
                // // console.log("213 inMap[] = " + my)
                // console.log("214 i2 = " + i2 + ", j2 = " + j2 + "inMap(j2, i2) = " + inMap(j2, i2));
                // console.log("215 inMap(j2=" + j2 + ", i2=" + i2 + "] = " + inMap(j2,i2));
                holder_index = i2 * 4 + j2;
                // console.log("216 holder_index = " + holder_index);
                // console.log("217 solve inMap(j2=" + j2 + ", i2=" + i2 + ") = " + inMap(j2,i2));
                value_for_holder_from_inmap = inMap(j2, i2);
                holder[holder_index] = inMap(j2, i2);
                // document.getElementById("holder").innerHTML = "holder = " + holder;



                // holder[i * 4 + j] = inMap(j, i);
                // ++j;
                j2+=1;
            }
            // ++i;
            i2+=1;
            // console.log("91 i2 = " + i2 + ", j2 = " + j2);
        }

        goalsDone = 0;
        i = 0;
        j = 0;
        // solve while #2
        while (holder[subGoals[i] - 1] == subGoals[i]) {
            // alert('line ' + new Error().lineNumber);
            // console.log("91 holder = " + holder.toString() + ", goalsDone = " + goalsDone);
            // // printHolderAlone();
            ++i;
            if (subGoals[i] != 0) continue;
            j = i++;
            ++goalsDone;
            // alert('line ' + new Error().lineNumber);
            // console.log("214 goalsDone = " + goalsDone);
            // document.getElementById("holder").innerHTML = "holder = " + holder;

        }
        i = 0;


        // solve while #3
        while (i < j) {
            if (subGoals[i] > 0) {
                holder[subGoals[i] - 1] = -1;
                // document.getElementById("holder").innerHTML = "holder = " + holder;

            }
            ++i;
        }
        moveCount = 0;
        // console.log("93 displace & 31 = " + (displace & 31));
        if ((displace & 31) > 0) {
            goalsDone = 9;
        }
        // console.log("97 goalsDone = " + goalsDone);
        // solve while #4
        while (goalsDone < 9) {
            // alert('solve() line ' + new Error().lineNumber);
            // document.getElementById("message").innerHTML = "solve_while_counter_4 = " + ++solve_while_counter_4;
            // console.log("holder = " + holder.toString() + ", goalsDone = " + goalsDone);
            // // printHolderAlone();
            detour = false;
            switch (goalsDone) {
                case 0: {
                    // console.log("holder = " + holder.toString() + ", goalsDone = " + goalsDone);
                    moveTo(1, 0);
                    // document.getElementById("holder").innerHTML = "holder = " + holder;
                    break;
                }
                case 1: {
                    // console.log("case 1 holder = " + holder.toString());
                    moveTo(2, 1);
                    // document.getElementById("holder").innerHTML = "holder = " + holder;
                    break;
                }
                case 2: {
                    // console.log("case 2 holder = " + holder.toString());
                    // alert("113 holder")
                    // new new
                    // debugger;
                    moveTo(3, 3);
                    holder[3] = -1;
                    i = locate(0);
                    detour = false;
                    if (i == 7) {
                        if (holder[2] == 4) {
                            makeDetour(detour3, 7);
                            detour = true;
                            // document.getElementById("holder").innerHTML = "holder = " + holder;
                        }
                    } else if (i == 2) {
                        if (holder[6] == 4) {
                            makeDetour(detour4, 2);
                            detour = true;
                            // document.getElementById("holder").innerHTML = "holder = " + holder;
                        }
                    } else if (holder[2] == 4) {
                        moveTo(4, 6);
                        makeDetour(detour4, 2);
                        detour = true;
                    }
                    if (detour) {
                        makeDetour(detour1, 7);
                    } else {
                        moveTo(4, 7);
                    }
                    holder[3] = 3;
                    holder[7] = -1;
                    moveTo(3, 2);
                    holder[7] = 4;
                    moveTo(4, 3);
                    break;
                    // document.getElementById("holder").innerHTML = "holder = " + holder;

                }
                case 3: {
                    // console.log("145 case 3 holder = " + holder.toString());
                    moveTo(5, 4);
                    // document.getElementById("holder").innerHTML = "holder = " + holder;
                    break;
                }
                case 4: {
                    // console.log("150 case 4 holder = " + holder.toString());
                    moveTo(6, 5);
                    break;
                }
                case 5: {
                    // console.log("155 case 5 holder = " + holder.toString());
                    moveTo(7, 7);
                    holder[7] = -1;
                    i = locate(0);
                    detour = false;
                    if (i == 11) {
                        if (holder[6] == 8) {
                            makeDetour(detour5, 11);
                            detour = true;
                        }
                    } else if (i == 6) {
                        if (holder[10] == 8) {
                            makeDetour(detour6, 6);
                            detour = true;
                        }
                    } else if (holder[6] == 8) {
                        moveTo(8, 10);
                        makeDetour(detour6, 6);
                        detour = true;
                    }
                    if (detour) {
                        makeDetour(detour2, 11);
                    } else {
                        moveTo(8, 11);
                    }
                    holder[7] = 7;
                    holder[11] = -1;
                    moveTo(7, 6);
                    holder[11] = 8;
                    moveTo(8, 7);
                    break;
                }
                case 6: {
                    // console.log("188 case 6 holder = " + holder.toString());
                    moveTo(13, 8);
                    holder[8] = -1;
                    i = locate(0);
                    detour = false;
                    if (i == 9) {
                        if (holder[12] == 9) {
                            makeDetour(detour7, 9);
                            detour = true;
                        }
                    } else if (i == 12) {
                        if (holder[13] == 9) {
                            makeDetour(detour8, 12);
                            detour = true;
                        }
                    } else if (holder[12] == 9) {
                        moveTo(9, 13);
                        makeDetour(detour8, 12);
                        detour = true;
                    }
                    if (detour) {
                        makeDetour(detour9, 9);
                    } else {
                        moveTo(9, 9);
                    }
                    holder[8] = 13;
                    holder[9] = -1;
                    moveTo(13, 12);
                    holder[9] = 9;
                    moveTo(9, 8);
                    // console.log("218 holder = " + holder.toString());
                    break;
                }
                case 7: {
                    // console.log("222 case 7 holder = " + holder.toString());
                    moveTo(14, 9);
                    i = locate(0);
                    detour = false;
                    if (i == 10) {
                        if (holder[13] == 10) {
                            makeDetour(detour10, 10);
                            detour = true;
                        }
                    } else if (holder[14] == 10) {
                        makeDetour(detour11, 13);
                        detour = true;
                    }
                    if (detour) {
                        makeDetour(detour12, 10);
                    } else {
                        moveTo(10, 10);
                    }
                    holder[9] = 14;
                    holder[10] = -1;
                    moveTo(14, 13);
                    holder[10] = 10;
                    moveTo(10, 9);
                    // console.log("284 end of case 7 holder = " + holder.toString());
                    break;
                }
                case 8: {
                    // console.log("249 case 8 holder = " + holder.toString());
                    while (holder[15] != 0) {
                        // alert('case 8, line ' + new Error().lineNumber);
                        if (holder[10] == 0) {
                            moves[moveCount++] = 11;
                            holder[10] = holder[11];
                            holder[11] = 0;
                        }
                        if (holder[11] == 0) {
                            moves[moveCount++] = 15;
                            holder[11] = holder[15];
                            holder[15] = 0;
                        }
                        if (holder[14] != 0) continue;
                        moves[moveCount++] = 15;
                        holder[14] = holder[15];
                        holder[15] = 0;
                    }
                    while (holder[14] != 15) {
                        // alert('line ' + new Error().lineNumber);
                        makeDetour(roundabout, 15);
                    }
                    // console.log("269 holder = " + holder.toString());
                    break;
                }
                default: {
                    // console.log("312 case default holder = " + holder.toString());
                    // document.getElementById("holder").innerHTML = "holder = " + holder;
                }
            }
            // console.log("315 goals done holder = " + holder.toString());
            // document.getElementById("holder").innerHTML = "holder = " + holder;
            ++goalsDone;
        }
        if (moveCount > 0) {
            // console.log("319 holder = " + holder.toString());
            moveNum = 0;
            // getNextMove();
            oldDragControl = dragControl;
            dragControl = false;
            // document.getElementById("holder").innerHTML = "holder = " + holder;
        }
    }
    catch (err) {
        console.log("line 505 error = " + err  + ", goalsDone = " + goalsDone)
        // empty catch block
    }
}


function init_solver() {
    i = 0;
    while (i < 6) {
        map[i] = 1;
        map[i * 6] = 1;
        ++i;
    }
    i = 0;
    while (i < 4) {
        j = 0;
        while (j < 4) {
            map[7 + i * 6 + j] = i * 4 + j + 1 & 15;
            ++j;
        }
        ++i;
    }
}

// fillMap param is an array of integers
function fillMap(fillMap) {
    mapCounter = 0;
    i = 0;
    while (i < 4) {
        j = 0;
        while (j < 4) {
            map[7 + i * 6 + j] = fillMap[mapCounter];
            ++mapCounter;
            ++j;
        }
        ++i;
    }
    // console.log(">>>>>>>>>>>>>>>> 94 fillMap map = " + map.toString());
    return map;
}

// parameter for solvePuzzle is an array
// var resultArray = solvePuzzle(testMap3);
// jQuery("#copyright_year").html((new Date).getFullYear());
// document.getElementById("result_array").innerHTML = "resultArray = " + resultArray;
// console.log("resultArray = " + resultArray);


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
// var autoDisplace = []; // new Array(0);
var automatic = false;
var c = 0;
var cellText = "";
var counter = 0;
var currentCol = 0;
var currentMove = "";
var currentRow = 0;
var debug = false;
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
// var map = new Array(36);
var moveCount = 0;
var moveNum = 0;
// var moves = []; //new Array();
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
// var solution = [];
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
    solution = [];
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
/*
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
*/

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
    let i;
    let j;
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
    if (!tileMap) {
        tileMap = [];
    }
    tileMap.splice(0, 0, "11", "12", "13", "14", "21", "22", "23", "24", "31", "32", "33", "34", "41", "42", "43", "44");
    // console.log("solution = " + solution);
    // console.log("typeof solution = " + (typeof solution)); // object
    if (typeof solution == 'array') {
        moves = solution.split(",");
        moveStack = solution.split(",");
        moveCount = moves.length;
        for (i = 0; i < moves.length; i++) {
            moves[i] = moves[i].trim();
        }
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
    console.log("typeof moveStack = " + (typeof moveStack));
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
// function inMap(h, v) {
//    var index = parseInt(7 + h + 6 * v, 10);
//    return map[index];
//}
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
            currentMoveDivClassName = document.getElementById(locCode).className.trim();
        } catch (err) {
            txt = "659 - There was an error on this page.\n\n";
            txt += "in highlightCurrentMoveLocationCode(locCode = " + locCode + "}\n\n";
            txt += "Error description: " + err.message + "\n\n";
            txt += "locCode = " + locCode + "\n\n";
            txt += "Click OK to continue.   1250\n\n";
            alert(txt);
        }
        console.log("currentMoveClassName = [" + currentMoveDivClassName + "]");
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
    // var numberedCellTileClasses;
    var numberedCellClassName;
    if (debug && window.console && console.log) {
        console.log("698 currentMove = " + currentMove);
        console.log("699 tileMap[] = " + tileMap.toString());
    }
    var currentMoveId = tileMap[currentMove];
    if (updateBlankTileLoc() === false) {
        alert("1283 can't find empty tile");
    }
    try {
        numberedCellClassName = document.getElementById(currentMoveId).className;  // "tile b1 tx3 n?"
    }
    catch (err) {
        txt = "726 - There was an error on this page.<br /><br />";
        txt += "Error description: " + err.message + "<br /><br /><br />";
        txt += "Click OK to continue.  1291<br /><br />";
        alert(txt);
        //initPageScramble();
    }
    var emptyCellClassName = document.getElementById(emptyLocationCode).className;  // "tile b1 tx4 n16"
    var numberClass = "";
    var numberedCellTileClasses = [];
    try {
        console.log("numberedCellClassName = " + numberedCellClassName);
        numberedCellTileClasses = numberedCellClassName.split(/ +/);
        console.log("numberedCellTileClasses = " + numberedCellTileClasses);
    }
    catch (err) {
        console.error(err);
        txt = "737 - There was an error on this page.<br /><br />";
        txt += "Error description: " + err.message + "<br /><br />";
        txt += "Click OK to continue.<br /><br />";
        alert(txt);
        //initPageScramble();
    }
    console.log("numberedCellTileClasses = " + numberedCellTileClasses);
    console.log("numberedCellTileClasses[3] = " + numberedCellTileClasses[3]);
    numberClass = numberedCellTileClasses[3];
    console.log("numberClass = " + numberClass);
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
    // var xmlDivStyle = document.getElementById("xmlHttpRequestDiv").style;
    // xmlDivStyle.visibility = 'hidden';
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
    return locationCode.charAt(0);
    // var rowNum = (locationCode.charAt(0));
    // return rowNum;
}
function getColNum(myThis) {
    var locationCode = getLocationCode(myThis);
    // var colNum = (locationCode.charAt(1));
    // return colNum;
    return locationCode.charAt(1);
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
    // var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 12, 13, 14, 15]; // array of numbers
    // return arr2;
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 12, 13, 14, 15]; // array of numbers
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
        alert("1596 shiftNumSign = 0");
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
        alert("1656 shiftNumSign = 0");
        return;
    }
    if (currentCol !== emptyClCol) {
        alert("1660 currentCol!=emptyClCol!   ");
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
};
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
};
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
};
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
    var scrambledMapArray = scrambledMapString.split(",");
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
        console.log("parameters = " + parameters);
        console.log("scrambledMapArray = " + scrambledMapArray);
        // solution = solvePuzzle(parameters);
        solution = solvePuzzle(scrambledMapArray);
        console.log("solution = " + solution);
        // if puzzle is solved on remote server:
        if (false) {
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
        alert("1943 Data error.  Tiles don't sum to 120 or 136. " + inArrayIntSum + " " + printArray(inputMapIntArr));
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
    alert("<div id='alertNotScrambled' style='margin:0 auto; display: block; width: 178px; z-index: 1000;'>" +
        "<img src='images/error-60x.png' " +
        "align='middle' alt='Error!!!'/>" +
        "<span style='font-weight:bold;font-size:24px;position:relative; top:10px;left:10px;z-index: 1000'>OOPS!</span></div><br />" +
        "You clicked \"Solve\".<br />This 15 Tile Puzzle is already solved, however.<br />" +
        "The tiles are in numerical order and are not scrambled.<br />" +
        "The current tile order is: <br />" + inputMapIntArr.toString() + "<br />(where 0 or 16 = the empty space)<br /><br />" +
        "No tiles, therefore, can be moved and no solution<br />or hint can be computed.<br />" +
        "To play, click \"Scramble\" or <em>Refresh</em> the Page.<br />" +
        "<br />Or click one of the alternate game board icons.");
    jQuery('.ui-dialog').css('left', '40px;');
    //jQuery(".ui-dialog").css('width', '600px;');
    jQuery('.ui-dialog').css('width', '600px');
    jQuery('.ui-dialog').css('z-index', '1000');
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
 The 15 Puzzle used to be solved in a Java class, puzzle.PuzzleSolver. PuzzleSolver was deployed on a server and
 called by puzzle.SolvePuzzleServlet.  John Kraus extracted the solution algorithm in PuzzleSolver from a Java applet by Karl Hornell
 http://www.javaonthebrain.com/index.html
 John Kraus translated the applet into a Java business class,
 "puzzle.PuzzleSolver".
 Later John Kraus converted the puzzle solving algorithm to JavaScript.
 So no more Java here.
 TO DO:
 Convert to object-oriented JavaScript or add a namespace to help prevent naming collisions
 There are too many global variables.
 Add capability for user to request a hint for the next puzzle move.

 */

