var confirmPurchaseView = new ConfirmPurchaseView_cl();

function ConfirmPurchaseView_cl(){
	this.renderResultEntry = renderResultEntry;
	this.notify_px = notify_px;
}

function renderResultEntry(entryId_str, content_str){
	if (!($('#' + entryId_str).length)){
		$('#results-info').append($('<li></li>').attr('id', entryId_str).html(content_str));
	}
	else{
		$('#' + entryId_str).html(content_str);
	}
}

function notify_px(entry_opl, message_spl, data_opl){
	if (message_spl == 'consumer-basket-price-change'){
		this.renderResultEntry('price-entry', 'Gesamtpreis: ' + data_opl);
	}
	else if (message_spl == 'customer-firstName-change'){
		this.renderResultEntry('firstName-entry', 'Vorname: ' + data_opl);
	}
	else if (message_spl == 'customer-lastName-change'){
		this.renderResultEntry('lastName-entry', 'Nachname: ' + data_opl);
	}
}

function elementExists(entryId_str){
	return $(entryId_str).length;
}