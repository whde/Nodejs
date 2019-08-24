module.exports = app => {
  // 5.x
  var mongoose = require("mongoose");
  mongoose.connect("mongodb://localhost:27017/mongodb",{useNewUrlParser: true});
  
  // var MongoClient = require("mongodb").MongoClient;
  // var url = "mongodb://localhost:27017/managedb";
  // MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  //   if (err) {
  //     throw err;
  //   } else {
  //     console.log("数据库已连接");
  //   }
  // });
};
