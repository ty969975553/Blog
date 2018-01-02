var express = require('express');
var router = express.Router();
var user = require('../services/UserService');
var moment = require('moment');
var tags = require('../services/TagsService');
var article = require('../services/ArticleService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});

router.get('/index', function(req, res, next) {
    res.render('index', { title: '首页' });
});


router.get('/about', function(req, res, next) {
    res.render('about', { title: '关于' });
});

/* GET home page. */
router.get('/activity', function(req, res, next) {
    res.render('activity', { title: '动态' });
});

router.get('/experience', function(req, res, next) {
    res.render('experience', { title: '学习经历' });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: '联系' });
});
router.get('/work', function(req, res, next) {
    res.render('work', { title: '工作' });
});

module.exports = router;
