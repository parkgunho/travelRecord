var express = require('express');
var db = require('../lib/db.js');
var auth = require('../lib/auth.js')
var fs = require('fs');
var router = express.Router();
var error= '';
/* GET home page. */
router.get('/', function(req, res, next) {

    if(!auth.isOwner(req,res)){
        res.redirect('/auth/sign_up&login');
        return false;
      }
   
      var dir = `./public/images/${req.user.user_email}`;
      if (!fs.existsSync(dir)) fs.mkdirSync(dir); // 2
      var dir = `./public/images/${req.user.user_email}/nation_image`;
      if (!fs.existsSync(dir)) fs.mkdirSync(dir); // 2
    db.query(`SELECT  travel_id,user_id,T1.country_id,DATE_FORMAT(MAX(start_date), '%y-%m-%d') AS DATE ,country_name,country_pos_x,country_pos_y,country_image 
    FROM t_travel AS T1 INNER JOIN t_country T2 ON T1.country_id= T2.country_id  WHERE T1.user_id=? GROUP BY country_name`,[req.user.user_id], function(error2, result){
        error =  req.flash('error')
        // error = req.flash('error')
        if(error){
            res.render('map', { 'result': result, 'user':req.user, 'error':error,'user_name':req.user.user_name});
            req.session.flash = {}
        }
        else{
            res.render('map', { 'result': result, 'user':req.user,'error':'','user_name':req.user.user_name});
        }
    })
});

module.exports = router;
