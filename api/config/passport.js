const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user.model');

const customFields = {
  usernameField: 'email'
};

const verifyCallback = async (email, password, done) => {
  try {
    // Try to find an existing user with this email
    const findUser = await User.findOne({ email }).exec();
    if (!findUser) {
      return done(null, false, { message: 'No account associated with that email' });
    }

    // Check if the password given is the correct password stored in the db
    if (await bcrypt.compare(password, findUser.password)) {
      return done(null, findUser);
    } else {
      return done(null, false, { message: 'Password incorrect' });
    }
  } catch (error) {
    return done(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});