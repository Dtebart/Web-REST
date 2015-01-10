function StartView_cl(){
	this.notify_px = renderStart;
	
	LITAPP.es_o.subscribe_px(this, 'show-orders');
	LITAPP.es_o.subscribe_px(this, 'show-customers');
}

function renderElement(elementName_spl, templateName_spl, data_opl){
	var htmlContent_s = templateManager.execute_px(templateName_spl, data_opl);
	$(elementName_spl).html(htmlContent_s);
}

function renderStart(entry_opl, message_spl, data_opl){
	var templateName_s;
	var elementName_s;
	
	if (message_spl == 'show-orders'){
		templateName_s = 'admin-orders.template';
		elementName_s = '#orders';
	}
	else if (message_spl == 'show-customers'){
		templateName_s = 'admin-customer.template';
		elementName_s = '#customer';
	}
	renderElement(elementName_s, templateName_s, data_opl);
}