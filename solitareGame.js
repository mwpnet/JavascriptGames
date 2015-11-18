var cardBeingDragged;
var cardDraggedFrom;



var tableausPiles;
var foundationPiles;
var stockPile;
var wastePile;

var topOfTableausNode;
var topOfStockNode;
var topOfWasteNode;

var foundationpileFull={
		'spade': false,
		'heart': false,
		'club': false,
		'diamond': false
		};


function handlePropogateAndDefault(ev) {
	if (ev.preventDefault) ev.preventDefault(); 
	if (ev.stopPropagation)ev.stopPropagation(); // Stops some browsers from redirecting.
	return false;
}



var slots = ["foundation","tableau","stock","waste"];
function isEmptySlot(cardNode){
	for( i=0; i< slots.length;i++){
		if( cardNode.classList.contains(slots[i])){
			return true;
		}
	}
	return false;
}
/******
 * get the suit of a card
 * @param cardNode
 * 		the element node representing the card
 * @returns 
 * 		the suit of the card or null if it doesn't have one.
 */
var suit = ['spade','heart','club','diamond'];
function getSuit(cardNode){
	for( i=0; i< suit.length;i++){
		if( cardNode.classList.contains(suit[i])){
			return suit[i];
		}
	}
	return null;
}

/*****
 * get the rank of a card
 * @param cardNode
 * 		the element node representing the card
 * @returns
 * 		the rank of the card or null if it doesn't have one.
 */
var rank = ["king","queen","jack","ten","nine","eight","seven","six","five","four","three","two","ace"];
function getRank(cardNode){
	for( i=0; i< rank.length;i++){
		if( cardNode.classList.contains(rank[i])){
			return rank[i];
		}
	}
	return null;
}

/****
 * compiles a 
 * @param evInfo
 * @returns {___anonymous1213_1293}
 */
function getCard(cardNode){
	var card = {
			node: cardNode,
			isEmptySlot: isEmptySlot(cardNode),
			suit: null,
			rank: null,
			color: null
	}

	card.suit = getSuit(cardNode);
	if( card.suit == null){
		return card;
	}

	if( card.suit == "spade" || card.suit == "club"){
		card.color = "black";
	}
	else{
		card.color = "red";
	}
	
	card.rank = getRank(cardNode);
	
	return card;
}

function flipCardFaceUp(cardNode){
	var cardFace = cardNode.getElementsByClassName("cardFace");
	cardFace[0].style.visibility = "visible";
}

