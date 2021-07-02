# Taller de JavaScript

![Resultado](/images/result.png)

Autor: Eduardo Oviedo Blanco

Para usar este taller efectivamente, clone el código en su ambiente local.
```
git clone https://github.com/edWAR6/Node.js-Express-Pets-Server.git
```
Si desea subir el taller en su repositorio personal.
Cree un repositorio en su perfil, luego:
```
git remote set-url origin https://github.com/<tu usuario>/Node.js-Express-Pets-Server.git
```

> El nombre del repositorio puede cambiar. Siga las instrucciones y guarde sus cambios.

## Propósito

Este taller tiene como propósito llevar al estudiante por los conceptos básicos de un server en Node.js usando el framework Express.
-Rutas
-Middleware
-Archivos estáticos
-Manejo de errores
-Bases de datos
-Views

## Instrucciones

1. Inicie en la terminal ejecutando el siguiente comando y respondiendo a las preguntas.
```bash
npm init
```
2. Asegurese de revisar y entender el archivo creado.
3. Instale la dependencia *express*, con el siguiente comando.
```bash
npm install express
```
4. Revisa el server de *Express* ya existente en app.js y ejecútalo con el comando.
```bash
node app.js
```
5. Asegúrese de que todo funcione y no olvide crear el archivo *.gitignore*.
6. Cree un nuevo folder llamado  "*routes*".

### Enrutamiento

7. Dentro de este folder un nuevo archivo llamado "*home.js*".
8. Cree el siguiente módulo con el siguiente código.
```js
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('Home');
});

module.exports = router;
```
9. Importe el módulo creado al server. Un buen lugar para importar el módulo, sería debajo de los imports existentes.
```js
const home = require('./routes/home.js');
```
10. Indíquele al app de express que usará ese módulo, con el siguiente código.
```js
app.use('/home', home);
```
11. Ejecute la aplicación y note la diferencia al navegar a las dos rutas.
- http://localhost:3000/
- http://localhost:3000/home

### Archivos estáticos

12. Note la existencia de un folder llamado "*public*" en donde existe otro folder llamado "*images*" en donde existen fotos para gatos y perros.
13. En app.js, agregue la siguiente instrucción para indicar que ese es un directorio de archivos estáticos. Por esto ser parte de la configuración inicial, es mejor si está después de las constantes iniciales.
```js
app.use(express.static('public'));
```

14. Ejecute nuevamente el server y revise las rutas estáticas.
- http://localhost:3000/images/cats/michael.webp
- http://localhost:3000/images/cats/pharaon.jpg
- Etc.

### Modelos

15. En la raíz del proyecto, cree un folder llamado "*models*".
16. Dentro de este folder cree un archivo "*pet.js*" con la siguiente clase.
```js
class Pet {
  constructor(name, age, species, race, picture, description) {
    this.name = name;
    this.age = age;
    this.species = species;
    this.race = race;
    this.picture = picture;
    this.description = description;
  } 
}

module.exports = Pet;
```
17. Dentro del folder "*routes*" cree un nuevo archivo "*pets.js*", con el siguiente código.
```js
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
  res.json(pets);
});

module.exports = router;
```
18. Ahora en el archivo principal "*app.js*", agregue la inclusión de esa ruta.
```js
const pets = require('./routes/pets.js');
```
19. Y luego agregue la ruta.
```js
app.use('/pets', pets);
```
20. Ejecute el server nuevamente y observe el retorno de la siguiente ruta.
- http://localhost:3000/pets

### API Client

21. Instala y pruebe el endpoint haciendo uso de Postman.
https://www.postman.com/

### Parámetros tipo Query

22. En el módulo pets.js, modifique el endpoint para incluir parámetros.
```js
router.get('/', function(req, res) {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 3;

  let paginatedResult = pets.slice((page -1) * limit, page * limit);

  res.json(paginatedResult);
});
```
23. Ejecute nuevamente el server para ver los cambios experimentando con diferentes valores en los parámetros.
- http://localhost:3000/pets?page=1&limit=2
- http://localhost:3000/pets?page=2&limit=3
- http://localhost:3000/pets?page=6&limit=6
- Etc.

### Parámetros tipo Body

