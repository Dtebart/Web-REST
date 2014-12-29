function addArticleToList(number, name, price){
	var articleElem = $('#articletable tbody').append('<tr></tr>');
	
	var numberElem = articleElem.append('<td>' + number + '</td>');
	var nameElem = articleElem.append('<td>' + name + '</td>');
	var priceElem = articleElem.append('<td>' + price + '</td>');
}

$(document).ready(function(){
	addArticleToList(1, 'HN-Cappy', 4.50);
	addArticleToList(2, 'HN-T-Shirt', 6.99);
	addArticleToList(3, 'HN-Cup', 3.50);
});
