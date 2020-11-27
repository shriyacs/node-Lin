var express = require('express')
var bodyParser = require('body-parser')
var app = express()

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
    res.sendStatus(200) // 200 code - everything is ok
})

var server = app.listen(3000, () => {
    console.log('Server is listening at port: ', server.address().port)
})