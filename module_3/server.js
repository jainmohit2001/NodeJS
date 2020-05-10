const mongodb = require('mongodb')
const async = require('async')
const bodyParser = require('body-parser')
const express = require('express')
const errorHandler = require('errorhandler')
const path = require('path')

const address = require(path.join(__dirname,'m3-customer-address-data.json'))
const customers = require(path.join(__dirname,'m3-customer-data.json'))

const url = 'mongodb://localhost:27017'
const dbName = 'edx-module-3'
const collectionName = 'customers'

const chunk = process.argv[2] ? parseInt(process.argv[2],10) : customers.length

mongodb.MongoClient.connect(url, (error, client) => {
    if(error) return process.exit(1)
    console.log("successfully connected to mongodb")
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const tasks = []

    for( let i=0; i<customers.length; i+= chunk){
        const start = i
        const end = i+chunk;
        const slicedCustomers = customers.slice(start,end).map((customer,idx) => Object.assign(customer, address[idx]))

        const task = (callback) =>{
            console.log(`Processing ${slicedCustomers.length} customer(s).`)
            collection.insertMany(slicedCustomers,(error, docs) => {
                if (error) console.error(error)
                callback(error,docs)
            })
        }
        tasks.push(task)
    }

    console.log(`Starting migration... Got ${tasks.length} task(s)`)
    async.parallel(tasks,(error,results) => {
        if(error) return process.exit(1)
        console.log('Migration finished. CLosing connection to mongodb')
        client.close()
    })

})