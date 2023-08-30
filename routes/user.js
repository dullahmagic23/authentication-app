const router = require('express').Router();
const {users} = require('../db');

router.get("/",(req,res)=>{
    res.send(users)
})

module.exports = router