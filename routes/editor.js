var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('editor', {
    name: req.query.name || req.i18n.__('editor.sessionDefaultName'),
    duration: parseInt(req.query.duration) || 300
  });
});

module.exports = router;
