const mongoose = require('mongoose');

// Define our models.
const schema = mongoose.Schema;

const mealSchema = new schema({
  title: { type: String },
  included: { type: String },
  description: { type: String },
  category: { type: String },
  price: { type: String },
  cookingTime: { type: String },
  calories: { type: String },
  imageURL: { type: String },
  servings: { type: String },
  topMeals: { type: Boolean || String },
});

module.exports = mongoose.model('Meal', mealSchema);
