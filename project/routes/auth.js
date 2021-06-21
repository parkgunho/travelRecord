var express = require('express')
var router = express.Router();
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var db = require('../lib/db.js');
var bcrypt = require('bcrypt');

module.exports = function(passport){
/* GET home page. */
router.get('/sign_up&login', function(req, res, next) {
  var fmsg = req.flash();
  console.log('fsg',fmsg);
  var feedback='';
  if(fmsg.message){
    feedback = fmsg.message;
    console.log('feedback',feedback);
    res.render('sign_up', { 'feedback': feedback });
  }
  else{
    res.render('sign_up',{'feedback' : ''});
  }

});


router.post('/sign_up_process',function(request,response){
    
    //보안처리 해줘야되는 부분 sanityze기반 
    var post = request.body;
    var email = sanitizeHtml(post.email);
    var pwd = sanitizeHtml(post.password);
    var username = sanitizeHtml(post.username);

    bcrypt.hash(pwd,10,function(err,hash){
      db.query(`SELECT* from t_user WHERE user_email=?`,[email], function(error2, result){
      
        if(result.length ==0){
         //일치하는 이메일이 없다면 회원가입 시도  
         db.query(`
         INSERT INTO t_user (user_name, user_email, user_password) 
           VALUES(?, ?, ?)`,
         [username, email, hash], 
         function(error, result){
           if(error){
             throw error;
             
           }
           var id = result.insertId;
           response.send("회원가입 성공")
           // console.log("result",{'id':id,'email':email,'password':pwd,'displayName':displayName});
           
           // request.login({'id':id,'email':email,'password':pwd,'displayName':displayName},function(err){
           //   return response.redirect('/');
           // })
           
         }
       )
        }else{
           response.send("중복")
        }
    })
    })


});
//router.post('/login_process',
router.post('/login_process', (req, res, next) => {

  passport.authenticate('local',(err, user, info) => {
  
  if(req.session.flash) {
  req.session.flash = {}
  }
  if(info){
     req.flash('message', info.message)
  }

  
  req.session.save(() => {
  
  if (err) {
   next(err)
  }
  if (!user) {
   res.redirect('/auth/sign_up&login')
  }
  
  req.logIn(user, (err) => {
  if (err) {
  next(err)
  }
 req.session.save(() => {
  res.redirect('/map')
  })
  })
  })
  
  })(req, res, next)
  })
  
// passport.authenticate('local', {
//   failureRedirect: '/auth/sign_up&login',
//   failureFlash:"입력 정보를 다시 확인해주세요."
//   }),
//   (req, res, next) => {
//   req.session.save((err) => {
//   if (err) {
// console.log('err',err);
//   next(err);
 
  
//   }
//   console.log("로그인처리 끝부분");
//   res.redirect('/map');
//   })
//   }
//   );

  router.get('/logout',function(request,response){
    request.logOut();
    //현재 세션의 상태를 저장하는 구문 그 후 리다이렉트
    request.session.save(function(){

        response.redirect('/auth/sign_up&login');
    })
  });


return router;
}

