var viewList = ['#start-view', '#consumer-basket-view', '#confirm-purchase-view'];
var navigator_obj = {
		viewList: viewList,
		currentView: '#start-view',
	    showView: function (view_id){
			$(this.currentView).hide();
			$(view_id).show();
		
			this.currentView = view_id;
			}
		};