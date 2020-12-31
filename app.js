const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const expressValidator = require('express-validator')
const moment = require('moment')
const fetch = require('node-fetch')

// properties
const uri = '***REMOVED***'
const apiKey = '***REMOVED***'
const pw = '***REMOVED***'

// prepare mongodb connection
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true })
const connect = client.connect()

const app = express()

// body parsers for incoming requests
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//  express validator for form validation
app.use(expressValidator())

app.get('/public/get', urlencodedParser, (req, res) => {
  const findPublic = connect
  findPublic.then(() => {
    const db = client.db('session-log')
    const public = db.collection('public')
    public.find().toArray((err, docs) => {
      if (err) throw err
      res.json(docs)
    })
  })
    .catch(err => console.log(err))
})

app.get('/private/get', urlencodedParser, (req, res) => {
  const findPrivate = connect
  findPrivate.then(() => {
    const db = client.db('session-log')
    const private = db.collection('private')
    private.find().toArray((err, docs) => {
      if (err) throw err
      res.json(docs)
    })
  })
    .catch(err => console.log(err))
})

app.post('/private/post', jsonParser, (req, res) => {
  // apply expressValidator functions to input fields
  //req.checkBody('name', 'Name Required').notEmpty()
  req.checkBody('password', 'Password Required').notEmpty()
  const errors = req.validationErrors()

  if (errors) {
    console.log('ERRORS')
    res.status(400).send()
  }
  else {
    const password = req.body.password
    if (password === pw) {
      const time = req.body['time-picker']
      const unix = moment(time).unix()
      const spotId = (req.body.location === 'OB') ? '255' : '819'
      //const proxy  = 'https://cors-anywhere.herokuapp.com/'
      const url = `https://magicseaweed.com/api/${apiKey}/forecast/?spot_id=${spotId}`
      //const url_test = 'https://jsonplaceholder.typicode.com/posts'
      fetch(url)
        .then(res => res.json())
        .then(msw => {
          let timestamp
          for (let i = 0; i < msw.length; i++) {
            timestamp = msw[i].localTimestamp
            if (unix <= (timestamp + 3600)) {
              return msw[i]
            }
          }
        })
        .then(item => {
          const newDocument = { session: req.body, forecast: item }
          return newDocument
        })
        .then(doc => {
          const privateInsert = connect
          privateInsert.then(() => {
            const db = client.db('session-log')
            const private = db.collection('private')
            private.insertOne(doc, (err, result) => {
              if (err) throw err
            })
          })
            .catch(err => console.log(err))
        })
        .then(notify => res.status(200).send())
        .catch(err => res.status(400).send())
    }
    else {
      res.status(401).send()
    }
  }
})

app.post('/public/post', jsonParser, (req, res) => {
  // apply expressValidator functions to input fields
  //req.checkBody('name', 'Name Required').notEmpty()
  req.checkBody('name', 'Name Required').notEmpty()
  const errors = req.validationErrors()

  if (errors) {
    console.log('ERRORS')
    res.status(400).send()
  }
  else {
    const time = req.body['time-picker']
    const unix = moment(time).unix()
    console.log('\n UNIX: ' + unix)
    const spotId = (req.body.location === 'OB') ? '255' : '819'
    //const proxy  = 'https://cors-anywhere.herokuapp.com/'
    const url = `https://magicseaweed.com/api/${apiKey}/forecast/?spot_id=${spotId}`
    //const url_test = 'https://jsonplaceholder.typicode.com/posts'
    fetch(url)
      .then(res => res.json())
      .then(msw => {
        let timestamp
        for (let i = 0; i < msw.length; i++) {
          timestamp = msw[i].localTimestamp
          if (unix <= (timestamp + 3600)) {
            console.log('\n TIMESTAMP: ' + timestamp)
            return msw[i]
          }
        }
      })
      .then(item => {
        const newDocument = { session: req.body, forecast: item }
        return newDocument
      })
      .then(doc => {
        const publicInsert = connect
        publicInsert.then(() => {
          const db = client.db('session-log')
          const public = db.collection('public')
          public.insertOne(doc, (err, result) => {
            if (err) throw err
          })
        })
          .catch(err => console.log(err))
      })
      .then(notify => res.status(200).send())
      .catch(err => res.status(400).send())
  }
})

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}...`))