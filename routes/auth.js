const router = require('express').Router();
const {check, validationResult} = require("express-validator");
const {users} = require("../db");

router.post('/signup',[
    check("email","Please provide a valid email").isEmail(),
    check("password","Please provide a password that is longer the 8 characters").isLength({min:6})
], (req, res)=>{
    const {email, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

    let user = users.find((user)=>{
        return user.email === email
    });

    if (user){
        res.status(400).json({
            "errors": [
                {
                    "type": "field",
                    "value": email,
                    "msg": "This email address is already taken",
                    "path": "email",
                    "location": "body"
                }
            ]
        });
    }
    res.send("Validation passed")
});

module.exports = router;