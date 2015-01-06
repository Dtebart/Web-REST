function Customer_cl(firstName, lastName){
	this.firstName = firstName;
	this.lastName = lastName;
	this.setFirstName = setFirstName;
	this.setLastName = setLastName;
}

function setFirstName(firstName){
	this.firstName = firstName;
	eventService.publish_px('customer-firstName-change', this.firstName);
}

function setLastName(lastName){
	this.lastName = lastName;
	eventService.publish_px('customer-lastName-change', this.lastName);
}