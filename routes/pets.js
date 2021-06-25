const express = require('express');
const router = express.Router();

const Pet = require('../models/pet.js');

let pets = [
  new Pet('Rocket', 2, 'dog', 'Golden Retriever', '/dogs/rocket.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus pulvinar eros non euismod. Aliquam egestas felis ac semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
  new Pet('Sigmund', 1, 'dog', 'Cairn Terrier', '/dogs/sigmund.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus pulvinar eros non euismod. Aliquam egestas felis ac semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
  new Pet('Pluto', 3, 'dog', ' Collie', '/dogs/pluto.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus pulvinar eros non euismod. Aliquam egestas felis ac semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
  new Pet('Phoenix', 3, 'dog', ' Labradoodle', '/dogs/phoenix.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus pulvinar eros non euismod. Aliquam egestas felis ac semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
  new Pet('Kelso', 1, 'dog', 'Shih Tzu', '/dogs/kelso.webp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus pulvinar eros non euismod. Aliquam egestas felis ac semper vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
];

router.get('/', function (req, res) {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 3;

  let paginatedResults = pets.slice((page - 1) * limit, page * limit);

  res.json(paginatedResults);
});

router.post('/', function (req, res) {
  const name = req.body.name;
  const age = req.body.age;
  const species = req.body.species;
  const race = req.body.race;
  const picture = req.body.picture;
  const description = req.body.description;

  const pet = new Pet(name, age, species, race, picture, description);
  pets.push(pet);

  res.sendStatus(200);
});

router.get('/:name', function (req, res) {
  const name = req.params.name;

  const pet = pets.find(pet => pet.name === name);
  res.json(pet);
});

router.delete('/:name', function (req, res) {
  const name = req.params.name;

  pets = pets.filter(pet => pet.name !== name);
  res.sendStatus(200);
});

module.exports = router;
