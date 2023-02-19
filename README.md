# 15puzzle
[Animated version of the classic 15-tile puzzle but with a few twists](http://johns15puzzle.com.s3-website-us-east-1.amazonaws.com/#
 "John's 15-Tile Puzzle").  It solves itself.

![alt text](https://github.com/johnfkraus/15puzzle/blob/master/15Puzzle.png "John's 15-Tile Puzzle")

Play the game here: http://johns15puzzle.com.s3-website-us-east-1.amazonaws.com/#

Move tiles by clicking on them.

Choose your favorite puzzle background image.

Click "Auto-Solve" to see the puzzle solve itself; adjust the time per move using the drop-down box.

Click "Scramble" to start over.

To play the game on your local machine, download or clone the project and open the index.html file in your browser.  That's all.

To do:
1.  Update the code to modern JavaScript.  I wrote most of this during 2009-10 in <ECMAScript 5, adding some jQuery later.  Among other things, there are too many global variables.
2.  Implement a responsive framework so it works well as a mobile application.  Note, however, that this puzzle works fine on mobile devices as-is but the user must inconveniently zoom in to the game board.
3.  Add testing.
4.  Improve the inefficient puzzle-solving algorithm. 
