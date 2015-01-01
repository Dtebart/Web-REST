var basket_list = [];
var basket = new basket_cl(basket_list);

function basket_cl (list)  {
	this.list = list;
	this.addArticle = addArticletoBasket;
	this.countArticle = countArticle;
	this.getprice = getprice;
	this.refresh = basketRefresh;
	
}

function addArticletoBasket(article){
	basket_list.push(article);	
}

function basketRefresh(){
	$('#basket-article-number').html("Anzahl an Artikeln: " + basket.countArticle());
	$('#basket-price').html  ("Gesamtpreis: " + basket.getprice());
}

function countArticle() {
	return basket_list.length;
}

function getprice() {
	price = 0;
	for (i = 0; i < basket_list.length; i++)
	{
		price += basket_list[i].price;
	}
	return price;
}

$(document).ready(function(){
	$('#add-to-basket').click(function() {
		var article = articleList.getSelectedArticle();
		basket.addArticle(article);
		basket.refresh();
	});
});