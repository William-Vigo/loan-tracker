const betterSqlite3 = require('better-sqlite3');
const dbFilePath = 'loantracker.db';
const fs = require('fs')

console.log("inside init")
console.log(dbFilePath)
if (!fs.existsSync(dbFilePath)) {
    const db = new betterSqlite3(dbFilePath)
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Clients (
            _id TEXT PRIMARY KEY,
            fullName TEXT,
            documentType TEXT,
            documentID TEXT UNIQUE,
            address TEXT,
            email TEXT,
            cellNumber TEXT
        )
    `;

    db.exec(createTableQuery);
    db.close();

    console.log('Clients table created');
} else {
    console.log('Database file already exists, skipping');
}
