//Problem: User when clicking on image goes out of browser
//Solution: Create an overlay with the large image - Lightbox

var $overlay = $('<div id="overlay" class="row text-center animated rollIn"></div>');
var $image = $('<img class="img-responsive" id="img-popup">');
var $caption = $("<p></p>");

//An image to overlay
$overlay.append($image);

//A caption to overlay
$overlay.append($caption);

//Add overlay
$("body").append($overlay);

//Capture the click event on a link to an image
$(".mySlides").click(function(event){
  event.preventDefault();
  //Grab href Url
  var imageLocation = $(this).attr("src");
  console.log("imageLocation",imageLocation);
  //Update overlay with the image linked in the link
  $image.attr("src", imageLocation);

  //Show the overlay.
  $overlay.show();

  //Get child's alt attribute and set caption
  var captionText = $(this).children("img").attr("alt");
  $caption.text(captionText);
});

//When overlay is clicked
$overlay.click(function(){
  //Hide the overlay
  $overlay.hide();
});

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