function flipCardFaceDown(cardNode){
	var cardFace = cardNode.getElementsByClassName("cardFace");
	cardFace[0].style.visibility = "hidden";
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//deck game rules

function moveFromDeck(card){
	flipCardFaceDown(card.node);

	card.node.parentNode.removeChild(card.node);
}

function moveToDeck(card,ontoDeck){
	flipCardFaceDown(card.node);
	ontoDeck.node.appendChild(card.node);
}


//////////////////////////////////////////////////
//////////////////////////////////////////////////
// tableau game rules
var tableauStackAceptableRank={king:"queen",queen:"jack",jack:"ten",ten:"nine",nine:"eight",eight:"seven",seven:"six",six:"five",five:"four",four:"three",three:"two",two:"ace"}

function startCardDragFromTableau(ev) {
	// Target (this) element is the source node.
	ev.dataTransfer.setData('text/plain', 'dummy');
	ev.dataTransfer.effectAllowed = 'move';
	cardBeingDragged = ev.target;
	cardDraggedFrom = "tableau";
	return false;
}

function tableauCardAcceptDrop(ev){
	// e.currentTarget if the element that has the event listener
	// e.target is element that was dropped onto (not always the same thing)
	var card = getCard(cardBeingDragged);
	
	var ontoCard = getCard(ev.currentTarget);

	if( ontoCard.isEmptySlot ) {
		// on empty tableau
		if( card.rank != "king"){
			return false;
		}
	}
	else{
		if( card.color== ontoCard.color ){
			return false;
		}
		
		if( card.rank != tableauStackAceptableRank[ontoCard.rank]){
			return false;
		}
	}

	if( cardDraggedFrom=="tableau"){
		//card parent - make visible
		moveFromTableau(card);
	}
	else if( cardDraggedFrom=="waste"){
		moveFromWaste(card);
	}

	moveToTableau(card, ontoCard);
	ontoCard.node.appendChild(card.node);
	ontoCard.node.removeEventListener('drop',tableauCardAcceptDrop);
	return false;
}

function moveFromTableau(card){
	// the card underneath now accepts drops again.
	card.node.parentNode.addEventListener('drop',tableauCardAcceptDrop,false);
	card.node.parentNode.addEventListener('dragstart', startCardDragFromTableau, false);
	flipCardFaceUp(card.node.parentNode);

	card.node.parentNode.removeChild(card.node);
	topOfTableausNode = card.node.parentNode;

	card.node.removeEventListener('drop',tableauCardAcceptDrop);
	card.node.removeEventListener('dragstart', startCardDragFromTableau);
}

function moveToTableau(card,ontoCard){
	// the card underneath no longer accepts drops
	ontoCard.node.appendChild(card.node);
	ontoCard.node.removeEventListener('drop',tableauCardAcceptDrop);
	
	topOfTableausNode=card.node;
	card.node.addEventListener('drop',tableauCardAcceptDrop,false);
	card.node.addEventListener('dragstart', startCardDragFromTableau, false);
}




//////////////////////////////////////////////////
//////////////////////////////////////////////////
//foundation game rules
var foundationStackRank={queen:"king",jack:"queen",ten:"jack",nine:"ten",eight:"nine",seven:"eight",six:"seven",five:"six",four:"five",three:"four",two:"three",ace:"two"}

function foundationCardAcceptDrop(ev){
	// e.currentTarget if the element that has the event listener
	// e.target is element that was dropped onto (not always the same thing)
	
	var card = getCard(cardBeingDragged);
	
	var coveringCards = card.node.getElementsByClassName("card");
	
	var ontoCard = getCard(ev.currentTarget);

	if( coveringCards.length !=0){
		return false;
	}
	
	var ontoCard = getCard(ev.currentTarget);

	if( card.suit != ontoCard.suit ){
		return false;
	}
	
	if( ontoCard.isEmptySlot) {
		// on empty foundation
		if( card.rank != "ace"){
			return false;
		}
	}
	else{
		if( card.rank != foundationStackRank[ontoCard.rank]){
			return false;
		}
	}
	
	if( cardDraggedFrom=="tableau"){
		//card parent - make visible
		moveFromTableau(card);
	}
	else if( cardDraggedFrom=="waste"){
		moveFromWaste(card);
	}
	moveToFoundation(card,ontoCard);
	
	if(card.rank == "king"){
		foundationpileFull[card.suit]=true;
		checkForWin();
	}
	return false;
}

function moveToFoundation(card,ontoCard){
	ontoCard.node.appendChild(card.node);
	ontoCard.node.removeEventListener('drop',foundationCardAcceptDrop);
	card.node.addEventListener('drop',foundationCardAcceptDrop);
	
}


function checkForWin(){
	var win=true;
	
	for( i=0; i< suit.length;i++){
		win = win&& foundationpileFull[suit[i]];
	}
	if( win){
		var winbox = document.getElementById("winAnnouncement");
		winbox.style.visibility = "visible";
	}
}


//////////////////////////////////////////////////
//////////////////////////////////////////////////
// stock game rules

function clickOnStock(ev){
	// e.currentTarget is the element that has the event listener
	// e.target is element that was dropped onto (not always the same thing)
	var card = getCard(ev.currentTarget);
	
	if( card.isEmptySlot) {
		//empty stock
		refillStock();
		return false;
	}

	moveFromStock(card);
	moveToWaste(card);
	//need to stop propogating the click up the doc tree
	// since the parent has the event listener at this point,
	// which would then be called for the  same event
	if (ev.stopPropagation)ev.stopPropagation();

}

function moveToStock(card,ontoCard){
	ontoCard.node.addEventListener('click',clickOnStock);
	ontoCard.node.appendChild(card.node);

	card.node.addEventListener('click',clickOnStock);
	topOfStockNode = card.node;
	flipCardFaceDown(topOfStockNode);
}

function moveFromStock(card){
	card.node.removeEventListener('click',clickOnStock);
	
	topOfStockNode = card.node.parentNode;
	card.node.parentNode.addEventListener('click',clickOnStock);
	card.node.parentNode.removeChild(card.node);
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// waste game rules

function startCardDragFromWaste(ev) {
	ev.dataTransfer.setData('text/plain', 'dummy');
	ev.dataTransfer.effectAllowed = 'move';
	cardBeingDragged = ev.target;
	cardDraggedFrom = "waste";
	return false;
}

function moveToWaste(card){
	topOfWasteNode.appendChild(card.node);
	topOfWasteNode.removeEventListener('dragstart',startCardDragFromWaste);

	topOfWasteNode= card.node;

	card.node.addEventListener('dragstart', startCardDragFromWaste);
	flipCardFaceUp(card.node);

}

function moveFromWaste(card){
	topOfWasteNode= card.node.parentNode;
	card.node.parentNode.addEventListener('dragstart', startCardDragFromWaste);
	card.node.parentNode.removeChild(card.node);


	card.node.removeEventListener('dragstart',startCardDragFromWaste);
}

function refillStock(){
	var topWaste = getCard(topOfWasteNode);
	var topStock = getCard(topOfStockNode);
	
	while( ! topWaste.isEmptySlot ){
		moveFromWaste(topWaste);
		moveToStock(topWaste, topStock);

		topWaste = getCard(topOfWasteNode);
		topStock = getCard(topOfStockNode);
	}
}

//////////////////////////////////
//////////////////////////////////

function newGame(){
	setupGlobals();
	
	setupPropogateAndDefaultHandeling();
	setupCardDragAndDrop();	
	
	var winbox = document.getElementById("winAnnouncement");
	winbox.style.visibility = "hidden";

	
	collectCards();
	dealCards();
}


function setupGlobals(){
	tableausPiles = document.getElementsByClassName("tableau");
	foundationPiles = document.getElementsByClassName("foundation");
	stockPile = document.getElementById("stock");
	wastePile = document.getElementById("waste");
	
	topOfTableausNode = tableausPiles;
	topOfStockNode = stockPile;
	topOfWasteNode = wastePile;
	
	var foundationpileFull={
			'spade': false,
			'heart': false,
			'club': false,
			'diamond': false
			};
}

function setupPropogateAndDefaultHandeling(){
	var cards = document.getElementsByClassName("card");
	setupEventListeners(cards);
	
	setupEventListeners(tableausPiles);
	setupEventListeners(foundationPiles);
}

function setupEventListeners(collection){
	for( i=0; i< collection.length;i++){
		collection[i].addEventListener('dragover', handlePropogateAndDefault, false);
		collection[i].addEventListener('dragenter', handlePropogateAndDefault, false);
		collection[i].addEventListener('drop', handlePropogateAndDefault, false);
	}
	
}

// setup card dragging
function setupCardDragAndDrop(){
	for( i=0; i< tableausPiles.length;i++){
		tableausPiles[i].addEventListener('drop', tableauCardAcceptDrop, false);
	}
	
	for( i=0; i< foundationPiles.length;i++){
		foundationPiles[i].addEventListener('drop', foundationCardAcceptDrop, false);
	}
}

function collectCards(){
	var deckNode = document.getElementById("deck");
	
	var cardNodes = document.getElementsByClassName("card");
	
	// since cardNodes is a live collection, it acts oddly when removing 
	// and adding card nodes to other nodes. So we have to make a static copy 
	// of the nodes here.
	var staticCardNodes = [];
	for( i=0; i< cardNodes.length;i++){
		staticCardNodes.push(cardNodes[i]);
	}

	for( i=0; i< staticCardNodes.length;i++){
		staticCardNodes[i].removeEventListener('drop',tableauCardAcceptDrop);
		staticCardNodes[i].removeEventListener('drop',foundationCardAcceptDrop);
		staticCardNodes[i].removeEventListener('dragstart', startCardDragFromTableau);
		staticCardNodes[i].removeEventListener('dragstart',startCardDragFromWaste);
		staticCardNodes[i].removeEventListener('click',clickOnStock);

		staticCardNodes[i].parentNode.removeChild(staticCardNodes[i]);
		deckNode.appendChild(staticCardNodes[i]);
		flipCardFaceDown(staticCardNodes[i]);
	}
}

function dealCards(){
	var deck = document.getElementById("deck");
	var cards = deck.children;

	for( tabNum = 0; tabNum < tableausPiles.length; tabNum++){
		var numCards = tabNum+1;
		var ontoCard = getCard(tableausPiles[tabNum]);
		for( dealCard = 1; dealCard <= numCards; dealCard++){
			randomIndex = Math.floor(Math.random()* cards.length);
			var card = getCard( cards[randomIndex] );

			moveFromDeck(card);
			moveToTableau(card,ontoCard);
			ontoCard = card;
		}
		flipCardFaceUp(ontoCard.node); // top card now
	}

	var ontoCard = getCard(document.getElementById("stock"));
	
	while( cards.length >0){
		randomIndex = Math.floor(Math.random()* cards.length);
		var card = getCard(cards[randomIndex]);

		moveFromDeck(card);
		moveToStock(card,ontoCard);
		ontoCard = card;
	}
	ontoCard.node.addEventListener('click',clickOnStock);

	topOfWasteNode = document.getElementById("waste");
}

