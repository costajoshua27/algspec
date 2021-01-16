const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const passport = require('passport');

const me = async (req, res) => {
  try {
    const user = await User.find({ username: req.session.username }).exec();      
    const { password, ...withoutPassword } = user; // Destructure and spread the user object so we can return all values except for the password
//    return res.status(200).send(withoutPassword);
    return res.status(200).send(req.session.user);
  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const isAuthenticated = async (req, res) => {
  return res.status(200).send({ isAuthenticated: req.isAuthenticated() });
}

const register = async (req, res) => {
  const {
    username,
    email,
    password
  } = req.body;

  try {
    // Ensure that an account with this email and/or email doesn't exist
    if (await User.findOne({ email }).exec()) {
      return res.status(400).send({ message: 'Account with that email already exists' });
    }
    if (await User.findOne({ username }).exec()) {
      return res.status(400).send({ message: 'Username is taken' });
    }
    
    // Encrypt the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user document and save it the db
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(200).send({ message: 'User successfully created' });

  } catch (error) {
    return res.status(500).send({ message: `Database error: ${error}` });
  }
};

const authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      req.flash('error', `An internal error occurred: ${err}`);
      return next();
    }
    if (!user) {
      console.log(info); 
      req.flash('unauthorized', info.message);
      return next();
    }
    req.logIn(user, (err) => {
      if (err) { 
        req.flash('error', `An internal error occurred: ${err}`);
      }
      return next();
    });
  })(req, res, next);
}

const login = (req, res) => {
  const errorFlash = req.flash('error');
  const unauthFlash = req.flash('unauthorized');
  if (errorFlash.length > 0) {
    return res.status(500).send({ message: errorFlash[0] });
  }
  if (unauthFlash.length > 0) {
    return res.status(400).send({ message: unauthFlash[0] });
  } 
  req.session.user = req.user;
  return res.status(200).send(req.session.user);
};

const logout = async (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).send({ message: 'Successfully logged out' }); 
};

module.exports = {
  me,
  isAuthenticated,
  register,
  authenticate,
  login, 
  logout
};