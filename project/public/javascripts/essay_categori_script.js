var cnt = 35;
for(var i = 0;i<=1000;i++)
{ 
  $('.film1').append(`<div id="a" class=a style="left:${cnt}px;"></div>`)
  $('.film').append(`<div id="a" class=a style="left:${cnt}px;"></div>`)
  console.log('cnt',cnt);
  cnt = cnt +100
}

// for(var i=0;i<100;i++){
//   $('.film').after('<div id="a" class="book-slide"><img src="../img/Paris.jpg" width="265px" height="400px"/><h4>Paris</h4></div><div id="a" class="book-slide"><img src="../img/korea.jpg" width="265px" height="400px"/><h4>Korea</h4></div><div id="a" class="book-slide"><img src="../img/japan.png" width="265px" height="400px"/><h4>Japan</h4></div><div id="a" class="book-slide"><img src="../img/ch.jpg" width="265px" height="400px"/><h4>China</h4></div><div id="a" class="book-slide"><img src="../img/vietnam.jpg" width="265px" height="400px"/><h4>Vietnam</h4></div><div id="a" class="book-slide"><img src="../img/Russia.jpg" width="265px" height="400px"/><h4>Russia</h4></div><div id="a" class="book-slide"><img src="../img/brazil.png" width="265px" height="400px"/><h4>Brazil</h4></div><div id="a" class="book-slide"><img src="../img/Taipei.jpg" width="265px" height="400px"/><h4>Thailand</h4></div><div id="a" class="book-slide"><img src="../img/England.jpg" width="265px" height="400px"/><h4>England</h4></div><div id="a" class="book-slide"><img src="../img/Italy.jpg" width="265px" height="400px"/><h4>Italy</h4></div>');
//   console.log('cnt2',i);
// }

//제거
//var $zero = $('#zero').detach();//잠시 제거
setTimeout(function(){
$('#a').remove();//완전제거
},5000);


//footer

// INSERT JS HERE


