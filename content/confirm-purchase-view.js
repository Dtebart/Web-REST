var confirmPurchaseView = new ConfirmPurchaseView_cl();

function ConfirmPurchaseView_cl(){
	this.notify_px = renderPurchase;
}

function renderPurchase(entry_opl, message_spl, data_opl){
	if (message_spl == 'consumer-basket-price-change'){
		this.renderResultEntry('price-entry', 'Gesamtpreis: ' + data_opl);
	}
	else if (message_spl == 'customer-firstName-set'){
		this.renderResultEntry('firstName-entry', 'Vorname: ' + data_opl);
	}
	else if (message_spl == 'customer-lastName-set'){
		this.renderResultEntry('lastName-entry', 'Nachname: ' + data_opl);
	}
}