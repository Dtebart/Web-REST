function Article_cl (number, name, price){
	this.number = number;
	this.name = name;
	this.price = price;
}

function ArticleList_cl (list)  {
	this.list = list;
	this.selectedArticle = null;
	this.addArticle = addArticle;
	this.getSelectedArticle = getSelectedArticle;
}

function addArticle(article){
	this.list.push(article);
	LITAPP.es_o.publish_px('article-list-change', this.list);
}

function getSelectedArticle(){
	var article;
	for (i = 0; i < this.list.length; i++){
		if (this.list[i].number == this.selectedArticle){
			return this.list[i];
		}
	}
}

