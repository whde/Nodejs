const mongoose = require("mongoose");
const schema = mongoose.Schema({
  userName: { type: String },
  password: { type: String }
});

module.exports = mongoose.model('AdminUsers',schema)