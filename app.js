const express = require('express')
const app = express()

app.set('view-engine', 'hbs')
app.use('/', require('./routes/pages.js'))
app.use(express.static('public'))

app.listen(3000)