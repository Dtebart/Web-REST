var LITAPP = {};
var templateManager;

var articleList;
var basket;
var customer;
var order;

var startView;
var confirmPurchaseView;
var basketView;

function changeElement(rootElem_spl, htmlContent_spl){
	$(rootElem_spl).html(htmlContent_spl);
}

function initObjects(){
	LITAPP.es_o = new EventService_cl();
	templateManager = new TELIB.TemplateManager_cl();
	
	articleList = new ArticleList_cl([]);
	basket = new Basket_cl([]);
	customer = new Customer_cl('', '');
	order = new Order_cl(customer, basket);
	
	startView = new StartView_cl();
	confirmPurchaseView = new ConfirmPurchaseView_cl();
	basketView = new BasketView_cl();
}

function initButtons(){
	$('#basket').click(function (event){
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
				navigator_obj.showSubview('#results-subview');
				
				answer_obj = JSON.parse(data);
				customer.id = answer_obj['id'];
				order.send();
			})
			.fail(function (jqXHR, textStatus, errorThrown){
				if (errorThrown == 'Method Not Allowed'){
					alert('Nutzerdaten existieren bereits');
				}
			});
		}
	});
	
	$('#cancel-button').click(function(event){
		basket.empty();
		$.ajax({
				url: 'order/' + order.id,
				type: 'DELETE',
				contentType: "application/json",
				dataType: "text"
				})
				.done(function (data, textStatus, jqXHR){
					order.customer = new Customer_cl('', '');
				})
				.fail(function (jqXHR, textStatus, errorThrown){
				})
				.always(function (data, textStatus, jqXHR){
					navigator_obj.showView('#start-view');
				});
	});
	
	$('#show-consumer-basket-view-button').click(function(event){
		navigator_obj.showView('#consumer-basket-view');
	});
	
	$('#results-subview').on('click', '#complete-purchase-button', function (event){
		basket.empty();
		order.customer = new Customer_cl('', '');
		navigator_obj.showView('#start-view');
	});
	
	$('#add-quantity').click(function() {
		var article = basket.getselectedArticle();
		if (article.quantity < 9)
		{
			basket.setQuantityOfArticle(article, article.quantity + 1);
		}
		basket.sendUpdate(article);
	});
		
	$('#remove-quantity').click(function() {
		var article = basket.getselectedArticle();
		if (article.quantity > 1)
		{
			basket.setQuantityOfArticle(article, article.quantity - 1);
		}
		basket.sendUpdate(article);
	});
		
	$('#delete-from-basket').click(function() {
		basket.deleteArticle();
		basket.sendUpdate(article);		
	});

	$('#add-to-basket').click(function() {
		var article = articleList.getSelectedArticle();
		basket.addArticle(article);
		article["quantity"] = basket.getQuantityofArticle(article);
		basket.sendUpdate(article);
		$('#basket').show();
	});
	
	$('#show-article-button').click(function() {
		var article = articleList.getSelectedArticle();
		$.get('article/' + article.number, function (data, status){
			var articleDetails_str = data.replace(/'/g, '"');
		    var articleDetails_obj = JSON.parse(articleDetails_str);
			
			LITAPP.es_o.publish_px('article-details-change', articleDetails_obj);
		});
	});
}

$(document).ready(function(){
	initObjects();
	
	$.get('article/', function(data, status){
		var articleList_str = data.replace(/'/g, '"');
		var articleList_json = JSON.parse(articleList_str);
			
		for (var i = 0; i < articleList_json.length; i++){
			articleList.addArticle(articleList_json[i]);
		}
	});
	
	initButtons();
	
	$('#articles').on('click', 'tbody tr', function(event) {
		articleList.setSelectedArticle($(this).children().first().text());
	});
	
	$('#basket-articles').on('click', 'tbody tr', function(event) {
		basket.selectedArticle = $(this).children().first().text();
		LITAPP.es_o.publish_px('basket-change', basket);
	});
	
	$('#lastname-textbox').focusout(function (event){
		customer.setLastName(event.target.value);
	});

	$('#firstname-textbox').focusout(function (event){
		customer.setFirstName(event.target.value);
	});
});