24. Para que Node.js pueda usar datos de un form HTML es necesario agregar un encoder. Para esto instalaremos uno.
```bash
npm i body-parser
```
25. En app.js agreue el la dependencia.
```js
const bodyParser = require('body-parser');
```
26. Y cree la configuración.
```js
app.use(bodyParser.urlencoded({ extended: false }));
```
> Desde la versión 4.16.0 express incluye los parsers por lo que la instalación del *body-parser* no es necesaria.
```js
app.use(express.urlencoded({ extended: true }));
```
27. Luego en pets.js agregue un endpoint, pero esta vez será tipo POST.
```js
router.post('/', function(req, res) {
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
```
28. Ejecute nuevamente la aplicación y analice los resultados. Para lograr que se creen nuevos perros, siga las instrucciones del profesor, para hacer un push por medio de Postman.

### Parámetros de ruta

29. Primero agrega el endpoint para poder retornar una sola mascota.
```js
router.get('/:name', function(req, res) {
  const name = req.params.name;

  const pet = pets.find(pet => pet.name === name);
  res.json(pet);
});
```
30. Y la funcionalidad para borrar una mascota.
```js
router.delete('/:name', function(req, res){
  const name = req.params.name;

  pets = pets.filter(pet => pet.name !== name);
  res.sendStatus(200);
});
```
31. Ejecute nuevamente la aplicación y pruebe los anteriores endpoints.

### Renderizando HTML

32. Cree un folder views en la raiz del proyecto.

33. Agregue el archivo "*home.html*", con el siguiente código.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Adopción de mascotas</h1>
  <img src="/images/dogs/pluto.jpg" alt="Pluto">
</body>
</html>
```

34. En *app.js* asegúrese de importar el módulo *path*.
```js
const path = require('path');
```

35. Cambie el endpoint de '/' de la siguiente manera.
```js
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/home.html'));
});
```

36. Reinicie el server y vea los cambios en la ruta "http://localhost:3000/".

### View

37. En el folder public, cree otro folder llamado "javascript" y dentro de este, "*home.js*".

38. Agrega el siguiente código.
```js
function loadSomePets() {
  fetch('/pets?page=1&limit=3')
    .then(response => response.json())
    .then(data => console.log(data));
}

loadSomePets();
```
39. Ejecute nuevamente el server y vea la consola.
Analise los resultados

### Base de datos

40. Cree una cuenta en MongoDB Atlas. https://www.mongodb.com/cloud/atlas

41. Una vez dentro, cree un Cluster, una base de datos llamada "*PETS*" y una colección "*pets*".

42. Ingrese a Database Access y cree un usuario, por ejemplo "petsUser" con la contraseña "petsPassword", asegúrese de que sea un usuario temporal si va a compartir su string de conección.

43. Ya creada la colección y el usuario, regrese al inicio, haciendo click en Atlas, en el menú superior y seleccione. 

44. Presione el botón "CONNECT" y "Connet your application".

45. Guarde su connection string.

46. Instale el MongoDB driver al proyecto.
```bash
npm i mongodb
```

47. En la raiz del proyecto, cree un folder llamado "database".

48. Cree un archivo llamado "mongodbUtil.js", con el siguiente código.
```js
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<user>:<password>@cluster0.ysuo2.mongodb.net/PETS?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let pets;

function connect(callback) {
  client.connect(err => {
    console.info('MongoDB connected!');
    pets = client.db("PETS").collection("pets");
    return callback(err);
  });
}

function disconnect(callback) {
  client.close();
  callback();
}

function getPetsCollection() {
  return pets;
}

