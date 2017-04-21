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
	
	/* Fix content for sticky group announcements. */
	var $scontainer = $(".scontainer");
	var $superGroupMenuWrap = $(".super-group-menu-wrap");
	var $superGroupContentWrap = $(".super-group-content-wrap");

	$scontainer.css("margin-top", $superGroupMenuWrap.css("height"));
	$superGroupContentWrap.css("margin-top", $scontainer.css("height"));
	new ResizeSensor(jQuery('.super-group-menu-wrap'), function() {
		$scontainer.css("margin-top", $superGroupMenuWrap.css("height"));
		$superGroupContentWrap.css("margin-top", $scontainer.css("height"));
	});
	
	/* Readjust content after closing announcement */
	$('.announcement .close').on('click', function() {
		$superGroupContentWrap.animate({marginTop: '-=' + $(this).parent().parent().outerHeight() + 'px'});
	});
  	
	/* Sticky navbar */
	/* https://teamtreehouse.com/community/forum-tip-create-a-sticky-navigation-with-css-and-jquery-2 */
	//
	// Bug in login - had to comment out the following line 
	//		$('#username, #password').placeholder();
	// in the file /www/dev/core/components/com_users/site/assets/js/login.js
	// to get it to work.
	
	var sgmw = $(".super-group-menu-wrap");
	var sgpb = document.getElementsByClassName("poweredby")[0];
	var sgid = $(".header-id");
	var sgsb = $("#sidebar-wrapper");
	
	$(window).scroll(function() {
		var st = $(this).scrollTop();
		if (st > 100) {
			sgpb.style["opacity"] = Math.max(1 - (1/25)*(st-100), 0);
			sgpb.style["cursor"] = "default";
			sgpb.style["pointerEvents"] = "none";
		} else {
			sgpb.style["opacity"] = 1.0;
			sgpb.style["cursor"] = "inherit";	// Doesn't reset properly on Firefox
			sgpb.style["pointerEvents"] = "inherit";
		}

		if (st > 130) {
			sgid.addClass("header-id-scrolled");
		} else {
			sgid.removeClass("header-id-scrolled");
		}
		
		if (st > 150) {
			sgmw.addClass("super-group-menu-scrolled");
			sgsb.addClass("sidebar-wrapper-scrolled");
		} else {
			sgmw.removeClass("super-group-menu-scrolled");
			sgsb.removeClass("sidebar-wrapper-scrolled");
		}
	});
	
});