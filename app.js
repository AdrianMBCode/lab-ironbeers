const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {

  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      let beer = {
        beers: beersFromApi
      }
      res.render('beers', beer);
      
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromApi => {
      let randomBeer = {
        randomBeer: responseFromApi
    }
    res.render('random-beer', randomBeer);
  })
  .catch(error => console.log(error));
});
app.get('/beers/:id', (req, res) => {
  let beerId = req.params.id;
  punkAPI
  .getBeer(beerId)
  .then(beer => {
    res.render('partials/beerpartials', beer[0]);
  });
});

  
     

app.listen(3000, () => console.log('🏃‍ on port 3000'));
