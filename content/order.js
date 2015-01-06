function Order_cl(customer, basket){
	this.customer = customer;
	this.basket = basket;
	this.id = undefined;
	
	this.send = send;
}

function send(){
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