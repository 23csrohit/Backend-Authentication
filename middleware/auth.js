const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

app.get('/protected', auth, (req, res) => {
    res.send('This is a protected route');
});

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};