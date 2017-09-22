$(document).ready(function() {

	//Gallary
	$('header .has-drop').on('click', function(event) {
		// event.stopPropagation();
		if(event.preventDefault) 
			{
			  event.preventDefault();
			}
			else
			{
			   event.returnValue = false;
			}
		$(this).toggleClass('active');
		$('#sub-menu').toggleClass('active');
		$.ajax({
		  url: "http://localhost:3000/demo_menu.html", // full path for ie10 / 11
		  xhrFields: {
		      withCredentials: true
		   }
		  // cache: false
		})
		.done(function(response) {
			$("#sub-menu .wrapper").html(response);
		})
		.fail(function(data) {
           console.log(data)
        });
	});

	// Main img changing
	$('.product-images a').on('click', function(event) {
		if(event.preventDefault) 
		{
		  event.preventDefault();
		}
		else
		{
		   event.returnValue = false;
		}
		let imgUrl = $(this).find('img').attr('src');
		$('#main-img img').attr('src', imgUrl)
	});

	// Tabs
	$('.product-tabs li a').on('click', function(event) {
		if(event.preventDefault) 
			{
			  event.preventDefault();
			}
			else
			{
			   event.returnValue = false;
			}
		let tab = $(this).data('tabid');
		$('.product-tabs li').removeClass('active');
		$('.product-tabs .tab').removeClass('active');
		$(this).parent().addClass('active');
		$('#'+tab).addClass('active');
	});

	// Slider init
	 $(".slider").simpleSlider();
});

// Slider
 $.fn.simpleSlider = function(settingUser) {
	$(this).each(function(index, el) {
		let prev = '<a class="btnPrev disabled" href="#">Prev</a>';
		let next = '<a class="btnNext disabled" href="#">Next</a>';
		let container = $(this);
		let containerWidth = $(this).outerWidth();
		let containerHeight = $(this).height();
		let itemWidth = $(this).find('.slide').width() + 30;
		let itemHeight = $(this).find('.slide').height();
	
		container.prepend(prev);
		container.append(next);

		if ($(this).find('.slide').length > 4) {
			$('.btnNext').removeClass('disabled');
		}

		$(container).on('click', '.btnPrev', function(event) {
			if(event.preventDefault) 
				{
				  event.preventDefault();
				}
				else
				{
				   event.returnValue = false;
				}
			$(this).parent().find('.btnNext').removeClass('disabled');
			let tmpPosition = parseInt($(container).css('marginLeft'));
			
			if (tmpPosition != 0 ) {
				$(container).css('marginLeft', tmpPosition + itemWidth);
			} else {
				$(this).addClass('disabled');
			}			
			if ((tmpPosition + itemWidth) == 0  ) {
				$(this).addClass('disabled');
			}
		});

		$(container).on('click', '.btnNext', function() {
			if(event.preventDefault) 
				{
				  event.preventDefault();
				}
				else
				{
				   event.returnValue = false;
				}
							
			$(this).parent().find('.btnPrev').removeClass('disabled');
			let tmpPosition = parseInt($(container).css('marginLeft'));
			let maxMargin = $(container).find('.slide').length * itemWidth;
			if ((tmpPosition - itemWidth - 29) + (maxMargin - containerWidth) == 0) {
				$(this).addClass('disabled');
			} 
			if ((tmpPosition - 29) + (maxMargin - containerWidth) != 0) {
				$(container).css({'marginLeft': (tmpPosition - itemWidth+'px')})
			}
		});
	});
}