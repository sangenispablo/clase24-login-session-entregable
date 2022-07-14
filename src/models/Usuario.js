const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
