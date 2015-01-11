Order_cl = Class.create({
	initialize: function(customer, basket){
		this.customer = customer;
		this.basket = basket;
		this.id = undefined;
	},
	
	send: function(){
		LITAPP.es_o.publish_px('order-change', this);
		if (this.id == undefined){
			$.post('order/', JSON.parse(JSON.stringify(order)))
				.done(function (data, textStatus, jqXHR){
					answer_obj = JSON.parse(data);
					order.id = answer_obj['id'];
				})
				.fail(function (jqXHR, textStatus, errorThrown){
				});
		}
		else{
			$.ajax({
				url: 'order/' + order.id,
				type: 'PUT',
				data: JSON.stringify(order),
				contentType: "application/json",
				dataType: "text"
				})
				.done(function (data, textStatus, jqXHR){	
				});
		}
	}
});