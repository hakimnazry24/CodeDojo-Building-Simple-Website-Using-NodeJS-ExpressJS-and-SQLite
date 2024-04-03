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

db.run(
  "CREATE TABLE IF NOT EXISTS Person(id int primary key, name text)",
  (err) => {
    if (err) console.error(err);
    console.log("table created");
  }
);

function createPerson(id, Person) {
  db.run(`INSERT INTO Person(id, name) VALUES(?, ?)`, [id, Person], (err) => {
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

function deletePerson(id) {
  db.run(`DELETE FROM Person WHERE id = ?`, [id], (err) => {
    if (err) console.error(err);
    console.log(`Successfully delete personID: ${id}`);
  });
}

function updatePerson(id, person) {
  db.run(`UPDATE Person SET name = ? WHERE id = ?`, [person, id], (err) => {
    if (err) console.error(err);
    console.log(`Successfully update Person ID: ${id} into ${person}`);
  });
}

module.exports = { createPerson, readPersons, deletePerson, updatePerson };
