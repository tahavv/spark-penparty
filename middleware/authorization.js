require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    const token = req.header('token');
    if (!token) {
        return res.status(403).send('You are not authorized !');
    }

    try {
        const payload = jwt.verify(token, process.env.JWTSECRET);
        req.user = payload.user;
        next();

    } catch (error) {
        console.log(error.message);
        res.status(403).send('You are not authorized !');
    }

}