const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send('get user')
})

router.post('/', (req,res)=>{
    res.send('post user')
})
router.put('/', (req,res)=>{
    res.send('put user')
})

router.delete('/:id', (req,res)=>{
    res.send('delete user')
})

router.get('/:id', (req,res)=>{
    res.send('get user by id')
})

module.exports = router