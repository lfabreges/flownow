var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('editor', {
    title: req.query.title || req.i18n.__('editor.defaultTitle'),
    duration: parseInt(req.query.duration) || 300
  });
});

module.exports = router;
