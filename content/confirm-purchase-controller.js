ConfirmPurchaseController_cl = Class.create({
	initialize: function(confirmPurchaseView, order, customer){
		this.confirmPurchaseView = confirmPurchaseView;
		this.order = order;
		this.customer = customer;
		this.basket = basket;
		
		this.initButtonControl();
		this.initCustomerControl();
	},
	
	initButtonControl: function(){
		var self = this;
		
		$('#show-consumer-basket-view-button').click(function(event){
			viewNavigator.showView('#consumer-basket-view');
		});
		
		$('#confirm-purchase-button').click(function(event){
			$.post('customer/', JSON.parse(JSON.stringify(self.customer)))
			.done(function(data, textStatus, jqXHR){
				viewNavigator.showSubview('#results-subview');
				
				var answer_obj = JSON.parse(data);
				self.customer.id = answer_obj['id'];
				self.order.setCustomer(self.customer);
				
				$.ajax({
					url: 'order/' + self.order.id,
					type: 'PUT',
					data: JSON.stringify(self.order),
					contentType: "application/json",
					dataType: "text"
					})
					.done(function (data, textStatus, jqXHR){	
					});
	
			}).fail(function (jqXHR, textStatus, errorThrown){
				if (errorThrown == 'Method Not Allowed'){
					alert('Nutzerdaten existieren bereits');
				}
			});
		});
	
		$('#cancel-button').click(function(event){
			$.ajax({
				url: 'consumerbasket/' + this.id,
				type: 'DELETE',
				contentType: "application/json",
				dataType: "text"
				})
				.done(function () {})
				.fail(function (jqXHR, textStatus, errorThrown){
				})
				.always(function (data, textStatus, jqXHR){
				});
			$.ajax({
					url: 'order/' + self.order.id,
					type: 'DELETE',
					contentType: "application/json",
					dataType: "text"
					})
					.done(function (data, textStatus, jqXHR){
						self.order.close();
						viewNavigator.showView('#start-view');
					})
					.fail(function (jqXHR, textStatus, errorThrown){
					})
					.always(function (data, textStatus, jqXHR){
						viewNavigator.showView('#start-view');
					});
		});
	
		$('#results-subview').on('click', '#complete-purchase-button', function (event){
			self.order.close();
			viewNavigator.showView('#start-view');
		});
	},
	
	initCustomerControl(){
		var self = this;
		
		$('#lastname-textbox').focusout(function (event){
			self.customer.setLastName(event.target.value);
		});

		$('#firstname-textbox').focusout(function (event){
			self.customer.setFirstName(event.target.value);
		});
	}
});