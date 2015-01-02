var list = [];
var articleList = new articleList_cl(list);

function article_cl (number, name, price){
	this.number = number;
	this.name = name;
	this.price = price;
	this.updateArticleView = updateArticleView;
}

function articleList_cl (list)  {
	this.list = list;
	this.selectedArticle = null;
	this.addArticle = addArticle;
	this.getSelectedArticle = getSelectedArticle;
}

function addArticle(article){
	this.list.push(article);
	updateArticleView(article);
}

function getSelectedArticle(){
	var article;
	for (i = 0; i < this.list.length; i++){
		if (this.list[i].number == this.selectedArticle){
			return this.list[i];
		}
	}
}

function updateArticleView(article){
	var articleElem = $('<tr></tr>');
	$('#article-table tbody').append(articleElem);
	
	var numberElem = articleElem.append('<td>' + article.number + '</td>');
	var nameElem = articleElem.append('<td>' + article.name + '</td>');
	var priceElem = articleElem.append('<td>' + article.price + '</td>');
}

$(document).ready(function(){
	
	$.get('article/', function(data, status){
			var articleList_str = data.replace(/'/g, '"');
			var articleList_json = JSON.parse(articleList_str);
			
			for (var i = 0; i < articleList_json.length; i++){
				articleList.addArticle(articleList_json[i]);
			}
	});
	
	$('#article-table tbody').on('click', 'tr', function(event) {
		articleList.selectedArticle = $(this).children().first().text();
	});

	$('#show-article-button').click(function() {
		var article = articleList.getSelectedArticle();
		$.get('article/' + article.number, function (data, status){
			var articleDetails_str = data.replace(/'/g, '"');
		    var articleDetails_obj = JSON.parse(articleDetails_str);
			
			var details = '<p>Nummer: ' + article.number.toString() + ', Name: ' + article.name + ', Preis: ' + article.price.toString() + '</p>' + articleDetails_obj["article-description"];
			$('#article-details').html(details);
		});
	});
	
	$('#into-consumer-basket-button').click(function() {
		var article = articleList.getSelectedArticle();
		
		if (consumerbasket === undefined){
			$.post('consumerbasket/', JSON.parse(JSON.stringify(article)), function(data, status){
				var consumerbasket_str = data.replace(/'/g, '"');
		        var consumerbasket_obj = JSON.parse(consumerbasket_str);
				
				consumerbasket = new consumerbasket_cl(consumerbasket_obj["id"], 1, article.price);
				consumerbasket.updateBasketView();
			});
		}
		else{
			$.ajax({
				url: 'consumerbasket/' + consumerbasket.id,
				type: 'PUT',
				data: article,
				dataType: 'json',
			}).done(function (basket_obj){
				consumerbasket.price = basket_obj.price;
				consumerbasket.articleAmount = basket_obj.articleAmount;
				updateBasketView();
			});
		}
	});
});
