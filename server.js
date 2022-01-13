const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const port = 8888

nunjucks.configure('html', {
  autoescape: true,
  express: app,
  watch: true
});

app.set('view engine', 'html')

app.get('/', (req, res) => {
  res.render('accueil.html')
})

app.get('/boissons', (req, res) => {
  res.render('boissons.html')
})

app.get('/plats', (req, res) => {
  res.render('plats.html')
})

app.get('/contact', (req, res) => {
  res.render('contact.html')
})

app.get('/reservation', (req, res) => {
  res.render('reservation.html')
})

app.use(express.static('assets'))

app.listen(port, () => {
  console.log(`App 'Projet Restaurant' started at http://localhost:${port}`)
})

