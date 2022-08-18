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
        var userTableQuery = "CREATE TABLE IF NOT EXISTS item (id VARCHAR(255) PRIMARY KEY, description VARCHAR(255), price DOUBLE, qty DOUBLE)"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
            if(result.warningCount === 0){
                console.log("item table created");
            }
        })
    }
})

router.get('/', (req,res)=>{
    var query = "SELECT * FROM item";
    connection.query(query, (err, rows)=>{
        if(err) throw err
        res.send(rows)
    })
})

router.post('/', (req,res)=>{
    console.log(req.body);
    const id = req.body.id
    const description = req.body.description
    const price = req.body.price
    const qty = req.body.qty

    var query = "INSERT INTO item (id, description, price, qty) VALUES (?,?,?,?)";
    connection.query(query,[id,description,price,qty], (err)=>{
        if(err){
            res.send({'message' : 'duplicate entry'})
        }else{
            res.send({'message' : 'item created'})
        }
    })

})
router.put('/', (req,res)=>{
    console.log(req.body);
    const id = req.body.id
    const description = req.body.description
    const price = req.body.price
    const qty = req.body.qty

    var query = "UPDATE item SET description=?, price=? qty=? WHERE id=?";
    connection.query(query,[name,username,id], (err, row)=>{
        if(err) throw err
        if(row.affectedRows > 0){
            res.send({'message' : 'item updated'})
        }else{
            res.send({'message' : 'item not found'})
        }
    })
})

router.delete('/:id', (req,res)=>{
    const id = req.params.id
    var query = "DELETE FROM item WHERE id=?";
    connection.query(query,[id], (err, row)=>{
        if(err) throw err
        if(row.affectedRows > 0){
            res.send({'message' : 'item deleted'})
        }else{
            res.send({'message' : 'item not found'})
        }
    })
})

router.get('/:id', (req,res)=>{
    const id = req.params.id
    var query = "SELECT * FROM item WHERE id=?";
    connection.query(query,[id], (err, row)=>{
        if(err) throw err
       res.send(row)
    })
})

module.exports = router