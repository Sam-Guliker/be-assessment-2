const express = require('express');
const router = express.Router();

router.get('404', function(req, res, next){
  next();
});

module.exports = router
