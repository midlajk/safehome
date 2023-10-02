module.exports = (req, res, next) => {
  console.log(req.session.isadminlogged)
    if (!req.session.isadminlogged) {

      return

    }
    else{

  next()

    }
    
}