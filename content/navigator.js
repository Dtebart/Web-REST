ViewNavigator_cl = Class.create({
	initialize: function(){
		this.viewList = ['#start-view', '#consumer-basket-view', '#confirm-purchase-view'];
		this.subviewList = [];
		this.currentView = '#start-view';
	},
	
	showView: function(viewId){
		$(this.currentView).hide();
		$(viewId).show();
		
		this.currentView = viewId;
			
		//hide subviews
		for (var i = 0; i < this.subviewList.length; i++){
			$(this.subviewList[i]).hide();
		}
		this.subviewList.length = 0;
	},
	
	showSubview: function(subviewId){
		$(subviewId).show();
		this.subviewList.push(subviewId);
	}
});