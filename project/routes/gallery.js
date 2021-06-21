
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
    cb(null, `public/images/${req.user.user_email}/nation_image`);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
var uploadWithOriginalFilename = multer({ storage: storage }); // 3-2


router.get('/nation_memory/:pageId', function(req, res, next) {
  if(!auth.isOwner(req,res)){
    res.redirect('/auth/sign_up&login');
    return false;
  }
 
     var filteredId = path.parse(req.params.pageId).base;
     db.query(`SELECT * FROM t_photo  WHERE travel_id IN(SELECT travel_id FROM t_travel WHERE user_id =? AND country_id = ?)`,[req.user.user_id,filteredId], function(error2, result){
      db.query(`SELECT country_name,country_svg FROM t_country WHERE country_id = ?`,[filteredId], function(error2, result2){
       var string =  result2[0].country_svg.replace('"',"")
       console.log(string)
      res.render('memory', { 'result': result, 'nation':result2[0].country_name,'user_name':req.user.user_name ,'nation_svg':string});
});
});
}

)

router.get('/nation_categori', function(req, res, next) {
  if(!auth.isOwner(req,res)){
    res.redirect('/auth/sign_up&login');
    return false;
  }
      db.query(`SELECT T1.country_id, country_name, T1.travel_image,travel_id FROM t_travel AS T1 INNER JOIN t_country T2 ON T1.country_id= T2.country_id  WHERE T1.user_id=?`,[req.user.user_id], function(error2, result){
            res.render('nation_categori',{'result':result,'user_name':req.user.user_name});
});


})
router.post('/nation_categori/delete_process',function(request,response){
    
  //보안처리 해줘야되는 부분 sanityze기반 
  var post = request.body;
  var key = post.key
  db.query(`DELETE FROM t_travel WHERE travel_id=? `,[key],function(error,result){
    if(error) 
      throw error;
    else{
        response.send('삭제 성공');
      }
  })

});
router.get('/nation_album/:pageId', function(req, res, next) {
  if(!auth.isOwner(req,res)){
    res.redirect('/auth/sign_up&login');
    return false;
  }
     var filteredId = path.parse(req.params.pageId).base;
     db.query(`SELECT * FROM t_photo  WHERE travel_id = ?`,[filteredId], function(error2, result){
       if(result){
        res.render('nation_album', { 'result': result , 'travel_id':filteredId, 'user_name':req.user.user_name});
       }
});

})

router.get('/panaroma/:pageId', function(req, res, next) {
  if(!auth.isOwner(req,res)){
    res.redirect('/auth/sign_up&login');
    return false;
  }
  var filteredId = path.parse(req.params.pageId).base;
  db.query(`SELECT travel_image FROM t_travel  WHERE travel_id = ?`,[filteredId], function(error2, result){
    if(result){
      res.render('panaroma', { 'result': result,'user_name':req.user.user_name});
    }
    else{
      throw error2
    }
   
});

})

router.post('/delete_process',function(request,response){
    
  //보안처리 해줘야되는 부분 sanityze기반 
  var post = request.body;
  var key = post.key
  db.query(`DELETE FROM t_photo WHERE photo_id=? `,[key],function(error,result){
    if(error) 
      throw error;
    else{
        response.send('삭제 성공');
      }
  })

});

router.post('/modify',function(request,response){
    
  //보안처리 해줘야되는 부분 sanityze기반 
  var post = request.body;
  var key = post.key
  db.query(`SELECT country_name,travel_image,DATE_FORMAT(start_date, '%y-%m-%d') as start_date FROM t_travel T1 INNER JOIN t_country T2 ON T1.country_id = T2.country_id WHERE travel_id =?`,[key],function(error,result){
    if(error) 
      throw error;
    else{
        response.send([{country_name:result[0].country_name,travel_image:result[0].travel_image,start_date:result[0].start_date}]);
      }
  })

});

router.post('/modify_process', uploadWithOriginalFilename.single('attachment'), function(req, res, next) {
  if(!auth.isOwner(req,res)){
      res.redirect('/auth/sign_up&login');
      return false;
    }

    var feedback = '';
    var post = req.body;
    var travel_id = post.id;
    var dir = `/images/${req.user.user_email}/nation_image/${req.file.filename}`;
    console.log('travel_id',travel_id)
    console.log('dir',dir)
    db.query(`
    UPDATE t_travel SET travel_image =? where travel_id = ? `,[dir,travel_id], function(error2, result3){
        if(result3 !== undefined){
          console.log('result3',result3)
          res.redirect(`/gallery/nation_categori`); 
        }
        else{
          fs.unlink(`${req.file.destination}/${req.file.filename}`,()=>{
            // req.flash('error','사진 등록이 실패하였습니다.')
            req.session.save(() => {  res.redirect(`/gallery/nation_categori`); })
          });
        }
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
    var travel_id = post.id;
    var dir = `/images/${req.user.user_email}/nation_image/${req.file.filename}`;

    db.query(`
    INSERT INTO t_photo (user_id, travel_id, photo_name,photo_path) 
      VALUES(?, ?, ?,?)`,[req.user.user_id,travel_id,restro_title,dir], function(error2, result3){
        if(result3 !== undefined){
          res.redirect(`/gallery/nation_album/${travel_id}`); 
        }
        else{
          fs.unlink(`${req.file.destination}/${req.file.filename}`,()=>{
            // req.flash('error','사진 등록이 실패하였습니다.')
            req.session.save(() => {  res.redirect(`/gallery/nation_album/${travel_id}`); })
          });
        }
     })
});

module.exports = router;
