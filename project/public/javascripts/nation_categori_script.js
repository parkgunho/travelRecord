$(".main__slider").slick({
  centerMode: true,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  initialSlide: 2,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        fade: true
      }
    }
  ]
});

$('.trash').click(function(){
  $('.delete-btn').toggle();
});

$('.delete-btn').click(function(e){
  
  console.log($(e.target).parents("li"))
  var result = confirm("정말 삭제하시겠습니까? 내부의 모든 사진이 삭제되게 됩니다.");
if(result){
      $.ajax({
    url:'/gallery/nation_categori/delete_process',
    type:'POST',
    data: {key:$(e.target).data('value')},
    success:function(data){
    if(data === '삭제 성공'){
      // $(e.target).parents("li").remove();
      window.location.reload()
      }
      else{
      console.log('삭제 실패')
      }
    }
  
     })
}

})
var str=$('.main__slider').slick('slickCurrentSlide'); 

$('.slick-slide').not('.slick-current').css( {'pointer-events': 'none'});
$('.slick-current').css( {'pointer-events': 'auto'});
$('.main__slider').on('afterChange', function(event, slick, currentSlide){
  console.log(slick,currentSlide);
  console.log(slick.$slides[currentSlide]);


  const currentSlideDOM = slick.$slides[currentSlide];

  $('.slick-slide').not('.slick-current').css( {'pointer-events': 'none'});
  $('.slick-current').css( {'pointer-events': 'auto'});
});
$('.trash').click(function(){
  $('.delete-btn').toggle();
});

