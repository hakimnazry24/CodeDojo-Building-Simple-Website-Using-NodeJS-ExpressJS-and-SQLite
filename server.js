const express = require("express");
const path = require("path");
const db = require("./util/db");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
    res.status(200);
    
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "about.html"));
    res.status(200);
});

app.get("/add-john", (req, res) => {
    db.createPerson("James");
    res.status(200);
    res.redirect("/");
})

app.get("/read-persons", (req, res) => {
    const persons = db.readPersons((persons) => {
        console.log(JSON.stringify(persons));
    });
    res.redirect("/")
});

app.get("/persons", (req, res) => {
    db.readPersons(persons => {
        res.render("persons", {persons: persons});
    });
});

app.listen(port, () => console.log("server is running"), );