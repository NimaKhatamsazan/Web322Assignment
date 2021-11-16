const mongoose = require('mongoose');

// Define our models.
const schema = mongoose.Schema;

const nameSchema = new schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Name', nameSchema);