module.exports = {
  connect,
  disconnect,
  getPetsCollection,
};
```
49. Asegúrese de cambiar el usuario y password en el connection string.

50. En app.js, agregue el módulo al server.
```js
const mongodb = require('./database/mongodbUtil');
```

51. Ahora después de la configuración y antes de las rutas, agregue el llamado a conectar.
```js
mongodb.connect(err => {
  if (err) console.error(err);
});
```

52. Ahora en la ruta "pets.js" agregue el import al módulo.
```js
const mongodb = require('../database/mongodbUtil');
```

53. Cambie el endpoint get de la ruta '/', por el siguiente.
```js
router.get('/', function(req, res) {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 3;

  let pets = mongodb.getPetsCollection();

  pets.find().skip((page -1) * limit).limit(page * limit).toArray((err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (result.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  });
});
```

54. Modifique el endpoint del post a la ruta '/' en pets.js de la siguiente manera.
```js
router.post('/', function(req, res) {
  const name = req.body.name;
  const age = req.body.age;
  const species = req.body.species;
  const race = req.body.race;
  const picture = req.body.picture;
  const description = req.body.description;

  const pet = new Pet(name, age, species, race, picture, description);
  
  let pets = mongodb.getPetsCollection();

  pets.insertOne(pet);

  res.sendStatus(200);
});
```

55. Ejecute el server nuevamente y verifique las funcionalidades. Si es necesario agregar imágenes nuevas, puede hacerlo.

56. Agregue el siguiente require.
```js
const ObjectId = require('mongodb').ObjectId; 
```

56. Modifique el endpoint del get a '/:name' en pets.js.
```js
router.get('/:id', function(req, res) {
  const id = req.params.id;

  let pets = mongodb.getPetsCollection();

  const pet = pets.find({_id: new ObjectId(id)}).toArray((err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (result.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  });
});
```

57. Verifique los cambios.

58. Modifique el endpoint del delete de la siguiente manera.
```js
router.delete('/:id', function(req, res){
  console.log(1);
  const id = req.params.id;

  let pets = mongodb.getPetsCollection();

  pets.deleteOne({_id: new ObjectId(id)});

  res.sendStatus(200);
});
```

59. Verifique que todos los endpoints funcionen correctamente.

### UI

60. Agregue el siguiente html al body del home.html.
```html
  <div class="sidebar">
    <h2>Add a PET</h2>
    <form method="POST" action="/pets">
      <label for="name">Name:</label>
      <input type="text" name="name" id="name">

      <label for="age">Age:</label>
      <input type="number" name="age" id="age">

      <label for="species">Species:</label>
      <select name="species" id="species">
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
      </select>

      <label for="race">Race:</label>
      <input type="text" name="race" id="race">

      <label for="picture">Picture:</label>
      <input type="text" name="picture" id="picture">

      <label for="description">Description:</label>
      <textarea id="description" name="description" rows="4"></textarea>

      <br>
      <input type="submit" value="Save">
    </form>
  </div>
  <div class="content">
    <header><h1>PETS.com</h1></header>
    <div class="pets">
      <!-- Pets goes here -->
    </div>
    <footer>Footer Content — PETS.com 2021</footer>
  </div>
```

61. En el directorio público, cree un folder "css" y dentro un archivo "home.css" con el siguiente código.
```css
body {
  display: grid;
  grid-template-columns: minmax(150px, 25%) 1fr;
  padding: 0;
  margin: 0;
}

.sidebar {
  height: 100%;
  background: lightpink;
  padding: 2rem;
}

.content {
  padding: 2rem;
}

body {
  font-family: system-ui, serif;
}

form{
  display: flex;
  flex-direction: column;
}

img {
  max-width: 25em;
}
```

62. Asegúrese de incluir el archivo al head del html.
```html
  <title>PETS</title>
  <link rel="stylesheet" href="css/home.css">
```

63. En la ruta de pets, cambie la última línea en el post por la siguiente.
```javascript
res.redirect('/');
```

64. Elimine el arreglo de pets del archivo de la ruta, ya no es necesario.

65. Finalmente cambie el javascript de home.js por el siguiente.
```javascript
const dogs = document.querySelector('.pets');

function loadSomePets() {
  fetch('/pets?page=1&limit=5')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(pet => {
        const img = document.createElement('img');
        img.src = `images/${pet.picture}`;
        
        const name = document.createElement('p');
        name.textContent = pet.name;

        const description = document.createElement('p');
        description.textContent = pet.description;

        const hr = document.createElement('hr');

        dogs.appendChild(img);
        dogs.appendChild(name);
        dogs.appendChild(description);
        dogs.appendChild(hr);
      });
    });
}

loadSomePets();
```

66. Ejecute la aplicación.

## Conclusión

Node.js no solo nos permite ejecutar código javascript en el server, si no que también nos provee de datos y archivos estáticos.
Importante también notar como desde este punto en adelante, ya se puede continuar construyendo un proyecto real, haciendo uso del server y sus recursos.
