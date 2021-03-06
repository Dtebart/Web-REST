StartView_cl = Class.create({
	initialize: function (){
		LITAPP.es_o.subscribe_px(this, 'article-list-change');
		LITAPP.es_o.subscribe_px(this, 'basket-change');
		LITAPP.es_o.subscribe_px(this, 'article-details-change');
		LITAPP.es_o.subscribe_px(this, 'basket-emptied');
	},
	
	notify_px: function(entry_opl, message_spl, data_opl){
		var templateName_s;
		var elementName_s;
		
		if (message_spl == 'article-list-change'){
			templateName_s = 'articles.template';
			elementName_s = '#articles';
		}
		else if (message_spl == 'basket-change'){
			templateName_s = 'basket.template';
			elementName_s = '#basket';
		}
		else if (message_spl == 'article-details-change'){
			templateName_s = 'article-details.template';
			elementName_s = '#article-details';
		}
		else if (message_spl == 'basket-emptied'){
			templateName_s = 'basket.template';
			elementName_s = '#basket';
			$('#basket').hide();
		}
		
		renderElement(elementName_s, templateName_s, data_opl);
	},
	
	showBasket: function(){
		$('#basket').show();
	},
	
	showError: function(errortext){
		$('#startview-errortext').html(errortext);
	},
	
	deleteInfotext: function(){
		$('#startview-errortext').html('');
		$('#article-details').html('');
	}
});

function renderElement(elementName_spl, templateName_spl, data_opl){
	var htmlContent_s = templateManager.execute_px(templateName_spl, data_opl);
	$(elementName_spl).html(htmlContent_s);
}