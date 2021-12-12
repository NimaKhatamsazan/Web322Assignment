const express = require('express');
const router = express.Router();
const fileUpload = require('../middlewares/file-upload');
const Meal = require('../models/mealModel');
const mealkitModel = require('../models/mealkit');

router.post(
  '/load-data/add-meal',
  fileUpload.single('image'),
  (req, res, next) => {
    // authorize user
    const user = req.session.user;
    const role = req.session.role;
    if (!user || role !== 'clerk') {
      res.send('You are not authorized to see this page');
    }
    const {
      title,
      included,
      description,
      category,
      price,
      cookingTime,
      calories,
      servings,
      topMeals,
    } = req.body;

    const imageURL = req.file.filename;

    let message = {};

    const createdMeal = new Meal({
      title,
      included,
      description,
      category,
      price,
      cookingTime,
      calories,
      servings,
      topMeals,
      imageURL,
    });
    createdMeal
      .save()
      .then(() => {
        message.success = 'Meal added successfully';
        res.render('user/addMeal', {
          layout: false,
          message,
          user,
        });
      })
      .catch(err => console.log(err));
  }
);

// /load-data/meal-kits
// load to server
router.get('/load-data/meal-kits', (req, res, next) => {
  const user = req.session.user;
  const role = req.session.role;
  const mealKits = mealkitModel.getAllMealKit();
  let message;

  if (!user || role !== 'clerk') {
    res.send('You are not authorized to see this page');
  } else {
    Meal.find({})
      .count()
      .then(length => {
        if (length > 0) {
          message = 'data is already loaded';
        } else {
          return Meal.collection
            .insertMany(mealKits)
            .then(() => {
              message = 'Loaded successfully';
              res.render('user/loadMeal', {
                layout: false,
                message,
                user,
              });
            })
            .catch(err => console.log(err));
        }
        res.render('user/loadMeal', {
          layout: false,
          message,
          user,
        });
      })

      .catch(err => console.log(err));
  }
});

// edit each meal data
// /load-data/:id
router.get('/load-data/:id', (req, res, next) => {
  const user = req.session.user;
  const role = req.session.role;
  const mealId = req.params.id;

  // authorize user
  if (!user || role !== 'clerk') {
    res.render('user/editMeal', {
      layout: false,
      validation: { role: 'other' },
      user,
    });
  }

  Meal.find({ _id: mealId })
    .then(meal => {
      if (!meal) {
        res.redirect('/menu');
      } else {
        const transformedMeal = meal.map(document => ({
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
          servings: document.servings,
        }))[0];

        res.render('user/editMeal', {
          layout: false,
          meal: transformedMeal,
          user,
        });
      }
    })
    .catch(err => console.log(err));
});

// edit a meal
// /load-data/:id
router.post(
  '/load-data/:id',
  fileUpload.single('image'),
  (req, res, next) => {
    const user = req.session.user;
    const role = req.session.role;
    const mealId = req.params.id;
    const {
      title,
      included,
      description,
      category,
      price,
      cookingTime,
      calories,
      servings,
      topMeals,
    } = req.body;

    const imageURL = req?.file?.filename;

    // authorize user
    if (!user || role !== 'clerk') {
      res.send('You are not authorized to see this page');
    }

    Meal.findOne({ _id: mealId })
      .then(meal => {
        if (!meal) {
          res.redirect('/menu');
        } else {
          meal.title = title;
          meal.included = included;
          meal.description = description;
          meal.category = category;
          meal.cookingTime = cookingTime;
          meal.calories = calories;
          meal.servings = servings;
          meal.topMeals = topMeals;
          meal.price = price;
          meal.imageURL = imageURL;

          return meal.save();
        }
      })
      .then(savedMeal => {
        const transformedMeal = {
          id: savedMeal._id.toString(),
          title: savedMeal.title,
          included: savedMeal.included,
          description: savedMeal.description,
          category: savedMeal.category,
          price: savedMeal.price,
          cookingTime: savedMeal.cookingTime,
          calories: savedMeal.calories,
          imageURL: savedMeal.imageURL,
          topMeals: savedMeal.topMeals,
          servings: savedMeal.servings,
        };
        res.render('user/editMeal', {
          layout: false,
          meal: transformedMeal,
          message: { success: 'Meal edited Successfully' },
          user,
        });
      })
      .catch(err => console.log(err));
  }
);

// add data to server
router.get('/load-data', (req, res, next) => {
  const user = req.session.user;
  const role = req.session.role;

  // validation
  let validation = {};

  if (!user || role !== 'clerk') {
    validation.role = 'other';
  }

  res.render('user/addMeal', {
    layout: false,
    validation,
    user,
  });
});

// add meal

module.exports = router;
