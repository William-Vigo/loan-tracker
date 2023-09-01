const sqlite3 = require('sqlite3');
const dbFilePath = './public/loantracker.db';
const fs = require('fs')

console.log("inside init")
console.log(dbFilePath)
if (!fs.existsSync(dbFilePath)) {
    const db = new sqlite3.Database(dbFilePath)
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Clients (
            _id TEXT PRIMARY KEY NOT NULL,
            fullName TEXT,
            documentType TEXT,
            documentID TEXT UNIQUE,
            address TEXT,
            email TEXT,
            cellNumber TEXT
        )
    `;

    db.run(createTableQuery);
    db.close();

    console.log('Clients table created');
} else {
    console.log('Database file already exists, skipping');
}
