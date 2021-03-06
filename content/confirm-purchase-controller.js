ConfirmPurchaseController_cl = Class.create({
	initialize: function(viewNavigator, confirmPurchaseView, order, customer){
		this.viewNavigator = viewNavigator;
		this.confirmPurchaseView = confirmPurchaseView;
		this.order = order;
		this.customer = customer;
		this.customerList = new CustomerList_cl();
		
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
			self.viewNavigator.showView('#consumer-basket-view');
		});
		
		$('#confirm-purchase-button').click(function(event){
			if (self.confirmPurchaseView.isCustomerTableVisible()){
				if (self.customerList.selectedCustomer != undefined){
					self.viewNavigator.showSubview('#results-subview');
					$('#customer-subview').hide();
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
					self.confirmPurchaseView.showError('Bitte einen Kunden anklicken');
				}
			}
			else{
				if (!self.customer.isEmpty()){
					$.post('customer/', JSON.parse(JSON.stringify(self.customer)))
						.done(function(data, textStatus, jqXHR){
							self.viewNavigator.showSubview('#results-subview');
							$('#customer-subview').hide();
							
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
								self.confirmPurchaseView.showError('Kundendaten existieren bereits');
							}
						});
				}
				else{
					self.confirmPurchaseView.showError('Bitte Kundendaten eingeben');
				}
			}
		});
	
		$('#cancel-button').click(function(event){
			self.confirmPurchaseView.reset();
			$.ajax({
				url: 'consumerbasket/' + self.order.basket.id,
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
						self.viewNavigator.showView('#start-view');
					})
					.fail(function (jqXHR, textStatus, errorThrown){
					})
					.always(function (data, textStatus, jqXHR){
						self.viewNavigator.showView('#start-view');
					});
		});
	
		$('#results-subview').on('click', '#complete-purchase-button', function (event){
			self.order.close();
			$('#customer-subview').show();
			self.viewNavigator.showView('#start-view');
			self.confirmPurchaseView.reset();
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