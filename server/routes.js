var controllers = require('./controllers/indexorm.js');
var router = require('express').Router();

for (var route in controllers) {
  console.log("in router");
  router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post);
}


module.exports = router;

