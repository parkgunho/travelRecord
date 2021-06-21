var initLoc;

$( document ).ready(function() {
	$( '.draggable' ).draggable( {
	
		start: function() {
			$('html, body').css({'overflow': 'hidden', 'height': '100%','touch-action':'none'});
			$('#element').on('scroll touchmove mousewheel drag', function(event) {
 				event.preventDefault();
  				event.stopPropagation();
  				return false;
			});
			$( this ).animate({
				opacity: '0.5'
			},
			1000 );
            initLoc = $(this).css('inset');
		},
		stop: function() {
			
			$( this ).animate({
				opacity: '1'
			}, 100);
            $(this).css('inset', initLoc);
			$(document).bind("mouseleave", function(){
				//코드 넣는 곳
				$('html, body').css({'overflow': 'hidden', 'height': '100%','touch-action':'none'});
			   });
			$('html, body').css({'overflow': 'auto', 'height': '100%','touch-action':'none'});
			
		}
	});
	

	$( '#droppable' ).droppable(
		{
		drop: function(e) {
			
			$('.ui-draggable-dragging').animate({
				opacity: '1'
			},
			1000 ).hide();
			$(this).addClass( 'full' );
			//$( '#move-sound' )[0].play();
			$(document).bind("mouseleave", function(event){
				//코드 넣는 곳
				$('html, body').css({'overflow': 'hidden', 'height': '100%','touch-action':'none'});
				
	   		})
			$('html, body').css({'overflow': 'auto', 'height': '100%','touch-action':'none'});
			
				console.log('요소',$('.ui-draggable-dragging').data('value'));
				
				// console.log('event',e);
				// console.log($(e).dataset());
		
			//console.log('event',e);
			$.ajax({
				url:'/gallery/delete_process',
				type:'POST',
				data: {key:$('.ui-draggable-dragging').data('value')},
				success:function(data){
				if(data === '삭제 성공'){
					console.log('삭제 성공')
				  }
				  else{
					console.log('삭제 실패')
				  }
				}
			
			   })
		}	
		
	});
	
	$( '#empty' ).click(function( e ) {
		e.preventDefault();
		if ( $( '#droppable' ).hasClass( 'full' ) ) {
			$( '#droppable' ).removeClass( 'full' ).
			prev()
			.remove();
			$( '#empty-sound' )[0].play();
		}
	});

});



		