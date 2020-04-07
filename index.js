const express = require('express')
const router = express.Router()
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const Twit = require('twit')
const client = new Twit({
  consumer_key: 'YKROgK9sAHpO0cWgukYbza1rl',
  consumer_secret: 'PnUfmtBfjIQUW76ODq3DjESz7fYmw7kTcPvAsPJAgCSt6UV3yX',
  access_token: '1137103960500609024-vaT8SzBbXT0XgyvObtH5F9YRwVnZ54',
  access_token_secret: '1S25Lh3ABWpVUgOGtL6F1Q7jZ5IDPXpWBLRJdz59w6ycn'
})

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


app.get('/auth', (req, res) => {
  client.get('account/verify_credentials')
    .then(user => res.send(user))
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})

app.post('/new', (req, res) => {
  client.post('statuses/update', { status: `${req.body.status}` }, (err, data, response) => {
    err ? console.log(err) : res.send('Tweeted!')
  })
})

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
