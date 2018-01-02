var express = require('express');
var router = express.Router();
var userService = require('../services/UserService');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('admin/login',{error : ''});

});

router.post('/login', function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    userService.checkUser(username , password, function (err, exsits) {
        if(exsits)
        {
            var user ={
                    "username": username,
                    "password": password
            };
            req.session.user = user;
            res.locals.user = req.session.user;
            res.render('admin/backend/index',{path : '',open:''});
        }else{

            res.render('admin/login',{error : '账号或者密码错误'});
        }
    })

});

module.exports = router;
