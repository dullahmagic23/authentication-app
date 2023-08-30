const JWT  = require("jsonwebtoken");
module.exports = async (req, res, next)=>{
    const token = req.header('x-auth-token');
    if (!token){
        return res.status(403).json({
            "errors": [
                {
                    "msg": "Unauthorised",
                }
            ]
        });
    }
    try {
        const user = await JWT.verify(token,"1234567890");
        req.user = user.email;
    }catch(e){
        return res.status(403).json({
            "errors": [
                {
                    "msg": "Invalid token",
                }
            ]
        });
    }
    next();
};