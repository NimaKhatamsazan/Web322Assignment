const express = require('express')
const router = express.Router();


// Login page
router.get("/loginPage", (req, res) => {
    res.render("login", {
        title: "login Page",
       
    });
});


router.post("/loginPage", (req, res) => {
    res.json(req.body);
    

});

// Sign Up page
router.get("/signUp", (req, res) => {
    res.render("/signUp", {
        title: "Sign Up Page",
       
    });
});


router.post("/signUp", (req, res) => {
    console.log(req.body);
    const { uname, lname, email, psw } = req.body; 

    let passed = true;
    let validation={};
    if (typeof uname !== 'string' || uname.trim().length === 0){
        passed= false;
        validation.uname="You must enter your First name"
    }
    else if (typeof uname !== 'string' || uname.trim().length < 2){
        passed= false;
        validation.uname="Your First name must be more than 2 characters"

    }
    if(passed){
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey('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');

        const msg = {
            to: email,
            from: 'akhatamsazan@myseneca.ca',
            subject: 'Canada Eats Sign Up',
            html:
                `Vistor's Full Name: ${uname} ${lname}<br>
                Vistor's Email Address: ${email}<br>                `
        };
        sgMail.send(msg)
            .then(() => {
                // Validation passed, sent out an email.
                res.send("Success, validation passed, email sent.");
            })
            .catch(err => {
                console.log(`Error ${err}`);

                res.render("signUp", {
                    values : req.body,
    
                    layout:false,
                    validation
            
                });
           
            });
    }

    else{
       

            res.render("signUp", {
                values : req.body,

                layout:false
            });
       
       
    }
    
});


module.exports = router;