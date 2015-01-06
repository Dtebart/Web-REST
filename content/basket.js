function basketArticle_cl(number, name, price)
{
	this.quantity = 1;
	Article_cl.call(this, number, name, price);
}
basketArticle_cl.prototype = Article_cl;

function basket_cl (list)  {
	this.list = list;
	this.id = 0;
	this.totalPrice = 0;
	this.online = false;
	
	this.setTotalPrice = setTotalPrice;
	this.setQuantityOfArticle = setQuantityOfArticle;
	
	this.addArticle = addArticletoBasket;
	this.deleteArticle = deleteArticle;
	this.countArticle = countArticle;
	this.getprice = getprice;
	this.refresh = basketRefresh;
	this.getselectedArticle = getSelectedBasketArticle;
	this.sendUpdate = sendUpdate;
	this.selectedArticle = undefined;
}

function setTotalPrice(totalPrice){
	this.totalPrice = totalPrice;
	eventService.publish_px('consumer-basket-price-change', totalPrice);
}

function setQuantityOfArticle(article, newQuantity){
	var priceDifference = (newQuantity - article.quantity) * article.price;
	this.setTotalPrice(this.totalPrice + priceDifference);
	article.quantity = newQuantity;
}

function addArticletoBasket(article){
	this.setTotalPrice(this.totalPrice + article.price);
	for (i = 0; i < basket_list.length; i++)
	{
		if (article.number == basket_list[i].number)
		{
			basket_list[i].quantity++;
			return 1;
		}
	}
	basketArticle = new basketArticle_cl(article.number, article.name, article.price);
	basket_list.push(basketArticle);
	return 0;	
}

function deleteArticle()
{
	for (i = 0; i < basket_list.length; i++)
	{
		article = basket.getselectedArticle();
		if (article.number == basket_list[i].number)
		{
			basket_list.splice(i,1)
			this.setTotalPrice(this.totalPrice - article.price);
			return 1;
		}
	}
}

function basketRefresh(){
	
	$('#basket-article-number').html("Anzahl an Artikeln: " + basket.countArticle());
	$('#basket-price').html  ("Gesamtpreis: " + basket.getprice());
	$('#basket-entries').empty();
	for (i = 0; i < basket_list.length; i++)
	{
	$('#basket-entries').append("<tr> <th> " + basket_list[i].name +  "</th><th>" + basket_list[i].quantity + "</th>" + "<th>" + basket_list[i].price * basket_list[i].quantity + "</th> </tr>");
	}
}

function getSelectedBasketArticle(){
	var article;
	for (i = 0; i < this.list.length; i++){
		if (this.list[i].name == this.selectedArticle.slice(1, this.selectedArticle.length)){
			return this.list[i];
		}
	}
}

function getQuantityofArticle(article)
{
	for (i = 0; i < basket_list.length; i++)
	{
		if (article.number == basket_list[i].number)
		{			
			return basket_list[i].quantity;
		}
			
	}	
}

function countArticle() {
	quantityArticle = 0;
	for (i = 0; i < basket_list.length; i++)
	{
		quantityArticle+= basket_list[i].quantity;
	}
	
	return quantityArticle;
	
}

function getprice() {
	price = 0;
	for (i = 0; i < basket_list.length; i++)
	{
		price += basket_list[i].price * basket_list[i].quantity;
	}
	return price;
}

function sendUpdate(article) {
		if (basket.online === false){
			$.post('consumerbasket/', JSON.parse(JSON.stringify(article)), function(data, status){
		        var consumerbasket_obj = JSON.parse(data);
				
				basket.id = consumerbasket_obj["id"];
				basket.online = true;				
				basket.refresh();
			});
		}
		else{
			tmpBasket = {'id': basket.id, 'articles':{}};
			for (i = 0; i < basket_list.length; i++)
			{				
				tmpBasket.articles[i] = {'name':basket_list[i]['name'], 'price':basket_list[i]['price'], 'quantity': basket_list[i]['quantity'], 'number':basket_list[i]['number']};
			}			
			$.ajax({
				url: 'consumerbasket/' + basket.id,
				type: 'PUT',
				data: JSON.stringify(tmpBasket),
				contentType: "application/json",
				processData: false,	
				dataType: "text"
			}).done(function (basket_obj){				
				basket.refresh();
			});
		}	
}

	$(document).ready(function(){
	
	$('#add-quantity').click(function() {
		var article = basket.getselectedArticle();
		if (article.quantity < 9)
		{
			basket.setQuantityOfArticle(article, article.quantity + 1);
		}
		basket.sendUpdate(article);
		basket.refresh();
		});
		
	$('#remove-quantity').click(function() {
		var article = basket.getselectedArticle();
		if (article.quantity > 1)
		{
			basket.setQuantityOfArticle(article, article.quantity - 1);
		}
		basket.sendUpdate(article);
		basket.refresh();
		});
		
	$('#delete-from-basket').click(function() {
		basket.deleteArticle();
		basket.sendUpdate(article);
		basket.refresh();		
		});

	
	
	$('#add-to-basket').click(function() {
		var article = articleList.getSelectedArticle();
		basket.addArticle(article);
		article["quantity"] = getQuantityofArticle(article);
		basket.refresh();
		basket.sendUpdate(article);
	});
});