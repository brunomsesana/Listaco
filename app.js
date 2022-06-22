const express = require('express')
const app = express()
const bp = require('body-parser')
const session = require('express-session')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})

app.use(session({secret: process.env.SESSION_SECRET}))
app.use(bp())
app.set('view-engine', 'hbs')
app.use('/', require('./routes/pages.js'))
app.use(express.static('public'))

app.listen(3000)