var LITAPP = {};
var orders;
var customer;
var data_opl = {};
templateManager = new TELIB.TemplateManager_cl();



$(document).ready(function(){
	LITAPP.es_o = new EventService_cl();
	startView = new StartView_cl();
	
	$('#to-customer').on('click', function(event) {
		
		$('#head-order').hide();
		$('#head-customer').show();
		$('#head-customer').show();
		LITAPP.es_o.publish_px('show-customers', data_opl);

	});	
	$('#to-order').on('click', function(event) {
		$('#head-order').show();
		$('#head-customer').hide();
		LITAPP.es_o.publish_px('show-orders', data_opl);
	});	
	
	$.get('../order/', function(data, status){
		var orderList_str = data.replace(/'/g, '"');
		var orderList_str = orderList_str.replace(/True/g, "true");
		var orderList_json = JSON.parse(orderList_str);
		orders = orderList_json;
		data_opl = orders;
		
		$.get('../customer/', function(data, status){
			var customerList_str = data.replace(/'/g, '"');
			var customerList_json = JSON.parse(customerList_str);
			customer = customerList_json;
			data_opl["customer"] = customer;
			LITAPP.es_o.publish_px('show-orders', data_opl);
		});	
	});	
	
});
