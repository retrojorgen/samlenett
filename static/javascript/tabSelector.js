$(function () {
	$('.tabs li').on('click', function (event) {
		var tabContainerId = $(event.target).parent().attr("data-tab-container");
		var newVisibleTab = $(event.target).attr("data-tab");
		$(event.target).parent().children().removeClass("selected");
		$(event.target).addClass("selected");
		$("#" + tabContainerId + " .form-tab").removeClass("visible");
		$("#" + tabContainerId + " #" + newVisibleTab).addClass("visible");
	});

	$(".close-button").on('click', function (event) {
		$(event.target).closest(".modal-box-wrapper").hide();
	});

	$("#login-toggle").on('click', function (event) {
		$("#login-box").show();
	});


	var signupCheckAttributes = {
		'username': false,
		'password': false,
		'password-repeat': false,
		'nick': false
	};


	var signupCheckToggle = function () {
		console.log(signupCheckAttributes);
		if(signupCheckAttributes['username'] && signupCheckAttributes['password'] && signupCheckAttributes['password-repeat'] && signupCheckAttributes['nick']) {
			console.log('fjerner disabled');
			$("#signup-form .login").removeAttr('disabled');
		} else {
			console.log('skrur på disabled');
			$("#signup-form .login").attr('disabled', 'disabled');
		}
	};


	var formValidator = function (elementId, apiUrl) {
		var typingTimer;
		var doneTypingInterval = 500;

		var $input = $(elementId);
		var apiUrl = apiUrl;


		var addFormListener = function () {
			if(elementId) $input = $(elementId);

			clearTimeout(typingTimer);
			typingTimer = setTimeout(validateFromApi, doneTypingInterval);

			$input.on("keyup", function () {
				
				clearTimeout(typingTimer);
				if(apiUrl)
					typingTimer = setTimeout(validateFromApi, doneTypingInterval);
				else
					typingTimer = setTimeout(validatePassword, doneTypingInterval);
				
			}, $.proxy(this));

			$input.on("keydown", function () {
				
				clearTimeout(typingTimer);
				typingTimer = setTimeout(validateFromApi, doneTypingInterval);
			}, $.proxy(this));		
		}


		var validatePassword = function () {
			console.log('validate passqword ', elementId);
			if(elementId == "#new-password") {
				if($("#new-password").val().length > 0) {
					$("#new-password").parent().addClass('success');
					signupCheckAttributes[elementId.slice(5)] = true;
					signupCheckToggle();
				}	
			}
			if(elementId == "#new-password-repeat") {
				if($("#new-password-repeat").val().length > 0 && $("#new-password-repeat").val() === $("#new-password").val()) {
					$("#new-password-repeat").parent().addClass('success');
					$("#new-password-repeat").parent().removeClass('error');
					signupCheckAttributes[elementId.slice(5)] = true;
					signupCheckToggle();
				} else if($("#new-password-repeat").val()) {
					$("#new-password-repeat").parent().addClass('error');
					$("#new-password-repeat").parent().removeClass('success');
					$("#new-password-repeat").parent().find(".message").text("Passordene matcher ikke");
					signupCheckAttributes[elementId.slice(5)] = false;
					signupCheckToggle();
				}
			}
			
		};

		var validatePasswordRepeat = function () {


		};

		var validateFromApi = function () {
			if(!$input.val()) {
				$input.parent().removeClass('error success');
			} else {
				if(apiUrl) {
					$.get(apiUrl + window.encodeURIComponent($input.val()), function (result) {
						if(result && result.validation) {
							$input.parent().addClass('error');
							$input.parent().removeClass('success');
							signupCheckAttributes[elementId.slice(5)] = false;
							signupCheckToggle();
						} else if(result && !result.validation) {
							$input.parent().addClass('success');
							$input.parent().removeClass('error');
							signupCheckAttributes[elementId.slice(5)] = true;
							signupCheckToggle();
						}
						if(result && result.message) {
							$input.parent().find(".message").text(result.message)
						} else {
							$input.parent().find(".message").text("")
						}
					});	
				}
			}
		}



		var addFormInputApiValidation = function (elementId, apiUrl) {
			$input = $(elementId);
			
			addFormListener();

		};

		return {
			addFormInputApiValidation: addFormInputApiValidation,
			addFormListener: addFormListener
		}
	}




	new formValidator("#new-nick", "/tools/validatenick/").addFormListener();
	new formValidator("#new-username", "/tools/validateusername/").addFormListener();

	
	new formValidator("#new-password").addFormListener();

	new formValidator("#new-password-repeat").addFormListener();
	
})