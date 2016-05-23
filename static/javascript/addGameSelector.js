$(function () {
	$(".add-game-button").on('click', function () {
		$("#add-game-box").show();

	});

	$("#add-game-to-region").on('click', function () {
		$(".collection-table tbody").append($("<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>"));
	});
})