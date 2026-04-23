const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));

let projects = [];

// GET projects
app.get("/projects", (req,res) => {
    res.json(projects);
});

// ADD project
app.post("/projects", (req,res) => {
    const name = req.body.name;

    if (name) {
        projects.push({ name:name, comments:[]}); 
    }
     res.send("Added");
});

// ADD COMMENT
app.post("/comment/:id", (req,res) => {
    const id = req.params.id;
    const comment = req.body.comment;

    if (projects[id] && comment) {
        projects[id].comments.push(comment);
    }
     res.send("Comment Added");
});

// DELETE project
app.delete("/delete/:id", (req,res) => {
    const id = req.params.id;
    projects.splice(id, 1);
    res.send("Deleted");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
