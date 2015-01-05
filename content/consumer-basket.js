var consumerbasket = undefined;

function Consumerbasket_cl(id, articleAmount, price){
	this.id = id;
	this.articleAmount = articleAmount;
	this.price = price;
	this.updateBasketView = updateBasketView;
	
	this.setPrice = setPrice;
	eventService.publish_px('consumer-basket-price-change', price);
}

function updateBasketView(){
	var articleAmountElem = $('<li>Anzahl Artikel: ' + consumerbasket.articleAmount + '</li>');
	var priceElem = $('<li>Gesamtpreis: ' + consumerbasket.price + '</li>');
	
	$('#consumer-basket-info').empty();
	$('#consumer-basket-info').append(articleAmountElem, priceElem);
}

function setPrice(price){
	this.price = price;
	
}