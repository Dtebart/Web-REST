Article_cl = Class.create({
	initialize: function (number, name, price){
		this.number = number;
		this.name = name;
		this.price = price;
		this.quantity = 1;
	}
});

ArticleList_cl = Class.create({
	initialize: function (list) {
		this.list = list;
		this.selectedArticle = null;
	},
	
	addArticle: function (article) {
		this.list.push(article);
		LITAPP.es_o.publish_px('article-list-change', this);
	},
	
	setSelectedArticle: function (article){
		this.selectedArticle = article;
		LITAPP.es_o.publish_px('article-list-change', this);
	},
	
	getSelectedArticle: function (){
		var article;
		for (i = 0; i < this.list.length; i++){
			if (this.list[i].number == this.selectedArticle){
				return this.list[i];
			}
		}
	}
});

