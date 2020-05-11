var mongoose = require('mongoose')
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const path = require('path')
const logger = require('morgan')
const express = require('express')

mongoose.Promise = global.Promise

const url = 'mongodb://localhost:27017/accounts'

mongoose.connect(url)

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorHandler())
app.use(bodyParser.urlencoded({ extended: true }));

const Account = mongoose.model('Account', {
    name: String,
    balance: Number
})

app.get('/accounts', (req, res) => {
    Account.find((error,accounts) => {
        if(error) return res.status(500).send(error)
        res.status(200).send(accounts)
    })
})

app.post('/accounts', (req, res) => {
    let account = new Account({
        name: req.body.name,
        balance: req.body.balance
    })
    account.save((error) => {
        if (error) return res.status(500).send(error)
    })
    res.status(201).send({id: account._id})
})

app.put('/accounts/:id', (req, res) => {
    var condition = {_id: req.params.id}
    console.log(condition)
    var option = {multi: false}
    Account.update(condition, req.body, option, (error,account) => {
        if (error) return res.status(500).send(error)
        res.status(203).send(account)
    })
})

app.delete('/accounts/:id', (req, res) => {
    var condition = {_id: req.params.id}
    Account.remove(condition, (error,results) => {
        if(error) return res.status(500).send(error)
        res.status(204).send()
    })
})
app.listen(3000)