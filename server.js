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
  res.render('index.html')
})

app.use(express.static('assets'))

app.listen(port, () => {
  console.log(`App 'Projet Restaurant' started at http://localhost:${port}`)
})

