// Require needed libraries for the server
const express = require('express');
const http = require('http');
const cors = require('cors');

// Initialize the server
const app = express();
const port = process.env.PORT;

// Establish a database connection
const mongoose = require('mongoose');
const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

// Required middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// Configure all routers
const algorithmRouter = require('./routes/algorithm');
const tagRouter = require('./routes/tag');
app.use('/algorithm', algorithmRouter);
app.use('/tag', tagRouter);

app.get('/', (req, res) => {
  res.json({
    'hello': 'there'
  })
});

// Have the server listen for requests on the designated port
app.listen(port, () => console.log(`Listening on port ${port}`));
