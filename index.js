require('dotenv').config();
const connect = require('./DB/Connection.js')
const express = require('express')
const cors = require('cors');
const URL = require('./Schemas/Url.js')
const app = express()
const port = process.env.PORT || 3003
const UserRouter = require('./Routes/UserRoutes.js')
const UrlRoutes = require('./Routes/UrlRoutes.js')

connect()





app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users',UserRouter)
app.use('/urlshortner',UrlRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})