var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = [];


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});


app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

app.post("/api/notes", function(req, res){
    var newNote = req.body;
  
    console.log(newNote);
    notes.push(newNote);
      res.json(true);
    
  });


  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });