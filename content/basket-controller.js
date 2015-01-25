BasketController_cl = Class.create({
	initialize: function(viewNavigator, basketView, basket, order){
		this.viewNavigator = viewNavigator;
		this.basketView = basketView;
		this.basket = basket;
		this.order = order;
		
		this.initButtonControl();
		this.initBasketListControl();
	},
	
	initButtonControl: function(){
		var self = this;
		
		$('#show-overview-button').click(function (event){
			self.viewNavigator.showView('#start-view');
			self.basketView.deleteInfotext();
		});
	
		$('#show-purchase-button').click(function(event){
			LITAPP.es_o.publish_px('order-change', self.order);
			if (self.order.id == undefined){
				$.post('order/', JSON.stringify(self.order))
					.done(function (data, textStatus, jqXHR){
						self.order.id = JSON.parse(data)['id'];
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
			self.viewNavigator.showView('#confirm-purchase-view');
			self.basketView.deleteInfotext();
		});
		
		$('#add-quantity').click(function() {
			var article = self.basket.getselectedArticle();
			if (article != undefined){
				if (article.quantity < 9){
					self.basket.setQuantityOfArticle(article, article.quantity + 1);
					self.sendBasketUpdate(article);
				}
				else{
					self.basketView.showError('Maximale Anzahl erreicht');
				}
			}
			else{
				self.basketView.showError('Bitte einen Artikel anklicken');
			}
		})
			
		$('#remove-quantity').click(function() {
			var article = self.basket.getselectedArticle();
			if (article != undefined){
				if (article.quantity > 1){
					self.basket.setQuantityOfArticle(article, article.quantity - 1);
					self.sendBasketUpdate(article);
				}
				else{
					self.basketView.showError('Minimale Anzahl erreicht');
				}
			}
			else{
				self.basketView.showError('Bitte einen Artikel anklicken');
			}
		})
			
		$('#delete-from-basket').click(function() {
			var article = self.basket.getselectedArticle();
			
			if (article != undefined){
				self.basket.deleteArticle();
				self.sendBasketUpdate(article);
			}
			else{
				self.basketView.showError('Bitte einen Artikel anklicken');
			}
		})
	},
	
	initBasketListControl: function(){
		var self = this;
		
		$('#basket-articles').on('click', 'tbody tr', function(event) {
			self.basket.selectedArticle = $(this).children().first().text();
			LITAPP.es_o.publish_px('basket-change', self.basket);
		});
	},
	
	sendBasketUpdate: function(article){
		var self = this;
		if (this.basket.online == false){
			$.post('consumerbasket/', JSON.parse(JSON.stringify(article)))
				.done(function(data, textStatus, jqXHR){
					var basket = JSON.parse(data);
						
					self.basket.id = basket["id"];
					self.basket.online = true;				
				});
		}
		else{		
			$.ajax({
				url: 'consumerbasket/' + this.basket.id,
				type: 'PUT',
				data: JSON.stringify(this.basket),
				contentType: "application/json",
				processData: false,	
				dataType: "text"
			}).done(function (basket){				
			});
		}
	}
});