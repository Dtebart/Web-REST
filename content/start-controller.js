StartController_cl = Class.create({
	initialize: function (viewNavigator, startView, articleList, basket){		
		this.viewNavigator = viewNavigator;
		this.startView = startView;
		this.articleList = articleList;
		this.basket = basket;
		
		this.initButtonControl();
		this.initArticleListControl();
		this.initBasketControl();
	},
	
	initButtonControl: function(){
		var self = this;
		
		$('#show-article-button').click(function() {
			var article = self.articleList.getSelectedArticle();
			$.get('article/' + article.number, function (data, status){
				var articleDetails_str = data.replace(/'/g, '"');
				var articleDetails_obj = JSON.parse(articleDetails_str);
			
				LITAPP.es_o.publish_px('article-details-change', articleDetails_obj);
			});
		});
		
		$('#add-to-basket-button').click(function() {
			var article = self.articleList.getSelectedArticle();
			if (article != undefined){
				self.basket.addArticle(article);
				article["quantity"] = self.basket.getQuantityofArticle(article);
				self.basket.sendUpdate(article);
				$('#basket').show();
			}
		});
	},
	
	initArticleListControl: function(){
		var self = this;
	
		$.get('article/', function(data, status){
			var articleList_str = data.replace(/'/g, '"');
			var articleList_json = JSON.parse(articleList_str);
				
			for (var i = 0; i < articleList_json.length; i++){
				self.articleList.addArticle(articleList_json[i]);
			}
		});
		
		$('#articles').on('click', 'tbody tr', function(event) {
			self.articleList.setSelectedArticle($(this).children().first().text());
		});
	},
	
	initBasketControl: function(){
		var self = this;
		$('#basket').click(function (event){
			self.viewNavigator.showView('#consumer-basket-view');
		});
	}
});