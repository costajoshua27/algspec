const express = require('express');
const PORT = process.env.PORT;
const app = express();

app.get('/', (req, res) => {
  res.json({
    'hello': 'there'
  })
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
