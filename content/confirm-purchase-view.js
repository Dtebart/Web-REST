function ConfirmPurchaseView_cl(){
	this.notify_px = renderPurchase;
	
	LITAPP.es_o.subscribe_px(this, 'order-change');
	LITAPP.es_o.subscribe_px(this, 'basket-change');
}

function renderPurchase(entry_opl, message_spl, data_opl){
	var templateName_s;
	var elementName_s;
	
	if (message_spl == 'order-change'){
		templateName_s = 'results.template';
		elementName_s = '#results';
	}
	else if (message_spl == 'basket-change'){
		templateName_s = 'basket-articles.template';
		elementName_s = '#basket-articles';
	}
	
	renderElement(elementName_s, templateName_s, data_opl);
}