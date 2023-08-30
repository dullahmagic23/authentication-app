const router = require('express').Router();
const checkAuth = require("./middleware/checkAuth");
const {privatePosts} = require("../db");
router.get('/private', checkAuth,(req,res)=>{
    res.send(privatePosts);
})
module.exports = router;