const mongoose = require("mongoose");
const schema = mongoose.Schema({
  userName: { type: String },
  password: { type: String },
  name: { type: String },
  sex: { type: String },
  age: { type: String },
  phone: { type: String },
  email: { type: String },
  image: { type: String },
  address: { type: String },
  updateTime: { type: String },
  createTime:{type:String},
  lastLoginDate:{type:Number}
});

module.exports = mongoose.model('AdminUsers',schema)
