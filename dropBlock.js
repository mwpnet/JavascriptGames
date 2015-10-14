/**
 * 
 * 
 * Heaven and hell part inspired by xkcd cartoons xkcd.com/888/ and xkcd.com/724/
 * 
 * 
 * commons:
 * lower left is 0,0
 * shapes fall with decreasing y
 * x,y of shape is in lower left
 */

/*******************************************************************************
 * Set up game area
 */

var gameAreaWidth = 10;
var gameAreaHeight = 40;
var gameArea = [ [] ];

gameArea.prototype = {
	width : 10,
	height : 40
};
for (h = 0; h < gameArea.height; h++) {
	for (v = 0; v < gameArea.width; w++) {
		gameArea = {
			isFilled : false,
			color : "black"
		};
	}
}

/*******************************************************************************
 * set up blocks These just work out better when their square arrays
 * 		Note: the shapes are upside down
 */
var blockShapes = [ 
             // **
             // **
             [
              	[	[ 1, 1 ], 
              	 	[ 1, 1 ] ] 
              ],

             // **
             //  **
             [
               	[   [ 2, 2, 0 ],
               	    [ 0, 2, 2 ], 
               	    [ 0, 0, 0 ] ], 
               	    
               	[   [ 0, 0, 2 ],
               	    [ 0, 2, 2 ], 
               	    [ 0, 2, 0 ] ] 
             ],
             //  **
             // **
             [
              	[	[ 0, 3, 3 ], 
              	 	[ 3, 3, 0 ], 
              	 	[ 0, 0, 0 ] ],
              	 	
                 [	[ 3, 0, 0 ], 
                  	[ 3, 3, 0 ], 
                  	[ 0, 3, 0 ] ]
             ],
             // *
             // ***
             [
              	[	[ 0, 0, 0, 0 ], 
              	 	[ 0, 4, 0, 0 ], 
              	 	[ 0, 4, 4, 4 ], 
              	 	[ 0, 0, 0, 0 ] ],
              	 	
              	[	[ 0, 0, 0, 0 ], 
               	 	[ 0, 4, 4, 0 ], 
               	 	[ 0, 4, 0, 0 ], 
               	 	[ 0, 4, 0, 0 ] ],
               	 	
               	[	[ 0, 0, 0, 0 ], 
               	 	[ 4, 4, 4, 0 ], 
               	 	[ 0, 0, 4, 0 ], 
               	 	[ 0, 0, 0, 0 ] ],
               	 	
               	[	[ 0, 0, 4, 0 ], 
               	 	[ 0, 0, 4, 0 ], 
               	 	[ 0, 4, 4, 0 ], 
               	 	[ 0, 0, 0, 0 ] ]
             ],
             //   *
             // ***
             [
              	[	[ 0, 0, 0, 0 ], 
              	 	[ 0, 0, 5, 0 ], 
              	 	[ 5, 5, 5, 0 ], 
              	 	[ 0, 0, 0, 0 ] ],
              	 	
               	[	[ 0, 5, 0, 0 ], 
               	 	[ 0, 5, 0, 0 ], 
               	 	[ 0, 5, 5, 0 ], 
               	 	[ 0, 0, 0, 0 ] ],

               	[	[ 0, 0, 0, 0 ], 
               	 	[ 0, 5, 5, 5 ], 
               	 	[ 0, 5, 0, 0 ], 
               	 	[ 0, 0, 0, 0 ] ],
               	 	
              	[	[ 0, 0, 0, 0 ], 
               	 	[ 0, 5, 5, 0 ], 
               	 	[ 0, 0, 5, 0 ], 
               	 	[ 0, 0, 5, 0 ] ],
               	 	
             ],
             //  *
             // ***
             [
              	[   [ 0, 6, 0 ],
              	    [ 6, 6, 6 ],
              	    [ 0, 0, 0 ]  ],
              	    
              	[   [ 0, 6, 0 ],
              	    [ 0, 6, 6 ],
              	    [ 0, 6, 0 ]  ],
              	    
              	[   [ 0, 0, 0 ],
              	    [ 6, 6, 6 ],
              	    [ 0, 6, 0 ]  ],
              	    
              	[   [ 0, 6, 0 ],
              	    [ 6, 6, 0 ],
              	    [ 0, 6, 0 ]  ],
              	    
             ],
             // ****
             [
                [   [ 0, 7, 0, 0 ],
                    [ 0, 7, 0, 0 ],
                    [ 0, 7, 0, 0 ],
                    [ 0, 7, 0, 0 ]  ],

                [   [ 0, 0, 0, 0 ],
                    [ 0, 0, 0, 0 ],
                    [ 7, 7, 7, 7 ],
                    [ 0, 0, 0, 0 ]  ],
              ]
             ];


