const express = require('express');
const app = express();
const port = 3000;

const home = require('./routes/home.js');
const pets = require('./routes/pets.js');


app.use(express.static('public'))


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/home', home);
app.use('/pets', pets);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

