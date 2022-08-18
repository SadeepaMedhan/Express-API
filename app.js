const express = require('express')
const app = express()
const customer = require('./routes/customer')
const user = require('./routes/user')
const item = require('./routes/item')
const port = 4000

app.use(express.json())
app.use('/customer',customer)
app.use('/user',user)
app.use('/item',item)


app.listen(port, ()=>{
    console.log(`app listening port ${port}`);
})