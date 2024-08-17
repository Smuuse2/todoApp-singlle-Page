const express = require('express')
const app = express();
const PORT = 5000

const apiRoutes = require('./Routes')

const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.json())
app.use(cors())

app.use('/api', apiRoutes)



app.listen(PORT, ()=>{
    console.log('SERVER IS RUNING', PORT)
})