$(function ()  {
	$(".close-button").on('click', function (event) {
		$(event.target).closest(".modal-box-wrapper").hide();
	});
})