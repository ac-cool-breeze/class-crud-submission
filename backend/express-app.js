const express = require('express')
const app = express()
const port = 3001
const db = require('./db')
const cors = require('cors')



// SERVER
app.listen(port, ()=>{
    console.log(`Listening, localhost:${port}`)
})


// Middleware
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))
app.use(express.json())


// Routes
app.get('/',(req,res)=>{
    console.log('/ hit')
    res.send('reached endpoint')
    res.end()
})


app.get('/allrecords', (req,res)=>{
    db.query('SELECT * FROM assets ORDER BY id ASC')
        .then( data => res.json(data.rows).status(200))
})


app.get('/allbuildinglocations', (req,res)=>{
    db.query('SELECT * FROM b_locations')
        .then( data => res.json(data.rows))
})


app.get('/needsinventory', (req,res)=>{

    //1626785198
    //1595249198
    //1563626798
    //1532090798
    // 1 year = 31556926 seconds
    db.query("SELECT * FROM assets WHERE last_inv_date < (EXTRACT(EPOCH FROM DATE_TRUNC('minutes', now()))-31556926);")
    .then( data => res.json(data.rows).status(200))
})

app.post('/addbuilding', (req,res)=>{
    db.query(`INSERT INTO b_locations (name) VALUES ('${req.body.name}');`)
})


app.post('/removebuilding', (req,res)=>{
    db.query(`DELETE FROM b_locations WHERE id = ${req.body.building_id};`)
        .then( res.status(200).send('removed'))
})


app.post('/addrecord', (req,res)=>{
    console.log(req.body)
    db.query(`INSERT INTO assets (
        name,
        inges_date,
        serial,
        last_inv_date,
        active
        ) VALUES (
            '${req.body.name}',
            EXTRACT(EPOCH FROM DATE_TRUNC('minutes', now() )),
            '${req.body.serial}',
            EXTRACT(EPOCH FROM DATE_TRUNC('minutes', now() )),
            true
         ) RETURNING ID;`)
         .then( data => {
             let assetId = data.rows[0].id
             db.query(`SELECT id FROM b_locations WHERE name = '${req.body.building_location}';`)
             .then( data2 => {
                let buildingId = data2.rows[0].id
                db.query(`INSERT INTO assets_b_locations ( assets_id, locations_id ) VALUES ( ${assetId},${buildingId});`)
             })
         })
})

app.post('/updaterecord', (req,res)=>{
    console.log(req.body)
    let column = ''
    if(req.body.name){
        column = 'name'
        newValue = req.body.name
    } else if(req.body.serial){
        column ='serial'
        newValue = req.body.serial
    }else if(req.body.last_inv_date){
        column ='last_inv_date'
        newValue = req.body.last_inv_date
    }else if(req.body.inges_date){
        column ='inges_date'
        newValue = req.body.inges_date
    }else if(req.body.active === false || true){
        db.query(`UPDATE assets SET active = ${req.body.active} WHERE id = ${req.body.id};`)
        .then( res.status(200).send('updated'))
        res.end()
    }
    db.query(`UPDATE assets SET ${column} = '${newValue}' WHERE id = ${req.body.id};`)
    .then( res.status(200).send('updated'))
    res.end()
})