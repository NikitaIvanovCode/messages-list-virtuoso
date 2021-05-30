const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.post('/data', (req, res) => {
  console.log('--------------------');
  const { email, password } = req.body;
  console.log(req.headers.authorization);
  console.log(email);
  console.log(password);
  setTimeout(() => {
    res.status(200).send({ message: 'Welcome' });
  }, 3000);
});

app.listen(6969);
