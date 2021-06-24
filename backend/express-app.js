const express = require('express')
const app = express()
const port = 3001

app.listen(port, ()=>{
    console.log(`Listening, localhost:${port}`)
})

// Middleware


// Routes
app.get('/',(req,res)=>{
    console.log('/ hit')
    res.send('reached endpoint')
    res.end()
})