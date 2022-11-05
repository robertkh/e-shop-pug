module.exports = (req, res, next) => {
    req.session.visits = req.session.visits + 1 || 1;
    next();
}