const express = require('express');
const router = express.Router();
const mealkitModel = require('../models/mealkit');

router.get('/', (req, res) => {
  res.render('layout/home', {
    fastfood: mealkitModel.getTopMeals(),
    layout: false,
    user: req.session.user,
  });
});

router.get('/menu', (req, res) => {
  res.render('general/onTheMenu', {
    fastfood: mealkitModel.getAllMealKit(),
    layout: false,
    user: req.session.user,
  });
});

router.get('/welcome', (req, res, next) => {
  res.render('user/welcome', {
    layout: false,
    username: req.query.username,
    fastfood: mealkitModel.getAllMealKit(),
    user: req.session.user,
  });
});

router.get('/clerk', (req, res, next) => {
  if (req.session.role === 'clerk') {
    res.render('user/clerk', {
      layout: false,
      fastfood: mealkitModel.getAllMealKit(),
      user: req.session.user,
    });
  } else {
    res.redirect('/');
  }
});

router.get('/customer', (req, res, next) => {
  if (req.session.role === 'customer') {
    res.render('user/customer', {
      layout: false,
      fastfood: mealkitModel.getAllMealKit(),
      user: req.session.user,
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
