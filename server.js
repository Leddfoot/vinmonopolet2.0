const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path')




const fetchVinmonopoletfilePath = path.join(__dirname, '/src/components/fetchVinmonopolet.js')
const fetchVinmonopolet = require(fetchVinmonopoletfilePath)

const fetchHomeStorePath = path.join(__dirname, '/src/components/fetchHomeStore.js')
const fetchHomeStore = require(fetchHomeStorePath)

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);


/////////////temporary test below, good code further below/////////////////
/////////////temporary test below, good code further below/////////////////
/////////////temporary test below, good code further below/////////////////

//////////////you are here//////
//////////////I think that you will have to mack a new url like below, app.get('/homestore//////
/////////but also you will need a new fetchVinmonopolet?
//////////////you are here//////


app.get('/homestore', (req, res) => {
  if (!req.query.id) {
      return res.send({
          error: 'You must provide an id in the query! IE: localhost:3000/vinmonopolet?id=blabla. (in the future Marty)'
      })
  }

  const searchTerm = req.query.id

  fetchHomeStore(searchTerm, (error, storeData) => {
    if (error) {
        return res.send({ error })
    }

      res.send({
          storeData: storeData,          
          storeID: req.query.id,//note this is the query field in the browser, whatever is typed after ?id=blabla inthe browser
          
      })
  })

})
/////////////temporary test above, good code further below/////////////////
/////////////temporary test above, good code further below/////////////////
/////////////temporary test above, good code further below/////////////////




//////////working copy belowapp.get('/vinmonopolet'
//////////working copy below
app.get('/vinmonopolet', (req, res) => {
  if (!req.query.city) {
      return res.send({
          error: 'You must provide a city in the query! IE: localhost:3000/vinmonopolet?city=blabla. (in the future Marty)'
      })
  }

  const searchTerm = req.query.city

  // vinmonopolet(searchTerm, (error, storeData) => {
  //     if (error) {
  //         return res.send({ error })
  //     }
  fetchVinmonopolet(searchTerm, (error, storeData) => {
    if (error) {
        return res.send({ error })
    }

      res.send({
          storeData: storeData,          
          cityFromBrowserQuery: req.query.city//note this is the query field in the browser, whatever is typed after ?address=blabla inthe browser
      })
  })

})

//////////working copy above app.get('/vinmonopolet'
//////////working copy above app.get('/vinmonopolet'
//////////working copy above app.get('/vinmonopolet'



////////////////////////////////////////////////////////////////////////
// app.get('/fetchvinmonopolet', (req, res) => {
//   if (!req.query.city) {
//       return res.send({
//           error: 'You must provide a city in the query! IE: localhost:3000/fetchVinmonopolet?city=blabla. (in the future Marty)'
//       })
//   }

//   const searchTerm = req.query.city

//   fetchVinmonopolet(searchTerm, (error, storeData) => {
//       if (error) {
//           return res.send({ error })
//       }

//       res.send({
//           storeData: storeData,          
//           cityFromBrowserQuery: req.query.city//note this is the query field in the browser, whatever is typed after ?address=blabla inthe browser
//       })
//   })

// })
////////////////////////////////////////////////////////////////////////

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Server is up on port 3000.\n');
})