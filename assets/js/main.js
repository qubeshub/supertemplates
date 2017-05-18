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
	
	var $menuWrap = $(".super-group-menu-wrap");
	var $headerId = $(".header-id");
	var $sidebarWrap = $("#sidebar-wrapper");
	var $footerWrap = $(".super-group-footer-wrap");
	var poweredBy = document.getElementsByClassName("poweredby")[0];

	var scrollTop = 0;
	var bannerHeight = $(".super-group-header-overlay").height();
	var barHeight = $(".super-group-bar").height();
	
	$(window).scroll(function() {
		var windowTop = $(this).scrollTop();
		var footerWindowTop = $footerWrap[0].getBoundingClientRect().top
		var menuWindowBottom = $menuWrap[0].getBoundingClientRect().bottom

		if (windowTop > scrollTop) {
			// Down
			// $sidebarWrap[0].style["background-color"] = "#FF0000";
		} else {
			// Up
			// $sidebarWrap[0].style["background-color"] = "#00FF00";
		}
		scrollTop = windowTop;

		// Fade effect for "poweredby QUBES"
		var startBarFade = bannerHeight - barHeight;
		if (windowTop > startBarFade) {
			poweredBy.style["opacity"] = Math.max(1 - (4/startBarFade)*(windowTop-startBarFade), 0);
			poweredBy.style["cursor"] = "default";
			poweredBy.style["pointerEvents"] = "none";
		} else {
			poweredBy.style["opacity"] = 1.0;
			poweredBy.style["cursor"] = "inherit";	// Doesn't reset properly on Firefox
			poweredBy.style["pointerEvents"] = "inherit";
		}

		// Replace "poweredby QUBES" with group logo and title
		if (windowTop > bannerHeight - (barHeight/2)) {
			$headerId.addClass("header-id-scrolled");
		} else {
			$headerId.removeClass("header-id-scrolled");
		}
		
		// Fix menu directly under QUBES navbar on scroll
		if (windowTop > bannerHeight) {
			$menuWrap.addClass("super-group-menu-scrolled");
		} else {
			$menuWrap.removeClass("super-group-menu-scrolled");
		}

		// Fix sidebar directly under menu after announcements have scrolled
		// $sidebarWrap[0].getBoundingClientRect().bottom + parseFloat($sidebarWrap.css("margin-bottom")) < $footerWrap[0].getBoundingClientRect().top)
		// 
		var sidebarIsAboveFooter = (((footerWindowTop - menuWindowBottom) - $sidebarWrap.outerHeight(true)) > 0);
		if (sidebarIsAboveFooter) {
			if (windowTop > bannerHeight + $scontainer.height()) {
				$sidebarWrap.addClass("sidebar-wrapper-scrolled");
				$sidebarWrap.css("top", "94px");
				$sidebarWrap.css("bottom", "");
			} else {
				$sidebarWrap.removeClass("sidebar-wrapper-scrolled");
				$sidebarWrap.css("top", "50px");				
			}
		} else {
			$sidebarWrap.removeClass("sidebar-wrapper-scrolled");
			$sidebarWrap.css("bottom", "-9px");
			$sidebarWrap.css("top", "");
		}
	});
	
});