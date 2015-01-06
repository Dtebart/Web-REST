var eventService;

var list = [];
var articleList;

var basket_list = [];
var basket;
var customer;
var order;

function initObjects(){
	eventService = new EventService_cl();
	
	articleList = new ArticleList_cl(list);
	
	basket = new basket_cl(basket_list);
	customer = new Customer_cl('', '');
	order = new Order_cl(customer, basket);
}

function createObserver(){
	eventService.subscribe_px(confirmPurchaseView, 'consumer-basket-price-change');
	eventService.subscribe_px(confirmPurchaseView, 'customer-lastName-change');
	eventService.subscribe_px(confirmPurchaseView, 'customer-firstName-change');
}

function initButtons(){
	$('#consumer-basket').click(function (event){
		navigator_obj.showView('#consumer-basket-view');
	});
	
	$('#show-overview-button').click(function (event){
		navigator_obj.showView('#start-view');
	});
	
	$('#show-purchase-button').click(function(event){
		order.send();
		navigator_obj.showView('#confirm-purchase-view');
	});
	
	$('#confirm-purchase-button').click(function(event){
		if (customer.id == undefined){
			$.post('customer/', JSON.parse(JSON.stringify(customer)))
			.done(function(data, textStatus, jqXHR){
				navigator_obj.showSubview('#purchase-results-subview');
				
				answer_obj = JSON.parse(data);
				customer.id = answer_obj['id'];
				order.send();
			})
			.fail(function (jqXHR, textStatus, errorThrown){
			});
		}
	});
	
	$('#cancel-button').click(function(event){
		navigator_obj.showView('#start-view');
	});
	
	$('#show-consumer-basket-view-button').click(function(event){
		navigator_obj.showView('#consumer-basket-view');
	});
	
	$('#complete-purchase-button').click(function (event){
		customer = new Customer_cl('', '');
		navigator_obj.showView('#start-view');
	});
}

$(document).ready(function(){
	initObjects();
	createObserver();

	$.get('article/', function(data, status){
			var articleList_str = data.replace(/'/g, '"');
			var articleList_json = JSON.parse(articleList_str);
			
			for (var i = 0; i < articleList_json.length; i++){
				articleList.addArticle(articleList_json[i]);
			}
	});
	
	$('#article-table tbody').on('click', 'tr', function(event) {
		articleList.selectedArticle = $(this).children().first().text();
	});
	
	$('#basket-table tbody').on('click', 'tr', function(event) {
		basket.selectedArticle = $(this).children().first().text();
	});

	$('#show-article-button').click(function() {
		var article = articleList.getSelectedArticle();
		$.get('article/' + article.number, function (data, status){
			var articleDetails_str = data.replace(/'/g, '"');
		    var articleDetails_obj = JSON.parse(articleDetails_str);
			
			var details = '<p>Nummer: ' + article.number.toString() + ', Name: ' + article.name + ', Preis: ' + article.price.toString() + '</p>' + articleDetails_obj["article-description"];
			$('#article-details').html(details);
		});
	});
	
	initButtons();
	
	$('#lastname-textbox').focusout(function (event){
		customer.setLastName(event.target.value);
	});

	$('#firstname-textbox').focusout(function (event){
		customer.setFirstName(event.target.value);
	});
});