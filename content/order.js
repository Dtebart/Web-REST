Order_cl = Class.create({
	initialize: function(customer, basket){
		this.customer = customer;
		this.basket = basket;
		this.id = undefined;
	},
	
	setCustomer: function(customer){
		this.customer = customer;
		LITAPP.es_o.publish_px('order-change', this);
	},
	
	emptyBasket: function(){
		this.basket.empty();
	}
});