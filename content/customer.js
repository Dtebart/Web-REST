function Customer_cl(firstName, lastName){
	this.setFirstName = setFirstName;
	this.setLastName = setLastName;
	
	setFirstName(firstName);
	setLastName(lastName);
	
	this.id = undefined;
}

function setFirstName(firstName){
	this.firstName = firstName;
	LITAPP.es_o.publish_px('customer-firstName-set', this.firstName);
}

function setLastName(lastName){
	this.lastName = lastName;
	LITAPP.es_o.publish_px('customer-lastName-set', this.lastName);
}