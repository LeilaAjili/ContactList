const express = require('express')
const assert = require ('assert')
const {MongoClient, ObjectID} = require ('mongodb')

const app = express()
app.use(express.json())


const mongoURI = "mongodb+srv://leila:password9@cluster0-zqxba.mongodb.net/test?retryWrites=true&w=majority"
const dbase = "contactList"

MongoClient.connect(mongoURI,{useUnifiedTopology: true}, (err, client)=>{
    assert.equal(err, null, 'connection failed')
    const db = client.db(dbase)

    //APP.POST
    app.post('/addContact', (req, res)=>{
        let newContact = req.body
        db.collection('contacts').insertOne(newContact, (err, data)=>
        err? console.log("cant add contact"): res.send(newContact))
    })

    //APP.GET
    app.get('/contacts', (req, res)=>{
        db.collection('contacts').find().toArray((err, data)=>{
            err? console.log("cant get contacts") : res.send(data)
        })
    })

    //APP.DELETE
    app.delete('/deleteContact/:id',(req, res)=>{
        db.collection('contacts').findOneAndDelete(
            {_id: ObjectID(req.params.id) }, (err, data)=>{
            err ? console.log("cant delete contact") : res.send("ok")
        })
    })

    //APP.PUT
    app.put('/editContact/:id', (req, res)=>{
        console.log(ObjectID(req.params.id))
        db.collection('contacts').findOneAndUpdate(
            {_id:ObjectID(req.params.id)},
            {$set : req.body},
            (err,data)=>{
                err ? console.log("cant update contact"):res.send("contact updated")
            }
        )
    })
})

app.listen(8080, (err)=>
{console.log('LIVE AT 8080..')
})
