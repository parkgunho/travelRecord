var qs = require('querystring');


var express = require('express');
var router = express.Router();

module.exports={
    isOwner:function(request,response){
        if(request.user){
          return true;
        }
        else{
          return false;
        }
      }

}

