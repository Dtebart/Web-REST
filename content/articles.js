function Article_cl (number, name, price){
	this.number = number;
	this.name = name;
	this.price = price;
	this.quantity = 1;
}

function ArticleList_cl (list)  {
	this.list = list;
	this.selectedArticle = null;
	
	this.addArticle = addArticle;
	this.setSelectedArticle = setSelectedArticle;
	this.getSelectedArticle = getSelectedArticle;
}

function addArticle(article){
	this.list.push(article);
	LITAPP.es_o.publish_px('article-list-change', this);
}

function setSelectedArticle(article){
	this.selectedArticle = article;
	LITAPP.es_o.publish_px('article-list-change', this);
}

function getSelectedArticle(){
	var article;
	for (i = 0; i < this.list.length; i++){
		if (this.list[i].number == this.selectedArticle){
			return this.list[i];
		}
	}
}

