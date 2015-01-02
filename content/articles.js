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
