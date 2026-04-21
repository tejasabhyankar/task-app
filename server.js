const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

let projects = [];

// GET projects
app.get("/projects", (req, res) => {
    res.json(projects);
});

// ADD project
app.post("/projects", (req, res) => {
    const name = req.body.name;
    if (name) {
        projects.push(name);
    }
    res.send("Added");
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    projects.splice(id, 1);
    res.send("Deleted");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});