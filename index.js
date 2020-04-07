const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()
const port = process.env.PORT || '3001'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index', { title: 'SozoPro' })
})

const tweetRouter = require('./routes/tweet')
app.use('/tweet', tweetRouter)

// Force https in production
if (app.get('env') === 'production') {
  app.use((req, res, next) => {
    var protocol = req.get('x-forwarded-proto')
    protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url)
  })
}

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
