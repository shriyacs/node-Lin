var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose') //userpassword

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.Promise = Promise
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
    message.save()
    .then(()=> {
        console.log('saved')
        return Message.findOne({message: 'badword'})
    })
    .then(censored => {
        if(censored) {
            console.log('censored words found', censored)
            return Message.remove({_id: censored.id})
        }
        io.emit('message', req.body)
        res.sendStatus(200) // 200 code - everything is ok
    })
    .catch((err)=>{
        res.sendStatus(500)
        return console.error(err)
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