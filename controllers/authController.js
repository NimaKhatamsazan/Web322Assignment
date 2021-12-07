const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const User = require('../models/userModel');

// login page
router.get('/login', (req, res) => {
  res.render('user/login', {
    layout: false,
  });
});

// Sign Up page
router.get('/signUp', (req, res) => {
  res.render('user/signUp', {
    title: 'Sign Up Page',
    layout: false,
  });
});

// logout
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
});

// login
router.post('/login', (req, res) => {
  const { email, psw, role } = req.body;

  // validation
  let passed = true;
  let validation = {};

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (
    typeof email !== 'string' ||
    email.trim().length === 0 ||
    !emailRegex.test(email)
  ) {
    passed = false;
    validation.email = 'You must enter a correct Email';
  } else if (psw.trim().length === 0) {
    passed = false;
    validation.password = 'You must enter a correct password';
  }

  if (!passed) {
    res.render('login', {
      values: req.body,
      validation,
      layout: false,
    });
  }

  // finding user

  User.findOne({
    email: email,
  })
    .then(user => {
      // let { role } = user;
      if (!user) {
        res.render('user/login', {
          values: req.body,
          validation: {
            ...validation,
            email: 'Could not find the user',
          },
          layout: false,
        });
      }

      // chech password
      bcrypt
        .compare(psw, user.password)
        .then(isMatch => {
          if (isMatch) {
            // set session
            req.session.user = user;
            req.session.role = role;

            res.redirect(
              role === 'customer' ? '/customer' : '/clerk'
            );
          } else {
            res.render('user/login', {
              values: req.body,
              validation: {
                ...validation,
                password: 'Entered Password is Wrong',
              },
              layout: false,
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// signup
router.post('/signUp', (req, res) => {
  const { uname, lname, email, psw } = req.body;

  let passed = true;
  let validation = {};

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,12})/;

  // validation
  if (typeof uname !== 'string' || uname.trim().length === 0) {
    passed = false;
    validation.uname = 'You must enter your First name';
  } else if (typeof lname !== 'string' || lname.trim().length === 0) {
    passed = false;
    validation.uname = 'You must enter your Last name';
  } else if (typeof uname !== 'string' || uname.trim().length < 2) {
    passed = false;
    validation.uname =
      'Your First name must be more than 2 characters';
  } else if (
    typeof email !== 'string' ||
    email.trim().length === 0 ||
    !emailRegex.test(email)
  ) {
    passed = false;
    validation.email = 'You must enter a correct email address';
  } else if (
    typeof psw !== 'string' ||
    psw.trim().length === 0 ||
    !passwordRegex.test(psw)
  ) {
    passed = false;
    validation.password = 'You must enter a strong password';
  }

  // check user exists

  User.findOne({
    email: email,
  })
    .then(user => {
      if (user) {
        passed = false;
        validation.email = 'User exists';
        res.render('user/signUp', {
          values: req.body,
          layout: false,
          validation,
        });
      }
    })
    .catch(err => console.log(err));

  if (passed) {
    // Hash password
    bcrypt
      .hash(psw, 12)
      .then(hashedPassword => {
        const user = new User({
          firstName: uname,
          lastName: lname,
          email: email,
          password: hashedPassword,
          role: 'customer',
        });

        return user.save();
      })
      .then(user => console.log(user))
      .catch(err => console.log(err));

    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    const msg = {
      to: email,
      from: 'akhatamsazan@myseneca.ca',
      subject: 'Canada Eats Sign Up',
      html: `<strong>Thank you for choosing us</strong> <br>
      Hi dear ${uname} ${lname}<br>
                Your Email Address is ${email}<br>   
                 We will keep in touch by this email.<br>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        // Validation passed, sent out an email.
        // res.send('Success, validation passed, email sent.');
        res.redirect(`/welcome/?username=${uname}`);
      })
      .catch(err => {
        console.log(`Error ${err}`);

        res.render('user/signUp', {
          values: req.body,
          layout: false,
          validation,
        });
      });
  } else {
    res.render('user/signUp', {
      values: req.body,
      validation,
      layout: false,
    });
  }
});

module.exports = router;
