const express = require('express');
const router = express.Router();

const Pet = require('../models/pet.js');

const pets = [
  new Pet('Rocket', 2, 'dog', 'Golden Retriever', '/dogs/rocket.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus pulvinar eros non euismod. Aliquam egestas felis ac semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
  new Pet('Sigmund', 1, 'dog', 'Cairn Terrier', '/dogs/sigmund.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus pulvinar eros non euismod. Aliquam egestas felis ac semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
  new Pet('Pluto', 3, 'dog', ' Collie', '/dogs/pluto.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus pulvinar eros non euismod. Aliquam egestas felis ac semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
  new Pet('Phoenix', 3, 'dog', ' Labradoodle', '/dogs/phoenix.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus pulvinar eros non euismod. Aliquam egestas felis ac semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
  new Pet('Kelso', 1, 'dog', 'Shih Tzu', '/dogs/kelso.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus pulvinar eros non euismod. Aliquam egestas felis ac semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
];

router.get('/', function(req, res) {
  const page = req.query.page;
  const limit = req.query.limit;

  let paginatedResults = pets.slice((page -1) * limit , page * limit);

  res.json(paginatedResults);
});

module.exports = router;
