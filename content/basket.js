Basket_cl = Class.create({
	initialize: function (list) {
		this.list = list;
		this.id = 0;
		this.totalPrice = 0;
		this.online = false;
		this.selectedArticle = undefined;
	},
	
	setTotalPrice: function (totalPrice){
		this.totalPrice = totalPrice;
		LITAPP.es_o.publish_px('basket-change', this);
	},
	
	setQuantityOfArticle: function (article, newQuantity){
		var priceDifference = (newQuantity - article.quantity) * article.price;
		this.setTotalPrice(this.totalPrice + priceDifference);
		article.quantity = newQuantity;
	},
	
	getQuantityofArticle: function (article){
		for (i = 0; i < this.list.length; i++)
		{
			if (article.number == this.list[i].number)
			{			
				return this.list[i].quantity;
			}	
		}
	},
	
	empty: function(){
		$.ajax({
		url: 'consumerbasket/' + basket.id,
		type: 'DELETE',
		contentType: "application/json",
		dataType: "text"
		})
		.done(function () {})
		.fail(function (jqXHR, textStatus, errorThrown){
		})
		.always(function (data, textStatus, jqXHR){
			viewNavigator.showView('#start-view');
		});
		this.list.length = 0;
		this.online = false;
		this.totalPrice = 0;
		this.id = undefined;
		
		LITAPP.es_o.publish_px('basket-emptied', this);
	},
	
	addArticle: function (article){
		this.setTotalPrice(this.totalPrice + article.price);
		for (i = 0; i < this.list.length; i++)
		{
			if (article.number == this.list[i].number)
			{
				this.list[i].quantity++;
				return 1;
			}
		}
		var basketArticle = new Article_cl(article.number, article.name, article.price);
		this.list.push(basketArticle);
		return 0;
	},
	
	deleteArticle: function (){
		for (i = 0; i < this.list.length; i++)
		{
			article = basket.getselectedArticle();
			if (article.number == this.list[i].number)
			{
				this.list.splice(i,1)
				this.setTotalPrice(this.totalPrice - (article.price * article.quantity));
				return 1;
			}
		}
	},
	
	getselectedArticle: function(){
		var article;
		for (i = 0; i < this.list.length; i++){;
			if (this.list[i].number == this.selectedArticle){
				return this.list[i];
			}
		}
	},
	
	countArticle : function(){
		quantityArticle = 0;
		for (i = 0; i < this.list.length; i++)
		{
			quantityArticle+= this.list[i].quantity;
		}
		return quantityArticle;
	},
	
	getPrice : function() {
		price = 0;
		for (i = 0; i < this.list.length; i++)
		{
			price += this.list[i].price * this.list[i].quantity;
		}
		return price;
	},
	
	sendUpdate: function (article) {
		if (basket.online === false){
		$.post('consumerbasket/', JSON.parse(JSON.stringify(article)), function(data, status){
		    var consumerbasket_obj = JSON.parse(data);
				
			basket.id = consumerbasket_obj["id"];
			basket.online = true;				
			});
		}
		else{
			tmpBasket = {'id': basket.id, 'articles':{}};
			for (i = 0; i < this.list.length; i++)
			{				
				tmpBasket.articles[i] = {'name':this.list[i]['name'], 'price':this.list[i]['price'], 'quantity': this.list[i]['quantity'], 'number':this.list[i]['number']};
			}			
			$.ajax({
				url: 'consumerbasket/' + basket.id,
				type: 'PUT',
				data: JSON.stringify(tmpBasket),
				contentType: "application/json",
				processData: false,	
				dataType: "text"
			}).done(function (basket_obj){				
			});
		}
	}
});