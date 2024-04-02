const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
    res.status(200);
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "about.html"));
    res.status(200);
});

app.listen(port, () => console.log("server is running"), );