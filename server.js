var express = require('express')
var app = express()

app.use(express.static(__dirname))

var messages = [
    {name: 'Shriya', message: 'Hey'},
    {name: 'Shivani', message: 'Hey man! Wasup!'},
    {name: 'Shriya', message: 'You know what, let us meet soon!'},
    {name: 'Shivani', message: 'OMG Totally looking forward to it!'}
]

app.get('/messages', (req,res) => {
    res.send(messages)
})

var server = app.listen(3000, () => {
    console.log('Server is listening at port: ', server.address().port)
})