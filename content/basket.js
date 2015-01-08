function Basket_cl (list)  {
	this.list = list;
	this.id = 0;
	this.totalPrice = 0;
	this.online = false;
	
	this.setTotalPrice = setTotalPrice;
	this.setQuantityOfArticle = setQuantityOfArticle;
	
	this.empty = empty;
	this.addArticle = addArticletoBasket;
	this.deleteArticle = deleteArticle;
	this.countArticle = countArticle;
	this.getprice = getprice;
	this.refresh = basketRefresh;
	this.getselectedArticle = getSelectedBasketArticle;
	this.getQuantityofArticle = getQuantityofArticle;
	this.sendUpdate = sendUpdate;
	this.selectedArticle = undefined;
}

function setTotalPrice(totalPrice){
	this.totalPrice = totalPrice;
	LITAPP.es_o.publish_px('basket-change', this);
}

function setQuantityOfArticle(article, newQuantity){
	var priceDifference = (newQuantity - article.quantity) * article.price;
	this.setTotalPrice(this.totalPrice + priceDifference);
	article.quantity = newQuantity;
}

function empty(){
	$.ajax({
		url: 'consumerbasket/' + basket.id,
		type: 'DELETE',
		contentType: "application/json",
		dataType: "text"
		})
		.done(function () {})
		.fail(function (jqXHR, textStatus, errorThrown){
		})
		.always(function (data, textStatus, jqXHR){
			navigator_obj.showView('#start-view');
	});
	this.list.length = 0;
	this.online = false;
    this.totalPrice = 0;
	this.id = undefined;
	
	LITAPP.es_o.publish_px('basket-emptied', this);
}

function addArticletoBasket(article){
	for (i = 0; i < this.list.length; i++)
	{
		if (article.number == this.list[i].number)
		{
			this.list[i].quantity++;
			return 1;
		}
	}
	var basketArticle = new Article_cl(article.number, article.name, article.price);
	this.list.push(basketArticle);
	this.setTotalPrice(this.totalPrice + article.price);
	return 0;	
}

function deleteArticle()
{
	for (i = 0; i < this.list.length; i++)
	{
		article = basket.getselectedArticle();
		if (article.number == this.list[i].number)
		{
			this.list.splice(i,1)
			this.setTotalPrice(this.totalPrice - article.price);
			return 1;
		}
	}
}

function basketRefresh(){
	$('#basket-entries').empty();
	for (i = 0; i < this.list.length; i++)
	{
		$('#basket-entries').append("<tr> <th> "+ this.list[i].number + "</th><th>" + this.list[i].name +  "</th><th>" + this.list[i].quantity + "</th>" + "<th>" + this.list[i].price +  "</th><th>" + this.list[i].price * this.list[i].quantity + "</th> </tr>");
	}
	$('#basket-entries').append("<tr> <th> "+ "</th><th>" + "</th>" + "<th>" + "Gesamtpreis:" +  "</th><th>" + this.totalPrice + "</th> </tr>");
}

function getSelectedBasketArticle(){
	var article;
	for (i = 0; i < this.list.length; i++){;
		if (this.list[i].number == this.selectedArticle.slice(1, this.selectedArticle.length)){
			return this.list[i];
		}
	}
}

function getQuantityofArticle(article)
{
	for (i = 0; i < this.list.length; i++)
	{
		if (article.number == this.list[i].number)
		{			
			return this.list[i].quantity;
		}	
	}	
}

function countArticle() {
	quantityArticle = 0;
	for (i = 0; i < this.list.length; i++)
	{
		quantityArticle+= this.list[i].quantity;
	}
	
	return quantityArticle;
	
}

function getprice() {
	price = 0;
	for (i = 0; i < this.list.length; i++)
	{
		price += this.list[i].price * this.list[i].quantity;
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
			for (i = 0; i < this.list.length; i++)
			{				
				tmpBasket.articles[i] = {'name':this.list[i]['name'], 'price':this.list[i]['price'], 'quantity': this.list[i]['quantity'], 'number':this.list[i]['number']};
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