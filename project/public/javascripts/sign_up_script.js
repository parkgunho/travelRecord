$('#signup').click(function () {
  $('.framebox').css('transform', 'translateX(80%)');
  $('.signin').addClass('nodisplay');
  $('.signup').removeClass('nodisplay');
});

$('#signin').click(function () {
  $('.framebox').css('transform', 'translateX(0%)');
  $('.signup').addClass('nodisplay');
  $('.signin').removeClass('nodisplay');
});


$('#signin_btn').click(function () {
  var email = $('#sign_in_email').val();
  var password = $('#sign_in_password').val();
   if(email ===''){
    alert("이메일을 입력하세요.")
    return false;
  }
  else if(password ==='') {
    alert('비밀번호를 입력하세요.')
    return false;
  }
  else if(password.length<6 || password.length > 12){
    alert('비밀번호는 6글자 이상 12글자 이하로 입력해주세요.')
    return false;
  }
});

$('#signup_btn').on('click',function(){
  var username = $('#username').val();
  var email = $('#email').val();
  var password = $('#password').val();
  var password_check = $('#password_check').val()
  console.log("username", $('#username').val());

var msg = ""
if(username === ''){
  // console.log($('.signup p'))
  // document.querySelector('.sign_up_message').innerHTML = "회원명을 입력하세요."
 alert("회원명을 입력하세요.")
 return;
}
else if(email ===''){
  alert("이메일을 입력하세요.")
  return false;
}
else if(password ==='') {
  alert('비밀번호를 입력하세요.')
  return false;
}
else if(password.length<6 || password.length > 12){
  alert('비밀번호는 6글자 이상 12글자 이하로 입력해주세요.')
  return false;
}
else if(password_check ===''){
  alert('비밀번호 확인을 입력하세요.')
  return false;
}
else if(password !== password_check){
  alert('비밀번호 확인과 비밀번호가 일치하지 않습니다. ')
  return false;
}else{
  $.ajax({
    url:'/auth/sign_up_process',
    type:'POST',
    data: {username:username,email:email,password:password,password_check:password_check},
    success:function(data){
    if(data === '중복'){
        alert('중복된 이메일이 존재합니다.');
      }
      else{
        alert('회원가입 성공');
      }
    }

  })
}


})