// JavaScript Document
;$ = jQuery.noConflict();(function($){
	$.fn.validate = function(options){
		var self = this;
		var settings = $.extend({
			requiredClass : $('.required'),
			scrollToErrors : false
		}, options);
		
		
		self.on('submit', function(e){
			//Loop through all required fields, if value is '' add error class
			settings.requiredClass.each(function(index, element){
				var val = $.trim($(this).val());
				if(val == '')
				{
					$(this).addClass('InputError');	
				}
			});
			
			if($('.InputError').length)
			{
				if(settings.scrollToErrors){
					var pos = $('.InputError:first').offset();
					$('html, body').animate({
						scrollTop: pos.top - 100
					}, 400);
				}
				return false;	
			}
		});
		
		//Key up function for input text fields
		//		*** Needs specification for if the field is a text field
		settings.requiredClass.on('keyup', function(e){
			var val = $.trim($(this).val());
			
			if(val != '' && $(this).hasClass('InputError'))
			{
				$(this).removeClass('InputError');
			}
		});
	}
}(jQuery));