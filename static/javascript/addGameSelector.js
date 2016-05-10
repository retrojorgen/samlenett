$(function () {
	$(".add-game-button").on('click', function () {
		$("#add-game-box").show();

	});

	$(".region-select").on('change', function () {
		console.log($(event.target), $(event.target).val());
		var gameId = $(event.target).closest(".modal-box-wrapper").attr('data-attr-game-id');
		$.get("http://localhost:3000/tools/getgamefromgameid/" + gameId, function (games) {
			var showExtra = false;
			games.forEach(function (game) {
				if(game.region_id == $(event.target).val())
					showExtra = true;
			});

			if(showExtra)
				$(event.target).closest(".modal-box-wrapper").find(".extra-form").show();
		});
	});	


	$("#add-game-to-region").on('click', function () {
		$(".collection-table tbody").append($("<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>"));
	});
})