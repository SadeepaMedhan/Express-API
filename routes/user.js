const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const db = require('../configs/db.configs')

const connection = mysql.createConnection(db.database)
connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log("connected to the mysql"); 
        var userTableQuery = "CREATE TABLE IF NOT EXISTS users (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), username VARCHAR(255))"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
            if(result.warningCount === 0){
                console.log("user table created");
            }
        })
    }
})

router.get('/', (req,res)=>{
    var query = "SELECT * FROM users";
    connection.query(query, (err, rows)=>{
        if(err) throw err
        res.send(rows)
    })
})

router.post('/', (req,res)=>{
    console.log(req.body);
    const id = req.body.id
    const name = req.body.name
    const username = req.body.username

    var query = "INSERT INTO users (id, name, username) VALUES (?,?,?)";
    connection.query(query,[id,name,username], (err)=>{
        if(err){
            res.send({'message' : 'duplicate entry'})
        }else{
            res.send({'message' : 'user created'})
        }
    })

})
router.put('/', (req,res)=>{
    console.log(req.body);
    res.send('put user')
})

router.delete('/:id', (req,res)=>{
    console.log(req.params.id);
    res.send('delete user')
})

router.get('/:id', (req,res)=>{
    console.log(req.params.id);
    res.send('get user by id')
})

module.exports = router