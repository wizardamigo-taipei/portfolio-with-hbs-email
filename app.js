const express = require('express'),
  path = require('path'),
  hbs = require('express-handlebars'),
  bodyParser = require('body-parser')

let app = express()

//view engine setup
// App hbs template engine
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/'
  })
)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// parse incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('src'))

var routes = require('./routes/router')
app.use('/', routes)

const server = app.listen(8081, function() {
  let port = server.address().port
  console.log('Server started at http://localhost:%s', port)
})
