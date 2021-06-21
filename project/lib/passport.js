var db = require('./db.js');
var bcrypt = require('bcrypt');
const sanitize = require('sanitize-html');
module.exports = function(app){

//반드시 passport는 세션 설정 다음에 있어야함 
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());
  //세션 스토어에 저장하는 부분
  passport.serializeUser(function(user, done) {
     console.log('serializeuser',user);
    done(null, user.user_id);
  });
  //로그인되어 페이지에 방문할 때마다
  //참조할 실제 데이터를 가져와 조회하는 부분
  passport.deserializeUser(function(id, done) {
     console.log('deserializeuser',id);
    //request.user에 두번째 인자를 넣어줌
    db.query(`SELECT * FROM t_user WHERE user_id=?`,[id],function(error,user){
        done(null,user[0]);
      })
   
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
  });

//passport input form과 name 매칭 시켜주는 부분
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'pwd'
  },
  function (email, password, done) {
    console.log('LocalStrategy', email, password);
    var clean_email = sanitize(email);
    var clean_pw = sanitize(password);
    db.query(`SELECT * FROM t_user WHERE user_email=?`,[clean_email], function(error2, user){
        console.log('login',user);

        if(user.length>=1){
          bcrypt.compare(clean_pw,user[0].user_password,function(err,result){
            if(result){
              console.log('login',user[0]);
              return done(null,user[0]);
            }else{
              return done(null,false,{
                //비밀번호 실패
                message:'비밀번호가 일치하지 않습니다.'
              });
            }
          })
        }else{
            return done(null,false,{
                //아이디가 안맞음
                message:'이메일이 일치하지 않습니다.'
              });
        }
    })

  }  
  
));
return passport;
}