function block(context,x,y,blockWidth,blockHeight){
	 context.fillRect(x+5,y+5, blockWidth-5,blockHeight-5);
	 context.strokeRect(x+5,y+5, blockWidth-5,blockHeight-5);
}
var drawBlock = [
                 function(context,x,y,blockWidth,blockHeight){
                	 context.save();
                	 context.fillStyle="#000000";
                	 context.strokeStyle="#000000";
                	 context.fillRect(x,y, blockWidth,blockHeight);
                	 context.restore();	
                 },
                 function(context,x,y,blockWidth,blockHeight){
                	 context.save();
                	 context.fillStyle="#ff0000";
                	 context.strokeStyle="#7f0000";
                	 context.fillRect(x,y, blockWidth,blockHeight);
                	 context.restore();	
                 },
                 function(context,x,y,blockWidth,blockHeight){
                	 context.save();
                	 context.fillStyle="#00ff00";
                	 context.strokeStyle="#007f00";
                	 context.fillRect(x,y, blockWidth,blockHeight);
                	 context.restore();	
                 },
                 function(context,x,y,blockWidth,blockHeight){
                	 context.save();
                	 context.fillStyle="#ffff00";
                	 context.strokeStyle="#7f7f00";
                	 context.fillRect(x,y, blockWidth,blockHeight);
                	 context.restore();	
                 },
                 function(context,x,y,blockWidth,blockHeight){
                	 context.save();
                	 context.fillStyle="#0000ff";
                	 context.strokeStyle="#00007f";
                	 context.fillRect(x,y, blockWidth,blockHeight);
                	 context.restore();	
                 },
                 function(context,x,y,blockWidth,blockHeight){
                	 context.save();
                	 context.fillStyle="#ff00ff";
                	 context.strokeStyle="#7f007f";
                	 context.fillRect(x,y, blockWidth,blockHeight);
                	 context.restore();	
                 },
                 function(context,x,y,blockWidth,blockHeight){
                	 context.save();
                	 context.fillStyle="#00ffff";
                	 context.strokeStyle="#007f7f";
                	 context.fillRect(x,y, blockWidth,blockHeight);
                	 context.restore();	
                 },
                 function(context,x,y,blockWidth,blockHeight){
                	 context.save();
                	 context.fillStyle="#ffffff";
                	 context.strokeStyle="#7f7f7f";
                	 context.fillRect(x,y, blockWidth,blockHeight);
                	 context.restore();	
                 },
                 ];


/***************
* XXX get the rest working first
* 
function getHellBlock() {
	var block = [ 
	              [ 8, 8, 8, 8 ], 
	              [ 8, 8, 8, 8 ], 
	              [ 8, 8, 8, 8 ],
	              [ 8, 8, 8, 8 ]
	            ];

	for (count = 0; count < 8; count++) {
		var rDel = 0;
		var cDel = 0;
		var n = 1;

		for (r = 0; r < 4; r++) {
			for (c = 0; c < 4; c++) {

				// if there's not another block conecting the
				// neghboring rows r colomns, try again.
				// otherwise we end up with disconnected blocks
				var conectedCount = 0;
				for (rc = 0; rc < block.length; rc++) {
					if (block[rc][x] == 1) {
						connectedCount++;
					}
				}
				if (conectedCount < 2)
					continue;

				conectedCount = 0;
				for (cc = 0; cc < block[x].length; cc++) {
					if (block[y][cc] == 1) {
						connectedCount++;
					}
				}
				if (conectedCount < 2)
					continue;

				if (Math.rand() < 1 / n) {
					rDel = r;
					cDel = c;
					n++;
				}
			}
		}
		block[rDel][cDel] = 0;
	}

	return block;
}

function getHeavenBlock() {
	var colDepth = [];
	var maxDepth = 0;

	// get depth of each column
	for (c = 0; c < gameArea.width; c++) {
		for (r = gameArea.height - 1; r >= 0; r--) {
			if (gameArea[r][c].isFilled) {
				colDepth[c] = gameArea.height - 1 - r;
				if (colDepth[c] < minDepth) {
					maxDepth = colDepth[c];
				}
				break;
			}
		}
	}

	// remove blocks until only the lower 4 rows are left
	for (i = 0; i < colDepth.length; i++) {
		colDepth[i] -= maxDepth - 4;
		if (colDepth[i] < 0) {
			colDepth[i] = 0;
		}
	}
	// XXX
}
*******/



