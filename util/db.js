const { error } = require("console");
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(
  "sample.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) console.error(err);
    console.log("conneected to database");
  }
);

db.run("CREATE TABLE IF NOT EXISTS Person(name text)", (err) => {
  if (err) console.error(err);
  console.log("table created");
});


function createPerson(Person) {
    db.run(`INSERT INTO Person(name) VALUES(?)`, [Person], (err) => {
        if (err) console.error(err);
        console.log(`${Person} is successfully added!`);
    });
}

function readPersons(callback) {
    db.all(`SELECT * FROM Person`, [], (err, rows) => {
        if (err) throw err;
        callback(rows);
    });
}

module.exports = {createPerson, readPersons};


