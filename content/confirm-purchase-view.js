var confirmPurchaseView = new ConfirmPurchaseView_cl();

function ConfirmPurchaseView_cl(){
	this.renderResultEntry = renderResultEntry;
	this.notify_px = notify_px;
}

function renderResultEntry(entryId_str, content_str){
	if (!elementExists(entryId_str)){
		$('#results-info').append($('<li></li>').attr('id', entryId_str)).text(content_str);
	}
	else{
		$(entryId_str).text(content_str);
	}
}

function notify_px(entry_opl, message_spl, data_opl){
	if (message_spl == 'consumer-basket-price-change'){
		this.renderResultEntry('#price-entry', 'Gesamtpreis: ' + data_opl);
	}
}

function elementExists(entryId_str){
	return ($(entryId_str).length);
}