function makeCardDeck() {
	var suits = [ "Clubs", "Diamonds", "Hearts", "Spades" ];
	var color = [ "Black", "Red", "Red", "Black" ];
	var ranks = ["A","2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING"];

	var por = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING",null];
	var poc = [ "Red", "Black", "Black", "Red" ];
	var hr = [null,"A","2","3","4","5","6","7","8","9","10","JACK","QUEEN"];
	var deck = [];

	for (s = 0; s < suits.length; s++) {
		var lowerRank = null;
		for (r = 0; r < ranks.length; r++) {
			var c = {
				rank : ranks[r],
				suit : suits[s],
				color : color[s],

				placeOnRank : por[r],
				placeOnColor : poc[s],
				placeOnHome : hr[r]
			};
			lowerRank = r;
			deck.push(c);
		}
	}
	return deck;
}

cardPile = function(maxStartCards) {
	this.cards = [];
	this.numShown = 1;

	this.maxBuild=maxStartCards;
	
	// utility functions
	this.canPlace=function(card){
		
		if (Array.isArray(card)) {
			card = card[-1];
		}
		
		if (card.rank = "K" && this.cards.length == 0) { // moving king
				// onto empty
				// pile
			return true;
		}
		if (card.placeOnRank == this.top().rank
				&& card.placeOnColor == this.top().color) { // base of
																	// cards to
																	// be moved
																	// can be
																	// placed on
																	// top of
																	// pile.
			return true;
		}
		return false;
	}
	this.place = function(card) {
		if( !this.canPlace(card) ){
			return 0;
		}
		if (Array.isArray(card)) {
			this.cards.splice(0, 0, card);
			this.shown+=card.length;
			return card.length;
		}

		this.cards.unshift(card);
		this.shown++;
		return 1;
	}

	this.canRemove = function(n){
		if (this.cards.length = 0) { // if there are no cards
			return false;
		}
		if( n>this.shown){ // if trying to move more than are showing
			return false;
		}
		return true;
	}
	this.remove = function(n) {
		if(!this.canRemove(n)){
			return [];
		}
		if( n==1){ // remove top card and flip over next one.
			return this.cards.shift();
		}
		else { // remove top n cards. If non showing, flip over next card
			this.shown -=n;
			if( this.shown <1){
				this.shown=1;
			}
			return this.cards.splice(0, n );
		}
	}

	this.top == function() {
		return this.cards[0];
	}

	// playing functions
	this.canMove = function(n, pile) {
		if(!this.canRemove(n)){
			return false;
		}

		var index = n-1;
		var cardsToMove = this.cards.slice(0,index);

		if( !pile.canPlace(cardsToMove)){
			return false;
		}

		return true;
	}

	this.moveTo = function(n, pile) {
		if (!this.canMove(n, pile)) {
			return false;
		}

		pile.place(this.remove(n));
		return true;
	}

	// building functions
	this.fullStartPile(){
		return this.card.length = this.maxBuild && this.shown==1;
	}
	
	this.canUnPlace = function(n){
		if(n > this.shown-1){
			return false;
		}
		return true;
	}
	this.unPlace = function(n){
		if( !this.canUnPlace(n)){
			return [];
		}
		this.shown -=n;
		return this.cards.splice(0,n);
	}

	this.numUnPlaceable(){
		return this.shown-1;
	}
	
	this.canUnRemove = function(card){
		
		if (!Array.isArray(card)) {
			card = [card];
		}
		if( card[-1].placeOnRank == pile.top().rank
				&& card[-1].placeOnColor == pile.top().color){ // if following
																// run, just
																// place
			return true;
		}
		if(this.cards.length == this.maxBuild && this.shown==1 ){ // if full
																	// can't
																	// flip down
																	// anymore
			return false;
		}
		return true;
	}

	this.unRemove = function(card){
		if( !this.canUnRemove(card)){
			return 0;
		}
		
		if (!Array.isArray(card)) {
			card = [card];
		}

		this.cards.splice(0,cards.length,cards); // add cards to the pile
		
		if( card[-1].placeOnRank == pile.top().rank
				&& card[-1].placeOnColor == pile.top().color){ // if following
																// run, just
																// place
			this.shown+=card.length;
		}
		else { // otherwise flip down card under new cards
			this.shown = card.length;
		}
		return cards.length;
	}
	
	this.numUnRemovable(){
		if(this.cards.length == this.maxBuild && this.shown==1 ){ // if full
			// can't
			// flip down
			// anymore
			return 0;
		}
		return 1;
	}
	
}


