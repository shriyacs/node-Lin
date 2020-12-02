var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose') //userpassword

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var dbUrl = 'mongodb+srv://user:userpassword@node-lin.mnmxa.mongodb.net/test'
var dbURL = 'mongodb+srv://user:userpassword@node-lin.mnmxa.mongodb.net/nodeTempBase?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
    name: 'string',
    message: 'string'
})

var messages = [
    {name: 'Shriya', message: 'Hey'},
    {name: 'Shivani', message: 'Hey man! Wasup!'},
    {name: 'Shriya', message: 'You know what, let us meet soon!'},
    {name: 'Shivani', message: 'OMG Totally looking forward to it!'}
]

app.get('/messages', (req,res) => {
    Message.find({}, (err,messages)=>{
        res.send(messages)
    })
})

app.post('/messages', (req,res) => {
    var message = new Message(req.body)
    message.save((err)=> {
        if(err)
            sendStatus(500)
        messages.push(req.body)
        io.emit('message', req.body)
        res.sendStatus(200) // 200 code - everything is ok
    })
})

io.on('connection', (socket)=> {
    console.log('User Connected')
})

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true } ,(err)=> {
    console.log('mongo db connection successful. err =', err)
})

var server = http.listen(3000, () => {
    console.log('Server is listening at port: ', server.address().port)
})