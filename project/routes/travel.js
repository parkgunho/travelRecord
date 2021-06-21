var express = require('express');
var db = require('../lib/db.js');
var auth = require('../lib/auth.js')
var fs = require('fs');
var multer = require('multer');
var router = express.Router();
var flash = require('connect-flash');
var sanitizeHtml = require('sanitize-html');

var storage  = multer.diskStorage({ // 2
  destination(req, file, cb) {
    cb(null, `public/images/${req.user.user_email}/`);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
var uploadWithOriginalFilename = multer({ storage: storage }); // 3-2


router.get('/insert', function(req, res, next) {
    if(!auth.isOwner(req,res)){
        res.redirect('/auth/sign_up&login');
        return false;
      }
  
    res.render('insert_travel', { title: 'Express' });
  });
  
router.post('/insert_process', uploadWithOriginalFilename.single('attachment'), function(req, res, next) {
    if(!auth.isOwner(req,res)){
        res.redirect('/auth/sign_up&login');
        return false;
      }
  
      var feedback = '';
      var post = req.body;
      var nation_name = sanitizeHtml(post.restro_name);
      var travel_date = sanitizeHtml(post.dateofbirth);
      var str_result =match(nation_name);
      var dir = `/images/${req.user.user_email}/${req.file.filename}`;
      db.query(`SELECT *  FROM t_country WHERE country_name=?`,[str_result], function(error2, result){
        if(result !==undefined){
          if(result.length>0)
          {
            db.query(`SELECT * FROM t_travel WHERE country_id=? and user_id = ?`,[result[0].country_id,req.user.user_id], function(error2, result2){
                if(result2.length>0){
    
                         //이미 가 본 여행지일 경우 
                         fs.unlink(`${req.file.destination}/${req.file.filename}`,()=>{
                          if(req.session.flash) {
                            req.session.flash = {}
                            }
                          req.flash('error','이미 가 본 여행지입니다, 사진은 여행지 내에서 등록해 주세요')
                          req.session.save(() => {  res.redirect('/map'); })
                        });     
                }
                else{
                
                  db.query(`
                  INSERT INTO t_travel (user_id, country_id, start_date,travel_image) 
                    VALUES(?, ?, ?,?)`,[req.user.user_id,result[0].country_id,travel_date,dir], function(error2, result3){
                      res.redirect('/map');
                  })
                }
            })
          }
          else{
              
                fs.unlink(`${req.file.destination}/${req.file.filename}`,()=>{
                  if(req.session.flash) {
                    req.session.flash = {}
                    }
                  req.flash('error','등록되지 않은 나라 입니다.')
                 
                 req.session.save(() => { res.redirect('/map');  })
                });
             
          }
        }
      
        
       
    })
        
    function match(nation_name){
        var toLowString = nation_name.toLowerCase();
        var nation_name_result =jsUcfirst(toLowString);
        
       if(nation_name ==='오스트레일리아'||nation_name ==='호주')
        return 'Australia';
       if(nation_name ==='미국'|| nation_name ==='USA' || nation_name === 'Usa')
       return 'America';
       if(nation_name === '일본')
       return 'Japan';
       if(nation_name ==='중국'||nation_name ==='짱깨'||nation_name==='짱께')
       return 'China';
       if(nation_name ==='브라질')
       return 'Brazil';
       if(nation_name ==='베트남'||nation_name === '배트남')
       return 'Vietnam'
       if(nation_name ==='프랑스')
       return 'France'
       if(nation_name ==='그린랜드', nation_name ==='그린란도')
       return 'Greenland'
       if(nation_name ==='러시아')
       return 'Russia';
       if(nation_name ==='한국')
       return 'Korea';
       
       return nation_name_result;
    }
    function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
});

module.exports = router;
