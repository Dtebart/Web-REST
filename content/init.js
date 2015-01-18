var LITAPP = {};
var templateManager;

$(document).ready(main);

function main(){
	LITAPP.es_o = new EventService_cl();
	templateManager = new TELIB.TemplateManager_cl();
	
	var articleList = new ArticleList_cl([]);
	var basket = new Basket_cl([]);
	var customer = new Customer_cl('test', 'test');
	var order = new Order_cl(customer, basket);
	
	var viewNavigator = new ViewNavigator_cl();
	var startView = new StartView_cl();
	var confirmPurchaseView = new ConfirmPurchaseView_cl();
	var basketView = new BasketView_cl();
	
	var startController = new StartController_cl(viewNavigator, startView, articleList, basket);
	var basketController = new BasketController_cl(viewNavigator, basketView, basket, order);
	var confirmPurchaseController = new ConfirmPurchaseController_cl(viewNavigator, confirmPurchaseView, order, customer);
}