module.exports = (req, res, next) => {
  console.log(req.session.isadminlogged)
    if (!req.session.isadminlogged) {
        return res.status(500).json({error: 'Server login error.'});
    }
    else{

  next()

    }
    
}