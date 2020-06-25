const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    if(!req.headers['user_token']) {
        return res.status(404).json({ error: 'You need to include user_token' });
    }
    const userToken = req.headers['user_token'];
    try {
    payload = jwt.verify(userToken, 'jasonandtheargonauts');
    } catch (err) {
    return res.status(401).json({ error: 'Token is not valid' });
    }
    req.user = payload;
    next();
};


const checkAdminStatus = (req, res, next) => {
    console.log(req.user.adminStatus);
    if (req.user.adminStatus !== 22081920) {
        return res.status(403).json({ error: 'Unauthorized access' })
    }
    next();
}       


module.exports = {
    checkToken: checkToken,
    checkAdminStatus: checkAdminStatus
}