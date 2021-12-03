const express = require('express');
const router = express.Router();
const Meal = require('../models/mealModel');

router.get('/', (req, res) => {
  Meal.find({ topMeals: true })
    .then(meals => {
      const mealKits = meals.map(document => ({
        id: document._id.toString(),
        title: document.title,
        included: document.included,
        description: document.description,
        category: document.category,
        price: document.price,
        cookingTime: document.cookingTime,
        calories: document.calories,
        imageURL: document.imageURL,
        topMeals: document.topMeals,
      }));
      res.render('layout/home', {
        fastfood: mealKits,
        layout: false,
        user: req.session.user,
      });
    })
    .catch(err => console.log(err));
});

router.get('/menu', (req, res) => {
  Meal.find({})
    .then(meals => {
      const mealKits = meals.map(document => ({
        id: document._id.toString(),
        title: document.title,
        included: document.included,
        description: document.description,
        category: document.category,
        price: document.price,
        cookingTime: document.cookingTime,
        calories: document.calories,
        imageURL: document.imageURL,
        topMeals: document.topMeals,
      }));

      const isClerk =
        req.session?.user?.role === 'clerk' ? true : false;

      res.render('general/onTheMenu', {
        meals: mealKits,
        layout: false,
        user: req?.session?.user,
        isClerk,
      });
    })
    .catch(err => console.log(err));
});

router.get('/welcome', (req, res, next) => {
  Meal.find({})
    .then(meals => {
      const mealKits = meals.map(document => ({
        id: document._id.toString(),
        title: document.title,
        included: document.included,
        description: document.description,
        category: document.category,
        price: document.price,
        cookingTime: document.cookingTime,
        calories: document.calories,
        imageURL: document.imageURL,
        topMeals: document.topMeals,
      }));

      res.render('user/welcome', {
        layout: false,
        username: req.query.username,
        fastfood: mealKits,
        user: req.session.user,
      });
    })
    .catch(err => console.log(err));
});

router.get('/clerk', (req, res, next) => {
  if (req.session.role === 'clerk') {
    Meal.find({})
      .then(meals => {
        const mealKits = meals.map(document => ({
          id: document._id.toString(),
          title: document.title,
          included: document.included,
          description: document.description,
          category: document.category,
          price: document.price,
          cookingTime: document.cookingTime,
          calories: document.calories,
          imageURL: document.imageURL,
          topMeals: document.topMeals,
        }));

        res.render('user/clerk', {
          layout: false,
          fastfood: mealKits,
          user: req.session.user,
        });
      })
      .catch(err => console.log(err));
  } else {
    res.redirect('/');
  }
});

router.get('/customer', (req, res, next) => {
  if (req.session.role === 'customer') {
    Meal.find({})
      .then(meals => {
        const mealKits = meals.map(document => ({
          id: document._id.toString(),
          title: document.title,
          included: document.included,
          description: document.description,
          category: document.category,
          price: document.price,
          cookingTime: document.cookingTime,
          calories: document.calories,
          imageURL: document.imageURL,
          topMeals: document.topMeals,
        }));

        res.render('user/customer', {
          layout: false,
          fastfood: mealKits,
          user: req.session.user,
        });
      })
      .catch(err => console.log(err));
  } else {
    res.redirect('/');
  }
});

module.exports = router;
