const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.postlogin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const adminCount = await User.countDocuments();

    if (adminCount === 0) {
      const newAdmin = new User({
        username: username,
        password: password, // Storing the password in plain text
      });

      await newAdmin.save();
      req.session.admin = newAdmin;
      req.session.isadminlogged = true;
      res.redirect('/admincontrollerenquiries');
    } else {
      const admin = await User.findOne({ username: username });

      if (!admin) {
        return res.status(404).json({ error: 'Admin not found.' });
      }

      const isPasswordValid = admin.password === password;
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password.' });
      } else {
        req.session.admin = admin;
        req.session.isadminlogged = true;
        res.redirect('/admincontrollerenquiries');
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    res.redirect('/admincontrollerlogin');
  });
};

exports.adminmanagement = async (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const adminCount = await User.countDocuments();
      if (adminCount === 0) {
        const newAdmin = new User({
          username: username,
          password: password,
        });

        await newAdmin.save();

        res.redirect('/admincontrolleradminmanagement?success=true');
      } else {
        const existingAdmin = await User.findOne();

        if (!existingAdmin) {
          return res.status(404).json({ error: 'Admin not found.' });
        }

        existingAdmin.username = username;
        existingAdmin.password = password;
        await existingAdmin.save();

        res.redirect('/admincontrolleradminmanagement');
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    res.redirect('/admincontrolleradminmanagement');
  }
};
