CustomerList_cl = Class.create({
	initialize: function(){
		this.list = [];
		this.selectedCustomer = undefined;
	},
	
	addCustomer: function(customer){
		this.list.push(customer);
		LITAPP.es_o.publish_px('customer-table-change', this);
	},
	
	setSelectedCustomer: function(customer){
			this.selectedCustomer = customer;
			LITAPP.es_o.publish_px('customer-table-change', this);
	}
});

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
	},
	
	isEmpty: function(){
		return (this.firstName == '' || this.lastName == '');
	},
	
	clear: function(){
		this.firstName = '';
		this.lastName = '';
		this.id = undefined;
	}
});