var list = [];
articleList = new articleList_cl(list);

function article_cl (number, name, price){
	this.number = number;
	this.name = name;
	this.price = price;
}

function articleList_cl (list)  {
	this.list = list;
	this.selectedArticle = null;
	this.addArticle = addArticle;
	this.getSelectedArticle = getSelectedArticle;
}

function addArticle(article){
	this.list.push(article);
	
	var articleElem = $('<tr></tr>');
	$('#article-table tbody').append(articleElem);
	
	var numberElem = articleElem.append('<td>' + article.number + '</td>');
	var nameElem = articleElem.append('<td>' + article.name + '</td>');
	var priceElem = articleElem.append('<td>' + article.price + '</td>');
}

function getSelectedArticle(){
	var article;
	for (i = 0; i < this.list.length; i++){
		if (this.list[i].number == this.selectedArticle){
			return this.list[i];
		}
	}
}

$(document).ready(function(){
	
	$.get('article', function(data, status){
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
		var details = '<p>Nummer: ' + article.number + ', Name: ' + article.name + ', Preis: ' + article.price + '</p>';
		$('#article-details').html(details);
	});
});
