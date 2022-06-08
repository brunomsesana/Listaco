const express = require('express')
const app = express()

app.use('/', require('./routes/pages.js'))

app.listen(3000)