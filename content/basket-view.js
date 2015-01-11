BasketView_cl = Class.create({
	initialize: function (){
		LITAPP.es_o.subscribe_px(this, 'basket-change');
	},
	
	notify_px: function(entry_opl, message_spl, data_opl){
		var templateName_s;
		var elementName_s;
	
		if (message_spl == 'basket-change'){
			templateName_s = 'basket-articles.template';
			elementName_s = '#basket-articles';
		}
	
		renderElement(elementName_s, templateName_s, data_opl);
	}
});