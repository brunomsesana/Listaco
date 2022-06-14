const express = require('express')
const app = express()
const bp = require('body-parser')
const session = require('express-session')

app.use(session({secret: 'dgndobgfgdonf'}))
app.use(bp())
app.set('view-engine', 'hbs')
app.use('/', require('./routes/pages.js'))
app.use(express.static('public'))

app.listen(3000)