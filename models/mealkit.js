var fastfood = [
  (pizza = {
    title: 'Pizza Peperoni',
    included: 'Delicious Italian Cheese & peperoni',
    description: 'Tasty Pizza',
    category: 'Fast Food',
    price: '14$',
    cookingTime: '10 Minutes',
    Calories: '850cal',
    imageURL: 'pizzaPeperoni.jpg',
    topMeals: true,
  }),
  (burger = {
    title: 'King Burger',
    included: 'Famous American Cheese & Organic Meat',
    description: 'Tasty burger',
    category: 'Fast Food',
    price: '8$',
    cookingTime: '8 Minutes',
    Calories: '750cal',
    imageURL: 'KingBurger.jpg',

    topMeals: true,
  }),
  (chickenBurger = {
    title: 'Chicken Burger',
    included: 'The Best Taste of Domestic Chicken',
    description: 'Tasty Chicken',
    category: 'Fast Food',
    price: '7$',
    cookingTime: '9 Minutes',
    Calories: '650cal',
    imageURL: 'ChickenBurger.jpg',
    topMeals: true,
  }),
  (pasta = {
    title: 'Pasta',
    included: 'Real Alfredo Pasta & chicken',
    description: 'Tasty pasta',
    category: 'Fast Food',
    price: '8$',
    cookingTime: '10 Minutes',
    Calories: '840cal',
    imageURL: 'pasta.png',

    topMeals: false,
  }),
  (hotDog = {
    title: 'Hot Dog',
    included: 'Real American Hot dog',
    description: 'Tasty hot dog',
    category: 'Fast Food',
    price: '2$',
    cookingTime: '5 Minutes',
    Calories: '350cal',
    imageURL: 'hotDog.jpg',
    topMeals: false,
  }),
  (wings = {
    title: 'Wings',
    included: 'Organic Wings',
    description: 'Tasty Wing',
    category: 'Fast Food',
    price: '15$',
    cookingTime: '20 Minutes',
    Calories: '550cal',
    imageURL: 'wings.jpg',
    topMeals: false,
  }),
];

module.exports.getAllMealKit = function () {
  return fastfood;
};

module.exports.getTopMeals = function () {
  var filtered = [];
  for (var i = 0; i < fastfood.length; i++) {
    if (fastfood[i].topMeals) {
      filtered.push(fastfood[i]);
    }
  }
  return filtered;
};
