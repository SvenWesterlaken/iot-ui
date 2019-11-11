const db = require('../db/sql-repo');


module.exports = {
  // Methods take req(uest), res(ponse) & the next function if you want to use this as middleware
  notFound(req, res, next) {
    res.status(404);
    res.json({"msg": "Api endpoint not available"});
  },

  getData(req, res){
    db.getData(req, res);
  },

  addData(req, res){
    db.addData(req, res);
  }
}