/***************
 * 
 * while(g.payable){
 *	 	if( g.needNextShape() ){
 * 			g.nextShape(s)
 * 		}
 * 	( g.left g.right g.down g.up g.rotateCW g.rotateCounterCW )
 * 
 * 	show g.game()
 * }
 * 
 * everyTimeCount(	g.tick )	
 */
function playArea(widthIn, heightIn) {

	var width = widthIn;
	var height = heightIn;

	var needShape = true;

	var x = 0; // may be negative
	var y = 0; // may be negative
	var shapeNum = 0;
	var shapeList = [ [ [] ] ];
	var shape = [ [] ];

	this.rowsRemoved = [];
	console.log(this.rowsRemoved);

	this.payable = true;

	var grid = [];
	for (r = 0; r < height; r++) {
		grid[r] = [];
		for (c = 0; c < width; c++) {
			grid[r][c] = 0;
		}
	}

	var setup = function() {
		needShape = true;
	}

	// the last shape was placed and we need the next one 
	this.needNextShape = function() {
		return needShape;
	}

	// recieve a new shape to start from the top again.
	this.setNextShape = function(newShapeList) {
		if (!needShape) {
			return false;
		}

		shapeNum = 0;
		shapeList = newShapeList;
		shape = shapeList[shapeNum];
		x = Math.floor((width - shape[0].length) / 2);
		y = height - shape.length;
		this.rowsRemoved = [];
		needShape = false;
		return true;
	}

	// return a copy of the board, with the falling shape
	// as well.
	this.game = function() {
		var pa = this.board();
		if( !needShape){
			for (r = 0; r < shape.length; r++) {
				for (c = 0; c < shape[r].length; c++) {
					if (shape[r][c] != 0) {
						if ( y + r >= 0 && y + r <= grid.length - 1 && x + c >= 0 && x + c <= grid[y + r].length - 1) {
							pa[y + r][x + c] = shape[r][c];
						}
					}
				}
			}
		}
		return pa;
	}

	// returns a copy of the board with only
	// the placed blocks, and not the falling shape
	this.board = function()
	{
		var pa = [];
		for (r = 0; r < height; r++) {
			pa[r] = [];
			for (c = 0; c < width; c++) {
				pa[r][c] = grid[r][c];
			}
		}
		return pa;
	}

	// return the shape that is currently dropping,
	// including it's orientation
	this.shape = function() {
		return shape;
	}


	this.tick = function() {

		if (needShape) {
			return;
		}

		var moved = this.down();

		if (moved) {
			return;
		}

		fixShape(shape,x,y);

		needShape = true;

		removeRows();

		return;
	}

	var fixShape = function(shapeToFix,xB,yB){
		for (r = 0; r < shapeToFix.length; r++) {
			for (c = 0; c < shapeToFix[r].length; c++) {
				if( shape[r][c] !=0){
					grid[yB + r][xB + c] = shape[r][c];
				}
			}
		}
	}

	var rowFull = function(r){
		var rowFull = true;
		for (c = 0; c < grid[r].length; c++) {
			console.log( rowFull,grid[r][c]);
			if (grid[r][c] == 0) {
				rowFull = false;
				break;
			}
		}
		return rowFull;
	}
	
	var removeRows = function() {
		this.rowsRemoved=[];

		var rTo = 0;
		for( r=0; r<grid.length; r++){
			
			if( ! rowFull(r) ){
				if( r != rTo ){
					grid[rTo] = grid[r];
				}
				rTo++;
			}
		}
		
		for( r = rTo+1; r < grid.length;r++){
			grid[r] = [];
			for (c = 0; c < width; c++) {
				grid[r][c] = 0;
			}
		}
	}

	// decreases the x position of the shape, as long as
	// doesn't overlap existing blocks.
	//
	// returns: true if the x position was decreased
	// false if it wasn't
	this.left = function() {
		if (needShape) {
			return false;
		}

		if (overlapsBoard(shape, x - 1, y)) {
			return false;
		}
		x--;
		return true;
	}

	// increases the x position of the shape, as long as
	// doesn't overlap existing blocks.
	//
	// returns: true if the x position was increased
	// false if it wasn't
	this.right = function() {
		if (needShape) {
			return false;
		}

		if (overlapsBoard(shape, x + 1, y)) {
			return false;
		}
		x++;
		return true;
	}

	// decreases the y position of the shape, as long as
	// doesn't overlap existing blocks.
	//
	// returns: true if the y position was decreased
	// false if it wasn't
	this.down = function() {
		if (needShape) {
			return false;
		}

		if (overlapsBoard(shape, x, y - 1)) {
			return false;
		}
		y--;
		return true;
	}

	// increases the y position of the shape, as long as
	// doesn't overlap existing blocks.
	// Note that this is here only for completnes.
	//
	// returns: true if the y position was increased
	// false if it wasn't
	this.up = function() {
		if (needShape) {
			return false;
		}

		if (overlapsBoard(shape, x, y + 1)) {
			return false;
		}
		y++;
		return true;
	}

	// increases the index indicating the shape to show,
	// as long as it wouldn't overlap the existing blocks
	//
	// returns: true if the index was increased.
	// false if it wasn't
	this.rotateCW = function() {
		if (needShape) {
			return false;
		}

		testShapeNum = shapeNum + 1;
		if (testShapeNum > shapeList.length - 1) {
			testShapeNum = 0;
		}

		var testShape = shapeList[ testShapeNum ];
		if (overlapsBoard(testShape, x, y)) {
			return false;
		}
		shapeNum = testShapeNum;
		shape = shapeList[shapeNum];
		return true;
	}

	// decreases the index indicating the shape to show,
	// as long as it wouldn't overlap the existing blocks
	//
	// returns: true if the index was decreased.
	// false if it wasn't
	this.rotateCCW = function() {
		if (needShape) {
			return false;
		}

		testShapeNum = shapeNum - 1;
		if (testShapeNum < 0) {
			testShapeNum = shapeList.length - 1;
		}

		var testShape = shapeList[ testShapeNum ];
		if (overlapsBoard(testShape, x, y)) {
			return false;
		}
		shapeNum = testShapeNum;
		shape = shapeList[shapeNum];
		return true;
	}

	this.drop = function() {
		if (needShape) {
			return false;
		}

		while( !overlapsBoard(shape, x, y - 1) ){
			y--;
		}
		return true;

	}
	
	
	//
	// tests if any of the the blocks of a shape put at
	// position testX,testY overlap any of the blocks
	// already on the board
	//
	// shapeNumIn - the id of the shape in the shape list
	// to test
	// testX - the x position to test the for an
	// overlap
	// testY - the y position to test the for an
	// overlap
	//
	// returns: true if there is an overlap
	// false if there is none

	var overlapsBoard = function(testShape, testX, testY) {


		for (r = 0; r < testShape.length; r++) {
			for (c = 0; c < testShape[r].length; c++) {
				if (testShape[r][c] != 0) {
					if (testY + r < 0 || testY + r > grid.length - 1) {
						return true;
					} else if (testX + c < 0
							|| testX + c > grid[testY + r].length - 1) {
						return true;
					} else if (grid[testY + r][testX + c] != 0) {
						return true;
					}
				}
			}
		}
		return false;
	}

}


