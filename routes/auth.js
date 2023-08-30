const router = require('express').Router();
const {check, validationResult} = require("express-validator");
const {users} = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.post('/signup',[
    check("email","Please provide a valid email").isEmail(),
    check("password","Please provide a password that is longer the 8 characters").isLength({min:6})
], async (req, res)=>{
    const {email, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }

    try {
        let user = users.find((user)=>{
            return user.email === email
        });

        if (user){
            return res.status(400).json({
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

        //hashing a password

        const hashPassword = await bcrypt.hash(password,8);

        users.push({
            email:email,
            password:hashPassword
        });

        const token = await JWT.sign({email},"1234567890",{
            expiresIn: 86400,
        });

        res.json({
            token
        });
        res.send(token)
    } catch (e) {
    }
});

module.exports = router;