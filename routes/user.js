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
    }
})

router.get('/', (req,res)=>{
    res.send('get user')
})

router.post('/', (req,res)=>{
    console.log(req.body);
    res.send('post user')
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