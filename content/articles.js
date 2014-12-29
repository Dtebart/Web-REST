var articleList = [];
var selectedArticle = 1;

function addArticleToList(number, name, price){
	var article = { 'number' : number,
					'name'   : name,
					'price'  : price };
	articleList.push(article);
	
	var articleElem = $('<tr></tr>');
	$('#article-table tbody').append(articleElem);
	
	var numberElem = articleElem.append('<td>' + number + '</td>');
	var nameElem = articleElem.append('<td>' + name + '</td>');
	var priceElem = articleElem.append('<td>' + price + '</td>');
}

function getArticle(number){
	var article;
	for (i = 0; i < articleList.length; i++){
		if (articleList[i]['number'] == number){
			return articleList[i];
		}
	}
}

$(document).ready(function(){

	$('#article-table tbody').on('click', 'tr', function(event) {
		selectedArticle = $(this).children().first().text();
	});

	$('#show-article-button').click(function() {
		var article = getArticle(selectedArticle);
		var details = '<p>Nummer: ' + article.number + ', Name: ' + article.name + ', Preis: ' + article.price + '</p>';
		$('#article-details').html(details);
	});
	
	addArticleToList(1, 'HN-Cappy', 4.50);
	addArticleToList(2, 'HN-T-Shirt', 6.99);
	addArticleToList(3, 'HN-Cup', 3.50);
});
