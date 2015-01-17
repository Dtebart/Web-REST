ConfirmPurchaseController_cl = Class.create({
	initialize: function(confirmPurchaseView, order, customer){
		this.confirmPurchaseView = confirmPurchaseView;
		this.order = order;
		this.customer = customer;
		this.customerList = new CustomerList_cl();
		this.basket = basket;
		
		this.initButtonControl();
		this.initCustomerControl();
		this.initCustomerTableControl();
	},
	
	initButtonControl: function(){
		var self = this;
		
		$('#new-customer-radio-button').click(function(event){
			self.customerList.setSelectedCustomer(undefined);
			self.confirmPurchaseView.showCustomerForm();
		});
		
		$('#existing-customer-radio-button').click(function(event){
			self.confirmPurchaseView.showCustomerTable();
		});
		
		$('#show-consumer-basket-view-button').click(function(event){
			viewNavigator.showView('#consumer-basket-view');
		});
		
		$('#confirm-purchase-button').click(function(event){
			viewNavigator.showSubview('#results-subview');
			if (self.customerList.selectedCustomer != undefined){
				self.order.setCustomer(self.customerList.selectedCustomer);
				
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
			else{
				$.post('customer/', JSON.parse(JSON.stringify(self.customer)))
				.done(function(data, textStatus, jqXHR){
				
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
			}
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
	
	initCustomerTableControl: function(){
		var self = this;
		
		$.get('customer/')
		.done(function(data, textStatus, jqXHR){
			var customerList_o = JSON.parse(data);
			
			for (var i = 0; i < customerList_o.length; i++){
				var newCustomer = new Customer_cl(customerList_o[i].firstName, customerList_o[i].lastName);
				self.customerList.addCustomer(newCustomer);
			}
		});
		
		$('#customer-table-subview').on('click', 'tbody tr', function(event) {
			var selectedCustomer = new Customer_cl($(this).children().last().text(), $(this).children().first().text());
			self.customerList.setSelectedCustomer(selectedCustomer);
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