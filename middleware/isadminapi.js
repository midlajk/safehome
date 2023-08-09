module.exports = (req, res, next) => {
    if (!req.session.isadminlogged) {
        return res.status(500).json({error: 'Server login error.'});
    }
    else{

  next()

    }
    
}