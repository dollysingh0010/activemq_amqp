var express = require('express');
var app = express();
const { Client } = require('@sap/xb-msg-amqp-v100');
var bodyParser  = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(5000,function(){
   console.log("server started") 
})

app.post("/api/writeDataamqp", function(req, res) {
    console.log("res.body is - ",req.body);
    console.log("activeMQConnect is----")
	    send(req.body).then(function(msgRes) {
		return res.send("success")
	}).catch(function(err) {
        console.log("error is--->",err)
		return res.send(err)
	})
})

function send(params) {
    return new Promise(function(resolve, reject) {
        console.log("inside send")
        activeMQConnect = new Client();
        activeMQConnect.connect();
        const data = { target: 'new', payload: new Buffer.allocUnsafe(50).fill(params)}
        const message = { payload : data.payload};
        const stream = activeMQConnect.sender("as").attach(data.target);
        var task = stream.write(message);
        stream.end();
        console.log("task----",task)
        return resolve("Success");
    })
}




