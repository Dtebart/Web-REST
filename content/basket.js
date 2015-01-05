var basket_list = [];
var basket = new basket_cl(basket_list);

function basketArticle_cl(number, name, price)
{
	this.quantity = 1;
	article_cl.call(this, number, name, price);
}
basketArticle_cl.prototype = article_cl;

function basket_cl (list)  {
	this.list = list;
	this.addArticle = addArticletoBasket;
	this.countArticle = countArticle;
	this.getprice = getprice;
	this.deleteArticle = deleteArticle;
	this.refresh = basketRefresh;
	this.getselectedArticle = getSelectedBasketArticle;
	this.online = false;
	this.id = 0;
	this.selectedArticle = undefined;
	this.sendUpdate = sendUpdate;
	
}

function addArticletoBasket(article){
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

function deleteArticle()
{
	for (i = 0; i < basket_list.length; i++)
	{
		article = basket.getselectedArticle();
		if (article.number == basket_list[i].number)
		{
			basket_list.splice(i,1)
			return 1;
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
				var consumerbasket_str = data.replace(/'/g, '"');
		        var consumerbasket_obj = JSON.parse(consumerbasket_str);
				
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
			article.quantity+=1;
		}
		basket.sendUpdate(article);
		basket.refresh();
		});
		
	$('#remove-quantity').click(function() {
		var article = basket.getselectedArticle();
		if (article.quantity > 2)
		{
			article.quantity-=1;
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

/*$(document).ready(function(){
	$('#add-to-basket').click(function() {
		var article = articleList.getSelectedArticle();
		basket.addArticle(article);
		basket.refresh();
	});
});*/