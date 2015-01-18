ConfirmPurchaseView_cl = Class.create({
	initialize: function(){
		LITAPP.es_o.subscribe_px(this, 'order-change');
		LITAPP.es_o.subscribe_px(this, 'basket-change');
		LITAPP.es_o.subscribe_px(this, 'customer-table-change');
	},
	
	notify_px: function(entry_opl, message_spl, data_opl){
		var templateName_s;
		var elementName_s;
		
		if (message_spl == 'order-change'){
			templateName_s = 'results.template';
			elementName_s = '#results-info';
		}
		else if (message_spl == 'basket-change'){
			templateName_s = 'basket-articles.template';
			elementName_s = '#basket-articles-result';
		}
		else if (message_spl == 'customer-table-change'){
			templateName_s = 'customer.template';
			elementName_s = '#customer-table-subview';
		}
		
		renderElement(elementName_s, templateName_s, data_opl);
	},
	
	showStartLayout: function(){
		$('#customer-subview').show();
	},
	
	showCustomerForm: function(){
		$('#customer-info-form').show();
		$('#customer-table-subview').hide();
	},
	
	showCustomerTable: function(){
		$('#customer-table-subview').show();
		$('#customer-info-form').hide();
	}
});