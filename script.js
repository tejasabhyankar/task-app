function loadProjects() {
    fetch("/projects")
    .then(res => res.json())
    .then(data => {
        let text = "";

        for (let i = 0; i < data.length; i++) {
            text += data[i] + 
            " <button onclick='deleteProject(" + i + ")'>Delete</button><br>";
        }

        document.getElementById("list").innerHTML = text;
    });
}

function addProject() {
    let name = document.getElementById("name").value;

    fetch("/projects", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: "name=" + name
    }).then(() => loadProjects());
}

function deleteProject(i) {
    fetch("/delete/" + i, { method: "DELETE" })
    .then(() => loadProjects());
}

loadProjects();