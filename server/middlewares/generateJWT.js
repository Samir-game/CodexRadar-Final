const jwt= require("jsonwebtoken");

const generateJWT= (user)=>{
    return jwt.sign(
        {
            userId: user._id,
            userName: user.userName,
            userEmail: user.userEmail,
        },
        process.env.JWT_TOKEN_SECRET,
        {
            // jsonwebtoken requires a value such as "2d" or a number of seconds.
            expiresIn: process.env.JWT_EXPIRY || "2d"
        }
    )
}

module.exports={
    generateJWT
};
