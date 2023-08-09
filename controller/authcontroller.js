require('../model/datastructure')
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

exports.postlogin = async (req, res) => {
  const { username, password } = req.body;
console.log(username)
  try {
    // Find the admin by username
    const admin = await User.findOne({ username: username });
    console.log(admin)

    if (!admin) {

      return res.status(404).json({ error: 'Admin not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }else{
       // If username and password are correct, redirect to the dashboard
       req.session.admin = admin;
       req.session.isadminlogged = true;
    res.redirect('/backend/enquiries');
    }

   

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
    exports.logout = (req, res, next) => {
      req.session.destroy(err => {
          res.redirect('/backend/login');
      });
  
  }



exports.adminmanagement = async (req, res, next) => {
  console.log(req.body)
  const { username, password } = req.body;

  if(username&&password){
  try {

    // Check if the Admin collection has any data
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      // If there are no records, create a new admin
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newAdmin = new User({
        username: username,
        password: hashedPassword,
      });

      await newAdmin.save();

      res.redirect('/backend/adminmanagement?success=true');
        } else {
      // If there are existing records, update the admin record with the given username
      const existingAdmin = await User.findOne();
      console.log(existingAdmin)

      if (!existingAdmin) {
        // If no admin found with the given username, you may handle it accordingly.
        // For simplicity, I'll just send an error message here.
        return res.status(404).json({ error: 'Admin not found.' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      existingAdmin.username = username;
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();

      res.redirect('/backend/adminmanagement');
        }
  } catch (err) {
    console.log(err)
    // Handle any errors that might occur during the process
    next(err);
  }
}else{
  res.redirect('/backend/adminmanagement');

}
};