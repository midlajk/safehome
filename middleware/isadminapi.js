module.exports = (req, res, next) => {
  console.log(req.session.isadminlogged)
    if (!req.session.isadminlogged) {
      console.log('herer')
        return res.status(500).json({error: 'Server login error.'});
    }
    else{

  next()

    }
    
}