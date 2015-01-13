var LITAPP = {};
var templateManager;

var viewNavigator;
var startView;
var confirmPurchaseView;
var basketView;

$(document).ready(main);

function main(){
	LITAPP.es_o = new EventService_cl();
	templateManager = new TELIB.TemplateManager_cl();
	
	var articleList = new ArticleList_cl([]);
	var basket = new Basket_cl([]);
	var customer = new Customer_cl('test', 'test');
	var order = new Order_cl(customer, basket);
	
	viewNavigator = new ViewNavigator_cl();
	startView = new StartView_cl();
	confirmPurchaseView = new ConfirmPurchaseView_cl();
	basketView = new BasketView_cl();
	
	var startController = new StartController_cl(startView, articleList, basket);
	var basketController = new BasketController_cl(basketView, basket, order);
	var confirmPurchaseController = new ConfirmPurchaseController_cl(confirmPurchaseView, order, customer);
}