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
	
	close: function(){
		this.basket.empty();
		this.customer.clear();
		this.id = undefined;
	}
});