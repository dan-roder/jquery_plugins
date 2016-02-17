;$ = jQuery.noConflict();(function($){
	$.fn.fadingGallery = function(options){
		var self = this;
		var settings = $.extend({
			fadeSpeed : 500,
			waitTime : 6000,
			nextButton : $('#galleryNext'),
			prevButton : $('#galleryPrev'),
			withThumbnails : false,
			thumbnailContainer : $('#thumbContainer'),
			thumbSpeed : 500,
			withButtons : false,
			buttonContainer : $('#buttons')
		}, options);
		var numThings = this.length;
		var current = (settings.withThumbnails) ? 1 : Math.floor(Math.random() * this.length)
		var nextItem = (current == numThings) ? 1 : current + 1;
		var prevItem;
		var buttonsArray = Array();
		var galleryTimeout = setTimeout("moveGallery(self, nextItem)", settings.waitTime);
		var thumbnailWidth;
		
		//Initialization
		if(settings.withThumbnails){
			createThumbnails(self);
		}
		if(settings.withButtons){
			createButtons();
		}
		hideAll(self);
		moveGallery(self, current, 'next');
		
		//functions
		function createThumbnails(what)
		{
			var slider = '<div class="slider"><div></div></div>';
			$(slider).appendTo(settings.thumbnailContainer);
			what.clone().appendTo($('.slider div'));
		}
		
		function hideAll(what)
		{
			what.each(function(index, element) {
                $(this).hide();
            });
		}
		
		function createButtons()
		{
			for(var i=0; i < numThings; i++)
			{
				settings.buttonContainer.append('<span class="control"></span>');
			}
		}
		
		function moveGallery(container, number)
		{
			number = (number > numThings || number < 1) ? 1 : number;
			container.eq(current - 1).fadeOut(settings.fadeSpeed).removeClass('active');
			if(settings.withButtons) settings.buttonContainer.find('span').eq(current - 1).removeClass('active');
			container.eq(number - 1).stop(true, true).fadeIn(settings.fadeSpeed).addClass('active');
			if(settings.withButtons) settings.buttonContainer.find('span').eq(number - 1).addClass('active');
			current = number;
			nextItem = (number == numThings) ? 1 : number + 1;
			startGallery();
			if(settings.withThumbnails)
			{
				moveThumbnails();	
			}
		}
		
		settings.nextButton.on('click', function(){
			moveGallery(self, nextItem);
		});
		
		settings.prevButton.on('click', function(){
			prevItem = (current - 1 == 0) ? numThings : current - 1;
			moveGallery(self, prevItem);
		});
		
		$('.control').on('click', function(){
			var num = $(this).index() + 1;
			moveGallery(self, num);
		});
		
		function startGallery()
		{
			clearTimeout(galleryTimeout);
			galleryTimeout = setTimeout(function(){
				moveGallery(self, nextItem);
			}, settings.waitTime);
		}
		
		function moveThumbnails()
		{
			//Width calculated every time, not efficient
			//	also not extendable because of restriction to margin-right
			var width = $('.slider > div').children().first().width() + parseInt($('.slider > div').children().first().css('margin-right'));
			
			//Maximum is amount of children in slider minus number visible, in this case 5
			//	not very flexible for future use
			var maximum = ($('.slider > div').children().length - 4) * (-width);
			
			//current position of slider
			var margin = parseInt($('.slider > div').css('margin-left'));
			
			var requiredToMove = width * - 6;
			var nextItemMargin = -((nextItem-1) * width);
			
			if(margin > maximum && (nextItemMargin <= requiredToMove || nextItemMargin == 0)){
				$('.slider > div').animate({'margin-left':'-=' + width + 'px'}, settings.thumbSpeed);
			}
			else if(nextItem == 2)
			{
				$('.slider > div').animate({'margin-left':0}, settings.thumbSpeed);
			}
		}
	}
}(jQuery));