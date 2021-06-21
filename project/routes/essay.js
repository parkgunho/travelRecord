
var express = require('express');
var router = express.Router();
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var auth = require('../lib/auth.js')
var multer = require('multer');
/* GET home page. */


var storage  = multer.diskStorage({ // 2
  destination(req, file, cb) {
    cb(null, `public/images/${req.user.user_email}/`);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
var uploadWithOriginalFilename = multer({ storage: storage }); // 3-2

router.get('/:pageId', function(req, res, next) {
  if(!auth.isOwner(req,res)){
    res.redirect('/auth/sign_up&login');
    return false;
  }
    //디렉토리 탐색 방어(순수하게 네임명만 출력함 )
      var filteredId = path.parse(req.params.pageId).base;
      db.query(`SELECT essay_content,essay_title,essay_photo_path FROM t_essay WHERE user_id=? AND essay_list_id = ?
      `,[req.user.user_id,filteredId], function(error2, result){
        
              
            res.render('essay',{'result':result, 'essay_list_id':filteredId,'user_name':req.user.user_name});
          
      
});
});

router.get('/', function(req, res, next) {
  if(!auth.isOwner(req,res)){
    res.redirect('/auth/sign_up&login');
    return false;
  }
  db.query(`SELECT * FROM t_essay_list WHERE user_id = ?`,[req.user.user_id], function(error2, result){
  res.render('essay_categori', { 'result': result,'user_name':req.user.user_name });
});

})
router.post('/delete_process', function(req, res, next) {
  if(!auth.isOwner(req,res)){
      res.redirect('/auth/sign_up&login');
      return false;
    }
    var post = req.body;
    console.log('post',post);
                db.query(`
                DELETE FROM t_essay_list WHERE essay_list_id =  ?`,[post.key], function(error2, result3){
                  if(error2) 
                   throw error2;
                else{
                    res.send('삭제 성공');
                  }
                })

});
router.post('/essay_list/insert_process', uploadWithOriginalFilename.single('attachment'), function(req, res, next) {
  if(!auth.isOwner(req,res)){
      res.redirect('/auth/sign_up&login');
      return false;
    }
    
    var feedback = '';
    var post = req.body;
    var restro_title = sanitizeHtml(post.restro_name);
    var dir = `/images/${req.user.user_email}/${req.file.filename}`;

                db.query(`
                INSERT INTO t_essay_list (user_id,essay_list_title,essay_title_image) 
                  VALUES(?,?,?)`,[req.user.user_id,restro_title,dir], function(error2, result3){
                    res.redirect('/essay');
                })

});
router.post('/insert_process', uploadWithOriginalFilename.single('attachment'), function(req, res, next) {
    if(!auth.isOwner(req,res)){
        res.redirect('/auth/sign_up&login');
        return false;
      }
      
      var feedback = '';
      var post = req.body;
      var restro_title = sanitizeHtml(post.restro_title);
      var restro_content = sanitizeHtml(post.restro_content);
      var travel_id = post.id;
      var dir = `/images/${req.user.user_email}/${req.file.filename}`;

                  db.query(`
                  INSERT INTO t_essay (user_id,essay_list_id ,essay_content,essay_photo_path,essay_title) 
                    VALUES(?, ?, ?,?,?)`,[req.user.user_id,travel_id,restro_content,dir,restro_title], function(error2, result3){
                      if(error2){
                        fs.unlink(`${req.file.destination}/${req.file.filename}`,()=>{
                          req.flash('error','에세이 등록이 실패하였습니다.')
                          req.session.save(() => {  res.redirect(`/essay/${travel_id}`); })
                        });
                      }
                      res.redirect(`/essay/${travel_id}`);

                 
                  })
                
           
     
     
     
      
        
    
});

module.exports = router;
