function initMenu() {
  $('#menu ul').hide();
  $('#menu ul').children('.current').parent().show();
  $('#menu li a').click(
	function() {
	  var checkElement = $(this).next();
	  if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
		return false;
		}
	  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
		$('#menu ul:visible').slideUp('normal');
		checkElement.slideDown('normal');
		return false;
		}
	  }
	);
}

function adjustContentBody() {
	$('.super-group-content-wrap').css("min-height", function() {
		return $('#sidebar-wrapper').height()+30;
	});
}

$(document).ready(function() {
	initMenu();
	adjustContentBody();
});