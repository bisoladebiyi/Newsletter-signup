const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req,res) {
    const firstName = req.body.FirstName
    const lastName = req.body.LastName
    const email = req.body.Email
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
       
        ]
        
    }
    const jsonData = JSON.stringify(data)

    const url = "https://us1.api.mailchimp.com/3.0/lists/58d3145912"
    const option = {
        method: "POST",
        auth: "bibi:c04f05160b6ef94af7e40ec6313646ec-us1"
    }
    const request = https.request(url, option, function(response) {
        response.on("data", function(data){
            console.log(response.statusCode)
            if(response.statusCode==200) {
                res.sendFile(__dirname+"/success.html")
            }
            else {
                res.sendFile(__dirname + "/failure.html")
            }
           
        })
    })
    request.write(jsonData)
    request.end()
})

app.listen(3000, function(){
    console.log("Server running on port 3000")
})


// 58d3145912
// c04f05160b6ef94af7e40ec6313646ec-us1