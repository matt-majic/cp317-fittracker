// import { getUser } from './database.js'
const express = require('express');
const cors = require('cors');

const app = express();

app.get('/api/GetUser/:id', cors(), (req, res) => {
  const id = req.params.id
  // const user = getUser(id)
  res.send('Test ' + id);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);