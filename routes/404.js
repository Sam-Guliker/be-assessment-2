const express = require('express');
const router = express.Router();

router.get('404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});

module.exports = router
