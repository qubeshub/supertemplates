/////////////////////////////////////////////////////////////////
//
//	Developers:
//
//	Please Be Mindful of javascript library being used within 
//	hub (if any). Use no conflict mode to avoid library 
//	compatibility. Native JS is always allowed.
//
/////////////////////////////////////////////////////////////////

if (!jq) {
	var jq = $;
}

jQuery(document).ready(function(jq) {
	var $ = jq,
		el = $('.super-group-menu>ul');

	// For responsive (e.g., mobile) menus
	//
	// This runs through the menu and generates a
	// <select> list of all menu items, then adds
	// an onChange event to redirect the page to
	// whatever option is selected.
	if (el.length) {
		el.addClass('js');

		var select = $("<select />").on('change', function() {
			window.location = $(this).find("option:selected").val();
		});

		$("<option />", {
			"value"   : "",
			"text"    : "Select ..." //el.attr('data-label')
		}).appendTo(select);

		el.find("a").each(function() {
			var elm = $(this),
				prfx = '';

			if (elm.hasClass('alrt')) {
				return;
			}

			if ($(elm.parent().parent()).hasClass('tab-options')) {
				prfx = '- ';
			}

			var opts = {
				"value"   : elm.attr("href"),
				"text"    : prfx + elm.text()
			};
			if ($(elm.parent()).hasClass('active')) {
				opts.selected = 'selected';
			}
			$("<option />", opts).appendTo(select);
		});

		var li = $("<li />").addClass('option-select');

		select.appendTo(li);
		li.appendTo(el);
	}

	/*
		Enter custom JS code here.
	*/
	
	/* Sticky navbar */
	/* https://teamtreehouse.com/community/forum-tip-create-a-sticky-navigation-with-css-and-jquery-2 */
	//
	// Bug in login - had to comment out the following line 
	//		$('#username, #password').placeholder();
	// in the file /www/dev/core/components/com_users/site/assets/js/login.js
	// to get it to work.
	
	var sgmw = $(".super-group-menu-wrap");
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 150) {
			sgmw.addClass("super-group-menu-scrolled");
		} else {
			sgmw.removeClass("super-group-menu-scrolled");
		}
	});
	
});