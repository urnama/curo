// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.pjax
//= require_tree .



$(function() {

    $(document).on('pjax:beforeSend', '[data-pjax-container]', function(event) {
	var container = $(this), clone;
	container.hide();
	clone = container.clone();
        clone.removeAttr('data-pjax-container');
        clone.removeData('pjax-container');
	clone.attr('data-clone', 'true');
/*	clone.insertBefore(container);*/
	if (container.hasClass('reverse')) {
            clone.insertBefore(container);
	    container.removeClass('reverse');
	} else {
	    clone.insertAfter(container);
	    container.addClass('reverse');
	}
	clone.show();
	container.data('clone-to-remove', clone);
    }).on('pjax:end', '[data-pjax-container]', function() { 
	var container = $(this), clone, height;
	clone = container.data('clone-to-remove');
	if (container.hasClass('reverse')) {
	    height = container.outerHeight() + 16;
	    container.css({display: 'block', opacity: 0, top: -height});
	    clone.css({top: -height});
	    clone.animate({top: '+='+height, opacity: 0}, 1000, function () {$(this).remove(); });
	    container.animate({top: '+='+height, opacity: 1}, 1000, function () {
		$(this).css({top: 0});
	    });
	} else {
	    height = clone.outerHeight() + 16;
	    container.css({display: 'block', opacity: 0});
	    clone.animate({top: '-='+height, opacity: 0}, 1000, function () {$(this).remove(); });
	    container.animate({top: '-='+height, opacity: 1}, 1000, function () {
		$(this).css({top: 0});
	    });
	}
	/*clone.slideUp(2000, function () {$(this).remove(); });*/
	/*container.slideDown(2000);*/
	/*$('[data-pjax-container]').animate({opacity: 1}, 200);*/
    });


    $('a:not([data-remote]):not([data-behavior]):not([data-skip-pjax])').pjax('[data-pjax-container]', { 'timeout' : '3000' });


});