function drawGame(widthIn,heightIn,blocksWideIn,blocksHighIn){
	
	var width =widthIn;
	var height=heightIn;
	var widthInBlocks = blocksWideIn;
	var HeightInBlocks = blocksHighIn;
	
	var blockWidth = width/widthInBlocks;
	var blockHeight = height/HeightInBlocks;

	var blockArray=[];
	
	this.draw=function(context,board){
		context.save();
		for( r=0; r<board.length; r++){
			for( c=0; c<board[r].length;c++){
				var x = c*blockWidth;
				var y = (height-blockHeight)-r*blockHeight;
				
				var val = board[r][c];
				if( val > blockArray.length-1){
					val = 0;
				}
				if( val <0 ){
					val = 0;
				}
				blockArray[val](context,x,y,blockWidth,blockHeight);
			}
		}
		context.restore();
	}

	this.blocks = function(blockArrayIn){
		blockArray=blockArrayIn;
	}

}


function preview( widthIn, heightIn ){
	var cache = [];
	
	var width = widthIn;
	var height = heightIn;
	
	var x = 0; // may be negative
	var y = 0; // may be negative
	var shape = [ [] ];

	var grid = []
	for(var h=0; h<height; h++){
		grid[h]=[];
		for(var w=0; w<width; w++){
			grid[h][w] = 0;
		}
	}
	
	var divider = [[]];
	for( var w=0; w<width; w++){
		divider[0].push(-1);
	}
	
	this.shift = function(){
		var out = cache.shift();
		redraw( cache );
		return out;
	}
	
	this.push = function(nextShapeList){
		cache.push(nextShapeList);
		redraw( cache );
	}

	var redraw = function( cacheToDraw ){
		clearBoard();
		for( var i=0; i< cacheToDraw.length; i++){
			var shape = cacheToDraw[i][0];
			var x = Math.floor((width - shape[0].length) / 2);
			var y = height - shape.length;
	
			if( overlapsBoard( shape,x,y)){
				return;
			}
			
			y = drop( shape , x, y );
			fixShape( shape, x, y );
	
			x = 0;
			y = height-1;
			y = drop(divider, x, y );
			fixShape( divider, x, y );
		}
	}

	var clearBoard = function(){
		for(var h=0; h<height; h++){
			for(var w=0; w<width; w++){
				grid[h][w] = 0;
			}
		}
		
	}
	
	var drop = function(shapeToFix,xB,yB) {
		while( !overlapsBoard(shapeToFix, xB, yB - 1) ){
			yB--;
		}
		return yB;

	}
	var fixShape = function(shapeToFix,xB,yB){
		for (r = 0; r < shapeToFix.length; r++) {
			for (c = 0; c < shapeToFix[r].length; c++) {
				if( shapeToFix[r][c] !=0){
					grid[yB + r][xB + c] = shapeToFix[r][c];
				}
			}
		}
	}

	

	
	this.setNextShape = function(newShapeList) {
		shapeList = newShapeList;
		return true;
	}

	// returns a copy of the board with only
	// the placed blocks, and not the falling shape
	this.board = function()
	{
		var pa = [];
		for (r = 0; r < height; r++) {
			pa[r] = [];
			for (c = 0; c < width; c++) {
				pa[r][c] = grid[r][c];
			}
		}
		return pa;
	}

	
	
	///////////////////////////////////


	//
	// tests if any of the the blocks of a shape put at
	// position testX,testY overlap any of the blocks
	// already on the board
	//
	// shapeNumIn - the id of the shape in the shape list
	// to test
	// testX - the x position to test the for an
	// overlap
	// testY - the y position to test the for an
	// overlap
	//
	// returns: true if there is an overlap
	// false if there is none

	var overlapsBoard = function(testShape, testX, testY) {

		for (r = 0; r < testShape.length; r++) {
			for (c = 0; c < testShape[r].length; c++) {
				if (testShape[r][c] != 0) {
					if (testY + r < 0 || testY + r > grid.length - 1) {
						return true;
					} else if (testX + c < 0
							|| testX + c > grid[testY + r].length - 1) {
						return true;
					} else if (grid[testY + r][testX + c] != 0) {
						return true;
					}
				}
			}
		}
		return false;
	}

}
	