homePile = function(maxStartCards) { // maxStartCards ignored
	this.cards = [];

	this.maxBuild=0;
	
	// utility functions
	this.canPlace=function(card){
		
		if (Array.isArray(card)) {
			return false;
		}
		
		if (card.placeOnHome = "A" && this.cards.length == 0) { // moving Ace Home
			return true;
		}
		if (cardToPlace.placeOnRank == this.top().rank
				&& cardToPlace.color == this.top().color) { // card is next in home pile
			return true;
		}
		return false;
	}
	this.place = function(card) {
		if( !this.canPlace(card) ){
			return 0;
		}

		this.cards.unshift(card);
		return 1;
	}

	this.canRemove = function(n){
		return false;
	}
	this.remove = function(n) {
			return [];
	}

	this.top == function() {
		return this.cards[0];
	}

	// playing functions
	this.canMove = function(n, pile) {
		return false;
	}

	this.moveTo = function(n, pile) {
		return false;
	}

	// building functions
	this.fullStartPile(){
		return this.cards.length==0;
	}
	
	this.canUnPlace = function(n){
		return this.cards.length>0;
	}
	this.unPlace = function(n){
		if( !this.canUnPlace(n)){
			return [];
		}
		return this.cards.splice(0,n);
	}
	this.numUnPlaceable(){
		return 1;
	}
	

	this.canUnRemove = function(card){
		return false;
	}

	this.unRemove = function(card){
		return 0;
	}
	this.numUnRemovable(){
		return 0;
	}

}

cardReserve = function(maxStartCards) {
	this.unflipped=[];
	this.cards = [];

	this.maxBuild= maxStartCards; 
	
	// utility functions
	this.canPlace=function(card){
		return false;
	}
	this.place = function(card) {
		return 0;
	}

	this.canRemove = function(n){
		if (this.cards.length = 0) { // if there are no cards
			return false;
		}
		if( n>1){ // can only remove one at a time
			return false;
		}
		return true;
	}
	this.remove = function(n) {
		if(!this.canRemove(n)){
			return [];
		}
		
		// remove top card.
		return this.cards.shift();
	}

	this.flip(){ // flip three manually;
		if( this.unflipped.length ==0){ // if non unflipped, reset pile
			this.unflipped = this.cards;
			this.cards=[];
			return;
		}

		var numCardsToShift = 3;
		if( this.unflipped.length<3){
			numCardsToShift = this.unflipped.length
		}
		var shiftedCards= this.cards.splice(this.unflipped-numCardsToShift,numCardsToShift);
		this.cards.splice(0,0,shiftedCards);
	}
	
	this.top == function() {
		return this.cards[0];
	}

	// playing functions
	this.canMove = function(n, pile) {
		if(!this.canRemove(n)){
			return false;
		}

		if( !pile.canPlace(this.cards[0])){
			return false;
		}

		return true;
	}

	this.moveTo = function(n, pile) {
		if (!this.canMove(n, pile)) {
			return false;
		}

		pile.place(this.remove(n));
		return true;
	}

	// building functions
	this.fullStartPile(){
		return this.card.length = this.maxBuild && this.shown==1;
	}
	
	this.canUnPlace = function(n){
		return false;
	}
	this.unPlace = function(n){
		return [];
	}
	this.numUnPlaceable(){
		return 0;
	}

	this.numUnPlaceable(){
		return 0;
	}
	
	this.canUnRemove = function(card){
		
		if (Array.isArray(card)) { // can only unremove one card
			return false; 
		}
		if(this.unflipped.length+this.cards.length >= this.maxBuild){
			return false;
		}
		return true;
	}

	this.unRemove = function(card){
		if( !this.canUnRemove(card)){
			return 0;
		}
		
		this.cards.unshift(card); // add cards to the pile
		if( this.cards.length==3){
			this.unflipped.push(this.cards);
			this.cards=[];
		}
		
		return cards.length;
	}
	
	this.numUnRemovable(){
		if(this.unflipped.length+this.cards.length >= this.maxBuild){
			return 0;
		}

		return 1;
	}

	
}


