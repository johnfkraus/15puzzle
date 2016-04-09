// java to javascript lessons learned:
// in javascript, if you want an array filled with zeros, you must explicitly insert the zeros.

jQuery(document).ready(function () {
	// debugger;

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
	// alert('line 13 ' + new Error().lineNumber);
	var thisline = new Error().lineNumber;
	// console.log('Hello from MarPuzzleSolver.js, line ' + new Error().lineNumber);
	// alert('Hello from MarPuzzleSolver.js, line ' + new Error().lineNumber);
	// console.log('thisline = ' + new Error().lineNumber);
    var testMap3 = [1, 12, 11, 13, 5, 2, 7, 9, 10, 15, 3, 14, 6, 8, 4, 0];
    var subGoals = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 8, 0, 9, 13, 0, 10, 14, 0, 11, 12, 15, 0, 16];
 
    
    
    var autoDisplace = [0, 5, 12, 21, 32, 32, 27, 20, 11, 0 ];
    var subGoals = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 8, 0, 9, 13, 0, 10, 14, 0, 11, 12, 15, 0, 16];

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
    var dragControl = true;
    // private int[] inputMap;
    // private int[] moves = new int[400];
    var moves = Array.apply(null, Array(400)).map(Number.prototype.valueOf,0);
    var moveCount = 0;
    var moveNum = 0;
    var roundabout = [11, 10, 14, 15, -1];
    var roundDisp = [-4, -3, 1, 5, 4, 3, -1, -5, -4, -3, 1, 5, 4, 3, -1, -5, -4, -3, 1, 5, 4, 3, -1, -5, -4];
    var rounddx = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0];
        
    // var moves = new Array(400);
    var moves = Array.apply(null, Array(400)).map(Number.prototype.valueOf,0);    
    // var ppath = new Array(9);
    var ppath = Array.apply(null, Array(9)).map(Number.prototype.valueOf,0);
    var problemAndSolution;
    // var map = [];
	// var map = new Array(36);
    var map = Array.apply(null, Array(36)).map(Number.prototype.valueOf,0);
	document.getElementById("map").innerHTML = "map = " + map;
	// var holder = new Array(20);
    var holder = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	document.getElementById("holder").innerHTML = "holder = " + holder;
	assert(holder.length == 20, "assertion error, holder length = " + holder.length);
	// alert('line ' + new Error().lineNumber);
	// console.log("11 holder = " + holder.toString())
    var i, j;
    var displace;
    document.getElementById("demo").innerHTML = testMap3;

    function moveHole(tg, ppos) {
    	document.getElementById("map").innerHTML = "map = " + map;
        k = 0;
        posCount = 0;
        negCount = 0;
    	document.getElementById("holder").innerHTML = "holder = " + holder;
        i = locate(0);
        // alert('line ' + new Error().lineNumber + (i & 3));
        // alert('line ' + new Error().lineNumber + (ppos & 3));
        var while_counter = 0;
        while (Math.abs((i & 3) - (ppos & 3)) > 1 || Math.abs(i / 4 - ppos / 4) > 1) {
        	document.getElementById("map").innerHTML = "map = " + map;
        	document.getElementById("holder").innerHTML = "holder = " + holder;
        	// console.log('line ' + new Error().lineNumber + ", i = " + i);
        	while_counter += 1;
        	if (while_counter > 100) {
            	document.getElementById("message").innerHTML = "62 Exited when while_counter = " + while_counter;
        		exit();
        		// alert("59 while_counter = " + while_counter);
        	}
        	document.getElementById("while_counter").innerHTML = "while_counter = " + while_counter;
        	document.getElementById("i_value").innerHTML = i + ", " + dec2bin(i);
            document.getElementById("i_&3").innerHTML = " (" + i + " & 3 ) = " + " (" + dec2bin(i) + " & " + dec2bin(3)  + ") = " + (i & 3);
            document.getElementById("ppos").innerHTML = ppos;
            if ((i & 3) != 0) {
            	// alert("i & 3 != 0");
            }
            
            // alert('line ' + new Error().lineNumber + ", Math.abs((i & 3) - (ppos & 3)) = " + Math.abs((i & 3) - (ppos & 3)));

            if (false) {            
                if (confirm('line ' + new Error().lineNumber + ", Math.abs((i & 3) - (ppos & 3)) = " + Math.abs((i & 3) - (ppos & 3)))) {
                    // resume
                } else {
                	document.getElementById("message").innerHTML = "78 Exited intentionally";
            		exit();
                }           
            } 
             
            // alert('line ' + new Error().lineNumber);
            k = (i & 3) < (tg & 3) && holder[i + 1] > 0 ? i + 1 : ((i & 3) > (tg & 3) && holder[i - 1] > 0 ? i - 1 : (i / 4 < tg / 4 && holder[i + 4] > 0 ? i + 4 : i - 4));
            // // console.log('line ' + new Error().lineNumber + ", k = " + k);
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
    	document.getElementById("line_number").innerHTML = 'line ' + new Error().lineNumber;
        // alert('line ' + new Error().lineNumber);
        // printHolderAlone();
    }

    function moveTo(p, t) {
    	document.getElementById("holder").innerHTML = "holder = " + holder;
    	// alert('line ' + new Error().lineNumber);
        // console.log("76 moveTo(p=" + p + ", t=" + t + ")");
        i3 = 0;
        whereNow = i3 = locate(p);
        j3 = 0;
        // console.log("i3 = " + i3 + " t = " + t + " (i3 & 3) = " + (i3 & 3));
        while ((i3 & 3) != (t & 3)) {
        	// alert('line ' + new Error().lineNumber);
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
            document.getElementById("moves").innerHTML = "moves = " + moves;
            // printHolderAlone();
        }
    }

    function solvePuzzle(inputMap) {
    	// alert('line ' + new Error().lineNumber);
    	// public int[] solvePuzzle(int[] inputMap) {
        // inputMap = inputMap;
        problemAndSolution = inputMap.toString();
    	document.getElementById("holder").innerHTML = "holder = " + holder;
        // setProblemAndSolution(new StringBuilder().append(Arrays.toString(inputMap)));
        // System.out.println("problemAndSolution = " + problemAndSolution.toString());
        // System.out.println("problemAndSolution = " + problemAndSolution.getClass());
        init();
        // random int between 1 and 3000
        seed = Math.floor(Math.random() * 3000) + 1;
        // console.log('109 seed = ' + seed);
        // map = 
        fillMap(inputMap);
        // console.log("112 >>>>>>>>>>>>>>>> 94 fillMap map = " + map.toString());        
        // printMap();
        solve();
        // printMap();
        document.getElementById("moves").innerHTML = "moves = " + moves;
        // run();
        document.getElementById("movecount").innerHTML = "moveCount = " + moveCount;

        var solution = new Array(moveCount);
        for (var i = 0; i < moveCount; ++i) {
            solution[i] = moves[i];
        }
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
        // console.log("185 inMap() map[7 + h=" + h + " + 6 * v="+v+"] = map[" + (7+h+6*v) + "] = " + map[7 + h + 6 * v]);        
        // console.log("186 map = " + map);
    	document.getElementById("map").innerHTML = "map = " + map;
        return map[7 + h + 6 * v];
    }

    function locate(num) {
    	// alert('line ' + new Error().lineNumber);
        // console.log("138 locate(num=" + num + ")");
        // console.log("139 holder[" + holder.length + "] = " + holder.toString());
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
    	document.getElementById("holder").innerHTML = "holder = " + holder;
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
                	document.getElementById("holder").innerHTML = "holder = " + holder;
                    
                    
                    
					// holder[i * 4 + j] = inMap(j, i);
                    // ++j;
                    j2+=1;
                }
                // ++i;
                i2+=1;
                // console.log("91 i2 = " + i2 + ", j2 = " + j2);
            }
            // java:
            //int iSolve = 0;
            // while (iSolve < 4) {
            //    int jSolve = 0;
            //    while (jSolve < 4) {
            //        System.out.println("274 iSolve = " + iSolve + ", jSolve = " + jSolve + ", this.inMap(jSolve,iSolve) = " + this.inMap(jSolve, iSolve));
            //        this.holder[iSolve * 4 + jSolve] = this.inMap(jSolve, iSolve);
            //        ++jSolve;
            //    }
            //    ++iSolve;
            //}
            
                        
            goalsDone = 0;
            // console.log("236 holder = " + holder.toString() + ", goalsDone = " + goalsDone);
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
            	document.getElementById("holder").innerHTML = "holder = " + holder;

            }
            i = 0;

            
            // solve while #3
            while (i < j) {
                if (subGoals[i] > 0) {
                    holder[subGoals[i] - 1] = -1;
                	document.getElementById("holder").innerHTML = "holder = " + holder;                    
                    
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
            	document.getElementById("message").innerHTML = "solve_while_counter_4 = " + ++solve_while_counter_4;
            	// console.log("holder = " + holder.toString() + ", goalsDone = " + goalsDone);
                // // printHolderAlone();
                detour = false;
                switch (goalsDone) {
                    case 0: {
			            // console.log("holder = " + holder.toString() + ", goalsDone = " + goalsDone);
                        moveTo(1, 0);
                    	document.getElementById("holder").innerHTML = "holder = " + holder;
                        break;
                    }
                    case 1: {
                    	// console.log("case 1 holder = " + holder.toString());                       
                        moveTo(2, 1);
                    	document.getElementById("holder").innerHTML = "holder = " + holder;                        
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
                            	document.getElementById("holder").innerHTML = "holder = " + holder;
                            }
                        } else if (i == 2) {
                            if (holder[6] == 4) {
                                makeDetour(detour4, 2);
                                detour = true;
                            	document.getElementById("holder").innerHTML = "holder = " + holder;
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
                    	document.getElementById("holder").innerHTML = "holder = " + holder;

                    }
                    case 3: {
                    	// console.log("145 case 3 holder = " + holder.toString());
                        moveTo(5, 4);
                    	document.getElementById("holder").innerHTML = "holder = " + holder;
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
                    	document.getElementById("holder").innerHTML = "holder = " + holder;
                    }
                }
                // console.log("315 goals done holder = " + holder.toString());                
            	document.getElementById("holder").innerHTML = "holder = " + holder;
                ++goalsDone;
            }
            if (moveCount > 0) {
                // console.log("319 holder = " + holder.toString());
                moveNum = 0;
                // getNextMove();
                oldDragControl = dragControl;
                dragControl = false;
            	document.getElementById("holder").innerHTML = "holder = " + holder;
            }
        }
        catch (err) {
        	document.getElementById("holder").innerHTML = "holder = " + holder;
        	// console.log("line 505 error = " + err  + ", goalsDone = " + goalsDone)
            // empty catch block
        }
    }


    function init() {
    	document.getElementById("map").innerHTML = "map = " + map;
    	document.getElementById("holder").innerHTML = "holder = " + holder;
    	// console.log('init() line ' + new Error().lineNumber);
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
    	document.getElementById("map").innerHTML = "map = " + map;
        // console.log("350 init() map = " + map.toString());
        // printMap();
        // printHolder();
        // printMap();
        // printState();

    	// console.log('ran init()');
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


    var resultArray = solvePuzzle(testMap3);
    // jQuery("#copyright_year").html((new Date).getFullYear());
    document.getElementById("result_array").innerHTML = "resultArray = " + resultArray;
    console.log("resultArray = " + resultArray);
});
