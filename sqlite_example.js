document.getElementById("tasks_list_form").addEventListener("submit", ()=>{

console.log("hello");

const w = new BrowserWindow({
  webPreferences: {
  nodeIntegration: true
  }
  })

const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/taskslist.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the taskslist database.');
});

db.run(`CREATE TABLE IF NOT EXISTS taskslist.taskslist (
	task_id INTEGER PRIMARY KEY,
   	task_text TEXT NOT NULL,
	checked INTEGER DEFAULT 0,
    order INTEGER NOT NULL UNIQUE, 
    date TEXT NOT NULL,
);`);


// insert one row into the langs table
// INSERT INTO table (column1,column2 ,..) VALUES( value1,	value2 ,...);
// let sql = 'INSERT INTO taskslist(task_id, task_text, checked, order, date) VALUES(1, "hello first task", 0, 1, "05-18-2021") ' ;
// let parameters = []
let sql = 'INSERT INTO taskslist(task_id, task_text, checked, order, date) VALUES(?) ' ;
let parameters = [1, "hello first task", 0, 1, "05-18-2021"];
console.log(sql);
db.run(sql, parameters, function(err) {
    if (err) {
        return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// db.serialize(() => {
//   db.each(`SELECT PlaylistId as id,
//                   Name as name
//            FROM playlists`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.name);
//   });
// });


// query from db
sql = `SELECT * FROM taskslist
           ORDER BY order`;
db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.name);
    });
});


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});


});