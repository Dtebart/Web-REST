BasketController_cl = Class.create({
	initialize: function(basketView, basket, order){
		this.basketView = basketView;
		this.basket = basket;
		this.order = order;
		
		this.initButtonControl();
		this.initBasketListControl();
	},
	
	initButtonControl: function(){
		var self = this;
		
		$('#show-overview-button').click(function (event){
			viewNavigator.showView('#start-view');
		});
	
		$('#show-purchase-button').click(function(event){
			LITAPP.es_o.publish_px('order-change', self.order);
			if (self.order.id == undefined){
				$.post('order/', JSON.parse(JSON.stringify(self.order)))
					.done(function (data, textStatus, jqXHR){
						var answer_obj = JSON.parse(data);
						self.order.id = answer_obj['id'];
					})
					.fail(function (jqXHR, textStatus, errorThrown){
					});
			}
			else{
				$.ajax({
					url: 'order/' + self.order.id,
					type: 'PUT',
					data: JSON.stringify(self.order),
					contentType: "application/json",
					dataType: "text"
					})
					.done(function (data, textStatus, jqXHR){	
					});
				}
			viewNavigator.showView('#confirm-purchase-view');
		});
		
		$('#add-quantity').click(function() {
			var article = self.basket.getselectedArticle();
			if (article.quantity < 9)
			{
				self.basket.setQuantityOfArticle(article, article.quantity + 1);
			}
			self.basket.sendUpdate(article);
		})
			
		$('#remove-quantity').click(function() {
			var article = self.basket.getselectedArticle();
			if (article.quantity > 1)
			{
				self.basket.setQuantityOfArticle(article, article.quantity - 1);
			}
			self.basket.sendUpdate(article);
		})
			
		$('#delete-from-basket').click(function() {
			var article = self.basket.getselectedArticle();
		
			self.basket.deleteArticle();
			self.basket.sendUpdate(article);		
		})
	},
	
	initBasketListControl: function(){
		var self = this;
		
		$('#basket-articles').on('click', 'tbody tr', function(event) {
			self.basket.selectedArticle = $(this).children().first().text();
			LITAPP.es_o.publish_px('basket-change', self.basket);
		});
	}
});