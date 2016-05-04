$(function () {
	$('.tabs li').on('click', function (event) {
		var tabContainerId = $(event.target).parent().attr("data-tab-container");
		var newVisibleTab = $(event.target).attr("data-tab");
		console.log(tabContainerId, newVisibleTab);
		$(event.target).parent().children().removeClass("selected");
		$(event.target).addClass("selected");
		$("#" + tabContainerId + " .form-tab").removeClass("visible");
		$("#" + tabContainerId + " #" + newVisibleTab).addClass("visible");
	});
})