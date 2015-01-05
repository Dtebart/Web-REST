eventService = new EventService_cl();
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
		navigator_obj.showView('#confirm-purchase-view');
	});
	
	$('#confirm-purchase-button').click(function(event){
		$.post('customer/', JSON.parse(JSON.stringify(customer)), function(data, status){
			navigator_obj.showSubview('#purchase-results-subview');
		});
	});
	
	$('#cancel-button').click(function(event){
		navigator_obj.showView('#start-view');
	});
	
	$('#show-consumer-basket-view-button').click(function(event){
		navigator_obj.showView('#consumer-basket-view');
	});
	
	$('#complete-purchase-button').click(function (event){
		navigator_obj.showView('#start-view');
	});
}

$(document).ready(function(){
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
	
	/*$('#into-consumer-basket-button').click(function() {
		var article = articleList.getSelectedArticle();
		
		if (consumerbasket === undefined){
			$.post('consumerbasket/', JSON.parse(JSON.stringify(article)), function(data, status){
				var consumerbasket_str = data.replace(/'/g, '"');
		        var consumerbasket_obj = JSON.parse(consumerbasket_str);
				
				consumerbasket = new Consumerbasket_cl(consumerbasket_obj["id"], 1, article.price);
				consumerbasket.updateBasketView();
			});
		}
		else{
			$.ajax({
				url: 'consumerbasket/' + consumerbasket.id,
				type: 'PUT',
				data: article,
				dataType: 'json',
			}).done(function (basket_obj){
				consumerbasket.setPrice(basket_obj.price);
				consumerbasket.articleAmount = basket_obj.articleAmount;
				updateBasketView();
			});
		}
	});*/
	
	initButtons();
	
	$('#lastname-textbox').focusout(function (event){
		customer.setLastName(event.target.value);
	});

	$('#firstname-textbox').focusout(function (event){
		customer.setFirstName(event.target.value);
	});
});