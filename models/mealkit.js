var fastfood = [
  {
    title: 'Pizza Peperoni',
    included: 'Delicious Italian Cheese & peperoni',
    description: 'Tasty Pizza',
    category: 'Italian',
    price: '14$',
    cookingTime: '10 Minutes',
    calories: '850cal',
    imageURL: 'pizzaPeperoni.jpg',
    topMeals: true,
  },
  {
    title: 'King Burger',
    included: 'Famous American Cheese & Organic Meat',
    description: 'Tasty burger',
    category: 'American',
    price: '8$',
    cookingTime: '8 Minutes',
    calories: '750cal',
    imageURL: 'KingBurger.jpg',
    topMeals: true,
  },
  {
    title: 'Chicken Burger',
    included: 'The Best Taste of Domestic Chicken',
    description: 'Tasty Chicken',
    category: 'American',
    price: '7$',
    cookingTime: '9 Minutes',
    calories: '650cal',
    imageURL: 'ChickenBurger.jpg',
    topMeals: true,
  },
  {
    title: 'Pasta',
    included: 'Real Alfredo Pasta & chicken',
    description: 'Tasty pasta',
    category: 'Italian',
    price: '8$',
    cookingTime: '10 Minutes',
    calories: '840cal',
    imageURL: 'pasta.png',

    topMeals: false,
  },
  {
    title: 'Hot Dog',
    included: 'Real American Hot dog',
    description: 'Tasty hot dog',
    category: 'American',
    price: '2$',
    cookingTime: '5 Minutes',
    calories: '350cal',
    imageURL: 'hotDog.jpg',
    topMeals: false,
  },
  {
    title: 'Wings',
    included: 'Organic Wings',
    description: 'Tasty Wing',
    category: 'American',
    price: '15$',
    cookingTime: '20 Minutes',
    calories: '550cal',
    imageURL: 'wings.jpg',
    topMeals: false,
  },
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
