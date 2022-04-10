const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { route } = require('./routes/auth')
const pool = require('./db')
const app = express()


app.use(express.json())
app.use(cors())


//login and register
app.use('/', require('./routes/auth'))
    //home
app.use('/home', require('./routes/home'))

app.listen(process.env.PORT, () => console.log('server running on port http://localhost:3000'))