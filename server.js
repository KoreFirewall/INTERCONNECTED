// ill just put a few comments for ur understanding ab
const express = require("express") // just acquiring some dependencies
const app = express() // starting the server


const path = require("path") // using this line for the pathfinding of the server.js
const http = require("http")
const {Server} = require("socket.io") // this dependency links our server to our socket io repository


const server = http.createServer(app) // creating our server in http(for local host)


const io = new Server(server)
app.use(express.static(path.resolve(""))) // path to our static folder(styling)


app.get("/", (req, res) => {
    return res.sendFile("index.html")     // ab add the html file path here e.g. index.html
})




server.listen(3000, () => {         // port forwarding
    console.log("Connected to npm") // just to confirm connection
})                                   

                                   
// start of pair up code
let frnd = []
let chat = []


io.on("Connected", (socket) =>{
    socket.on("find", (e)=>{
        if(e.name != null){
		frnd.push(e.name)
	  }
            if(frnd.length >= 2){
                let p1obj = {
                    p1pos:frnd[0]
                }


                let p2obj = {
                    p2pos:frnd[1]
                }
               
                let p2con = {
                    p1:p1obj,
                    p2:p2obj
                }


                chat.push(p2con)


                frnd.splice(0,2)


                io.emit("find", {chatMembers:chat})
            }
    })
})
// end of pair up code


