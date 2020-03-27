/**
 * by vqtien
 * https://github.com/vqtien
 */
(function($) {
    $.lightbox = {version: '1.0'};
    $.fn.lightbox = function(params) {
        var defaultParams = {
        	hook: 'rel',
        	classname: '.lightbox-box',
        	markup: '<div class="lightbox-box"> \
        				<span class="lightbox-close"><i class="fa fa-close fa-2x"></i></span>\
	        			<div id="lightbox-container"> \
	        			</div> \
	        			<div class="lightbox-gallery-container">{gallery_markup}</div> \
	        			<a class="lightbox-next" href="javascript:"><i class="fa fa-angle-right fa-2x"></i></a> \
						<a class="lightbox-prev" href="javascript:"><i class="fa fa-angle-left fa-2x"></i></a> \
        			</div>',   
        	gallery_markup: '<div class="lightbox-gallery"> \
								<div> \
									<ul> \
										{gallery} \
									</ul> \
								</div> \
							</div>',
        	image_markup: '<img id="lightboxImage" src="{path}" />',     
        };

        params = $.extend({}, defaultParams, params);      
        /**
		* Initialize lightbox.
		*/
		$.lightbox.initialize = function(){
			settings = params;		
			images = $('img.forlightbox');
			lightbox_images = jQuery.map(images, function(n, i){				
				return $(n).attr('href'); 
			});	

			set_position = lightbox_images.indexOf($(this).attr('href'));
			set_position = set_position == -1 ? 0 : set_position;
			_build_overlay(this);	
			$.lightbox.open();
		};

		$.lightbox.open = function(event){	
			
			img = settings.image_markup.replace(/{path}/g,lightbox_images[set_position]);
							
			$(settings.classname).find("#lightbox-container").html(img);
			 _showLightbox();
		};

		$.lightbox.close = function(event){
			$(settings.classname).hide();
		};

		function _showLightbox(){
			count = lightbox_images.length;
			$(settings.classname).find('a.lightbox-click').click(function(){
				src = $(this).find('img').attr('src');
				img = settings.image_markup.replace(/{path}/g,src);
				set_position = lightbox_images.indexOf(src);
				$(settings.classname).find("#lightbox-container").html(img);
			})			
			
			$(settings.classname).find(".lightbox-close").click(function(){
				$.lightbox.close();
			})

			$(settings.classname).find(".lightbox-next").click(function(){				
				set_position = set_position + 1;
				if(set_position > count-1)
					set_position = count-1;
				img = settings.image_markup.replace(/{path}/g,lightbox_images[set_position]);
				
				$(settings.classname).find("#lightbox-container").html(img);
			})

			$(settings.classname).find(".lightbox-prev").click(function(){				
				set_position = set_position - 1;
				if(set_position < 0)
					set_position = 0;
				img = settings.image_markup.replace(/{path}/g,lightbox_images[set_position]);
				
				$(settings.classname).find("#lightbox-container").html(img);
			})

			if(count < 2){
				$(settings.classname).find(".lightbox-prev").hide();
				$(settings.classname).find(".lightbox-next").hide();
			}

			$(settings.classname).show();
		};

		function _build_overlay(caller){
			
			currentGalleryPage = 0;
			galleryInner = "";
			for (var i=0; i < lightbox_images.length; i++) {
				if(lightbox_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)){
					img_src = lightbox_images[i];
				}
				galleryInner += "<li><a class='lightbox-click' href='javascript:'><img src='" + img_src + "' alt='' /></a></li>";
			};

			gallery = settings.gallery_markup.replace(/{gallery}/g,galleryInner);				
			
			settings.markup = settings.markup.replace(/{gallery_markup}/g,gallery)
			if($('body').find(settings.classname).length == 0)
			{
				$('body').append(settings.markup);
			}			
		};

		return $(this).unbind('click').bind('click',$.lightbox.initialize);
    };
})(jQuery);