var game = function(){
	this.home = [
	            new cardHome(0),
	            new cardHome(0),
	            new cardHome(0),
	            new cardHome(0)
	            ];
	
	this.pile = [];
	for(var n=1; n<=7;n++){
		this.pile.push( new cardPile(n));		
	}
	
	this.reserve = new cardReserve( 52-7*8/2); // leftover cards from 7 piles
	
	this.setup = function(){
		
		// fill up home row
		var workingReserve = new cardReserve( 52);
		workingReserve.cards=makeCardDeck();
		
		while( workingReserve.canMove(1)){
			if( workingReserve.moveTo(this.home[0])) {continue;}
			if( workingReserve.moveTo(this.home[1])) {continue;}
			if( workingReserve.moveTo(this.home[2])) {continue;}
			if( workingReserve.moveTo(this.home[3])) {continue;}
			break; // should never get here
		}
		
		while( this.home[0].canMove(1) || this.home[1].canMove(1)||this.home[2].canMove(1)||this.home[3].canMove(1)){
			this.setupStep();
		}
	}
	
	this.setupStep(){
		var unPlacePile = this.getUnPlaceable;
		var unRemovePile = this.getUnRemovable;
		
		if( unPlacePile.numUnPlaceable() == 1){
			unRemovePile.unRemove(unPlacePile.unPlace(1));
			return;
		}
		
		
		var pickCardNum = Math.Floor(unPlacePile.numUnPlaceable() *Math.Rand()+1);
		var cardsToUnMove = unPlacePile.unPlace(pickCardNum);
		unRemovePile.unRemove(cardsToUnMove);	
	}
	
	this.getUnPlaceable(){
		var totalUnPlayable=0;
		
		for( var i=0; i<this.home.length;i++){
			totalUnPlayable+=this.home[i].numUnPlaceable();
		}
		for( var i=0; i<this.pile.length;i++){
			totalUnPlayable+=this.pile[i].numUnPlaceable();
		}
		totalUnPlayable+=this.reserve.numUnPlaceable();
		
		var pileNum = totalUnPlayable *Math.Rand();

		var checkRand = 0;
		for( var i=0; i<this.home.length;i++){
			checkRand+=this.home[i].numUnPlaceable();
			if( checkRand>pileNum){
				return home[i];
			}
		}
		for( var i=0; i<this.pile.length;i++){
			checkRand+=this.pile[i].numUnPlaceable();
			if( checkRand>pileNum){
				return pile[i];
			}
		}
		checkRand+=this.reserve.numUnPlaceable();
		if( checkRand>pileNum){
			return reserve;
		}

	}
	
	this.getUnRemovable(){
		var totalUnRemovable=0;
		
		for( var i=0; i<this.home.length;i++){
			totalUnRemovable+=this.home[i].numUnRemovable();
		}
		for( var i=0; i<this.pile.length;i++){
			totalUnRemovable+=this.pile[i].numUnRemovable();
		}
		totalUnRemovable+=this.reserve.numUnRemovable();
		
		var pileNum = totalUnRemovable *Math.Rand();

		var checkRand = 0;
		for( var i=0; i<this.home.length;i++){
			checkRand+=this.home[i].numUnRemovable();
			if( checkRand>pileNum){
				return home[i];
			}
		}
		for( var i=0; i<this.pile.length;i++){
			checkRand+=this.pile[i].numUnRemovable();
			if( checkRand>pileNum){
				return pile[i];
			}
		}
		checkRand+=this.reserve.numUnRemovable();
		if( checkRand>pileNum){
			return reserve;
		}

	}
	
	
}