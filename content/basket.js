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
	this.refresh = basketRefresh;
	this.online = false;
	this.id = 0;
	
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
	$(document).ready(function(){
	$('#add-to-basket').click(function() {
		var article = articleList.getSelectedArticle();
		
		if (basket.online === false){
			$.post('consumerbasket/', JSON.parse(JSON.stringify(article)), function(data, status){
				var consumerbasket_str = data.replace(/'/g, '"');
		        var consumerbasket_obj = JSON.parse(consumerbasket_str);
				
				basket.id = consumerbasket_obj["id"];
				basket.online = true;
				basket.addArticle(article);
				basket.refresh();
			});
		}
		else{
			$.ajax({
				url: 'consumerbasket/' + basket.id,
				type: 'PUT',
				data: article,
				dataType: 'json',
			}).done(function (basket_obj){
				basket.addArticle(article);
				basket.refresh();
			});
		}
	});
});

/*$(document).ready(function(){
	$('#add-to-basket').click(function() {
		var article = articleList.getSelectedArticle();
		basket.addArticle(article);
		basket.refresh();
	});
});*/