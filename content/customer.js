function Customer_cl(firstName, lastName){
	this.firstName = firstName;
	this.lastName = lastName;

	this.setFirstName = setFirstName;
	this.setLastName = setLastName;
	
	setFirstName(firstName);
	setLastName(lastName);
	
	this.id = undefined;
}

function setFirstName(firstName){
	this.firstName = firstName;
}

function setLastName(lastName){
	this.lastName = lastName;
}