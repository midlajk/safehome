
module.exports = (req, res, next) => {
    console.log(req.session.isadminlogged)
    if (!req.session.isadminlogged) {
        console.log('hehe')
        return res.redirect('/admincontrollerlogin');
    }
    next();
}