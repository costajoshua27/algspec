// Require needed libraries for the server
const express     = require('express');
const session     = require('express-session');
const flash       = require('connect-flash');
const passport    = require('passport');
const http        = require('http');
const cors        = require('cors');
const MongoStore  = require('connect-mongo')(session);

// Passport configuration
require('./config/passport');

// Initialize the server
const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

// Establish a database connection
const mongoose = require('mongoose');
const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

// Initialize a session store (connect-mongo)
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions',
  autoRemove: 'native'
});

// Required middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost:8081',
    'https://localhost:8081'
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Equal to 1 day in milliseconds
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Configure all routers
const algorithmRouter = require('./routes/algorithm');
const tagRouter = require('./routes/tag');
const userRouter = require('./routes/user');
const levelRouter = require('./routes/level');
app.use('/algorithm', algorithmRouter);
app.use('/tag', tagRouter);
app.use('/user', userRouter);
app.use('/level', levelRouter);

// Have the server listen for requests on the designated port
server.listen(port, () => console.log(`Listening on port ${port}`));
