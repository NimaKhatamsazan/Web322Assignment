const express = require('express');
const router = express.Router();
const Meal = require('../models/mealModel');
const sgMail = require('@sendgrid/mail');

// add to cart
// /add-to-cart/:id

router.get('/add-to-cart/:id', (req, res, next) => {
  const mealId = req.params.id;
  const user = req.session.user;

  var cart = (req.session.cart = req.session.cart || []);

  if (!user) {
    res.send('You are not authorized to add products to cart');
  }

  Meal.find({ _id: mealId })
    .then(meal => {
      if (!meal) {
        res.send('No meal found');
      } else {
        const transformedMeal = meal.map(document => ({
          id: document._id.toString(),
          title: document.title,
          included: document.included,
          description: document.description,
          category: document.category,
          price: +document.price,
          cookingTime: document.cookingTime,
          calories: document.calories,
          imageURL: document.imageURL,
          topMeals: document.topMeals,
          servings: document.servings,
          qty: 1,
        }))[0];

        const filteredMeal = cart.find(
          cartItem => cartItem.id === mealId
        );

        if (filteredMeal) {
          filteredMeal.qty++;
        } else {
          cart.push(transformedMeal);
        }

        // const totalItems = cart.reduce(
        //   (acc, curr) => +acc.qty + +curr.qty
        // );

        // const totalPrice = cart.reduce(
        //   (acc, curr) =>
        //     +acc.qty * +acc.price + +curr.qty * +curr.price
        // );

        // res.send({ items: totalItems, price: totalPrice, cart });

        res.redirect('/cart');
      }
    })
    .catch(err => console.log(err));
});

// place order
// /place-order

router.get('/place-order', (req, res, next) => {
  const user = req.session.user;
  const cart = req.session.cart;

  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  if (!user) {
    res.send('You are not authorized to add products to cart');
  }

  const cartInfo = cart.map(cartItem => {
    return `<p>Item: ${cartItem.title}</p>
         <p>Price: ${cartItem.price}</p>
         <p>Quantity: ${cartItem.qty}</p>
         `;
  });

  const totalItems =
    cart.length > 1
      ? cart.reduce((acc, curr) => +acc.qty + +curr.qty)
      : cart[0].qty;

  const totalPrice =
    cart.length > 1
      ? cart.reduce(
          (acc, curr) =>
            +acc.qty * +acc.price + +curr.qty * +curr.price
        )
      : cart[0].price;

  const msg = {
    to: user.email,
    from: 'akhatamsazan@myseneca.ca',
    subject: 'Canada Eats cart',
    html: `<strong>Thank you for choosing us</strong> <br>
    <p>Your cart:</p>
    <p>Total items: ${totalItems}</p>
    <p>Total price: ${totalPrice}</p>

    ${cartInfo}
               We will keep in touch by this email.<br>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      req.session.cart = [];

      res.send('Email sent and cart cleared');
    })
    .catch(err => console.log(err));
});

// cart page
router.get('/cart', (req, res, next) => {
  const cart = req.session.cart || [];

  if (cart.length > 0) {
    const totalItems =
      cart.length > 1
        ? cart.reduce((acc, curr) => +acc.qty + +curr.qty)
        : cart[0].qty;

    const totalPrice =
      cart.length > 1
        ? cart.reduce(
            (acc, curr) =>
              +acc.qty * +acc.price + +curr.qty * +curr.price
          )
        : cart[0].price;

    res.render('user/cart', {
      layout: false,
      cart,
      totalPrice,
      totalItems,
    });
  } else {
    res.render('user/cart', {
      layout: false,
    });
  }
});

// meal description page
router.get('/meal/:id', (req, res, next) => {
  const mealId = req.params.id;

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
          price: +document.price,
          cookingTime: document.cookingTime,
          calories: document.calories,
          imageURL: document.imageURL,
          topMeals: document.topMeals,
          servings: document.servings,
        }))[0];

        res.render('user/mealDescription', {
          layout: false,
          meal: transformedMeal,
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
