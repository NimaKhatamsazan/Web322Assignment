const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'login Page',
  });
});

router.post('/login', (req, res) => {
  const { uname, psw } = req.body;

  let passed = true;
  let validation = {};
 
  // const emailRegex =
  //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,12})/;

  if (
    typeof uname !== 'string' ||
    uname.trim().length === 0 
    // ||
    // !emailRegex.test(email)
  ) {
    passed = false;
    validation.uname = 'You must enter a correct UserName';
  } else if (
    // typeof psw !== 'string' ||
    psw.trim().length === 0 
    // ||
    // !passwordRegex.test(psw)
  ) {
    passed = false;
    validation.password = 'You must enter a correct password';
  }

  if (passed) {
    res.redirect(`/welcome/?username=${uname}`);
    // res.render('welcome', {
    //   values: req.body,
    //   layout: false,
    // });
  } else {
    res.render('login', {
      values: req.body,
      validation,
      layout: false,
    });
  }
});

// Sign Up page
router.get('/signUp', (req, res) => {
  res.render('signUp', {
    title: 'Sign Up Page',
    layout: false
  });
});

router.post('/signUp', (req, res) => {

  const { uname, lname, email, psw } = req.body;

  let passed = true;
  let validation = {};
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,12})/;

  if (typeof uname !== 'string' || uname.trim().length === 0) {
    passed = false;
    validation.uname = 'You must enter your First name';
  } else if (typeof uname !== 'string' || uname.trim().length < 2) {
    passed = false;
    validation.uname = 'Your First name must be more than 2 characters';
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

  if (passed) {
    const sgMail = require('@sendgrid/mail');
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

        res.render('signUp', {
          values: req.body,
          layout: false,
          validation,
        });
      });
  } else {
    res.render('signUp', {
      values: req.body,
      validation,
      layout: false,
    });
  }
});



module.exports = router;
