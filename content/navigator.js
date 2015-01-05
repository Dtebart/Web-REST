var viewList = ['#start-view', '#consumer-basket-view', '#confirm-purchase-view'];
var navigator_obj = {
		subviewList: [],
		currentView: '#start-view',
	    showView: function (view_id){
			//hide view
			$(this.currentView).hide();
			$(view_id).show();
		
			this.currentView = view_id;
			
			//hide subviews
			for (var i = 0; i < this.subviewList.length; i++){
				$(this.subviewList[i]).hide();
			}
			this.subviewList.length = 0;
		},
		showSubview: function (subview_id){
			$(subview_id).show();
			this.subviewList.push(subview_id);
		}
	};