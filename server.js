var express = require("express");
var path = require("path");
const fs = require('fs');

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

app.get("/notes/:id", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function (req, res) {
    return res.json(notes);
});
app.get("/api/notes/:id", function (req, res) {
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    fs.writeFile('database.json', JSON.stringify(notes), 'utf8', function (err) {
        if (err) throw err;
        console.log('complete');
    }
    );
    res.json(true);

});
app.post("/api/notes/:id", function (req, res) {
    console.log('delete executing');
    var deleteid=req._eventsCount;
    console.log(deleteid);
    if(deleteid>=1){
   notes.splice(deleteid,1);
    }
    else{
        notes.slice(0,0);
    }
   var finalNote=notes;
    fs.writeFile('database.json', JSON.stringify(finalNote), 'utf8', function (err) {
        if (err) throw err;
        console.log('delete complete')
       
    }
    );

    res.json(true);
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});