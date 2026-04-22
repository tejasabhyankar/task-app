function loadProjects() {
    fetch("/projects")
    .then(res => res.json())
    .then(data => {

        let text = "";
        for (let i = 0; i < data.length; i++) {
          text += data[i].name;
            // comment input
            text += "<br><input id='c"+i+"'>";
            text += "<button onclick='addComment("+i+")'>Add</button>";
            // show comments
            for (let j = 0; j < data[i].comments.length; j++) {
                text += "<br>- " + data[i].comments[j];
            }
             // delete button 
            text += "<br><button onclick='deleteProject(" + i + ")'>Delete</button><br><br>";
        }
            document.getElementById("list").innerHTML = text;
    });
}
// add project
function addProject() {
    let name = document.getElementById("name").value;
     fetch("/projects", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "name=" + name
    }).then(loadProjects);
}

// add comment
function addComment(i) {
    let comment = document.getElementById("c"+i).value;
    fetch("/comment/" + i, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "comment="+comment
    }).then(loadProjects);
}
// delete project
function deleteProject(i) {
    fetch("/delete/"+i, {method:"DELETE"})
    .then(loadProjects);
}
// first load
loadProjects();
