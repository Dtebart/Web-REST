Customer_cl = Class.create({
	initialize: function (firstName, lastName){
		this.firstName = firstName;
		this.lastName = lastName;
		this.id = undefined;
		
		this.setFirstName(firstName);
		this.setLastName(lastName);
	},
	
	setFirstName: function(firstName){
		this.firstName = firstName;
	},
	
	setLastName: function(lastName){
		this.lastName = lastName;
	}
});