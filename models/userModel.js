const mongoose = require('mongoose');

// Define our models.
const schema = mongoose.Schema;

const userSchema = new schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
