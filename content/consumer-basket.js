var consumerbasket = undefined;

function consumerbasket_cl(id, articleAmount, price){
	this.id = id;
	this.articleAmount = articleAmount;
	this.price = price;
	this.updateBasketView = updateBasketView;
}

function updateBasketView(){
	var articleAmountElem = $('<li>Anzahl Artikel: ' + consumerbasket.articleAmount + '</li>');
	var priceElem = $('<li>Gesamtpreis: ' + consumerbasket.price + '</li>');
	
	console.log("Test");
	$('#consumer-basket-info').empty();
	$('#consumer-basket-info').append(articleAmountElem, priceElem);
}