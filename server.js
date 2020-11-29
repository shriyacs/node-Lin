var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var messages = [
    {name: 'Shriya', message: 'Hey'},
    {name: 'Shivani', message: 'Hey man! Wasup!'},
    {name: 'Shriya', message: 'You know what, let us meet soon!'},
    {name: 'Shivani', message: 'OMG Totally looking forward to it!'}
]

app.get('/messages', (req,res) => {
    res.send(messages)
})

app.post('/messages', (req,res) => {
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200) // 200 code - everything is ok
})

io.on('connection', (socket)=> {
    console.log('User Connected')
})

var server = http.listen(3000, () => {
    console.log('Server is listening at port: ', server.address().port)
})