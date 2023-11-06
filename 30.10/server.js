const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.static('static'))
app.use(express.static('static/cwiczenia'))

const PORT = "3000"


app.post("/pliki", function (req, res) {
    res.header("content-type", "application/json")
    fs.readdir(__dirname + "/static/cwiczenia", function (err, files) {
        if (err) {
            return console.log(err);
        }
        // const data = files
        res.send(JSON.stringify(files, null, 5))
    });
})



app.get("/", function (req, res) {
    res.sendFile("/static/index.html")
})

app.listen(PORT, function () {
    console.log("Serwer dziala na porcie ", + PORT)
})