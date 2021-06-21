
//////////////////////////////////////////////////////////////

// let path = $("path")
// let svgViewBox = $('svg').attr('viewBox')



// path.on('click',(e)=>{
//   console.log(e.target.getBBox())
//   let cordinates = e.target.getBBox()
//   TweenMax.to($("svg"),1,{attr:{
//     viewBox:`${cordinates.x} ${cordinates.y} ${cordinates.width} ${cordinates.height}`,
//   //  width: '700px',
// //   height: '800px'
//   }})
// })



// $("button").on("click",()=>{
//   TweenMax.to($("svg"),1,{attr:{
//     viewBox:svgViewBox, //원상복귀
//     width: '100%',
//     height: '100%'
//   }})
// })


var arr_x=0;
var arr_y=0;
var x=0;
var y=0;
var i=0;
$('foreignObject').css("display",'none');


let svgViewBox = $('svg').attr('viewBox');

let img=$("img");
let imgViewBox = $('img').attr('viewBox');

//원 좌표 뽑아오기
var inputs=document.querySelectorAll('path')
console.log(inputs);
for(i=0;i<inputs.length;i++){
x[i]=inputs[i].attributes.cx;
y[i]=inputs[i].attributes.cy;
console.log(x);
}


///////////////////////////////////////클릭시 좌표/////////////////////////////////////////
