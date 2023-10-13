const { app, BrowserWindow, ipcMain } = require('electron')
const sqlite3 = require('sqlite3');
const path = require('path')
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize()
dbFilePath = './public/loantracker.db';
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1400,
    height: 1000,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// TODO erorr handling
ipcMain.on('insert-new-client', (_, data) => {
  const db = new sqlite3.Database(dbFilePath);
  db.run(data.query, data.values, function(err) {
    if (err) {
      console.log("error", err);
    } else {
      console.log("success");
    }
  })
  db.close();
});

// TODO error handling 
ipcMain.handle('get-all', async (event, data) => {
  return new Promise( (resolve, reject) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(data.query, [], (err, rows) => {
      db.close();
      resolve(rows)
    });
  })
})

// TODO error handling
/* ex: 
data: {
  query: "DELETE FROM [tableName] WHERE [columnName] = ?"
  value: id 
}
*/
ipcMain.handle('delete', async (event, data) => {
  return new Promise ((resolve, reject) => {
    const db = new sqlite3.Database(dbFilePath);
    db.run(data.query, [data.value], function(err) {
      if (err) {
        return reject(new Error(err.message))
      }
      resolve({message: `Rows deleted: ${this.changes}`})
    })
  })
})

ipcMain.handle('update-client-info-by-id', async(event, data) => {
  console.log("calling update-client-info")
  return new Promise((resolve,reject) => {
    const db = new  sqlite3.Database(dbFilePath);
    db.run(data.query, data.values, function(err){
      if (err) {
        console.log("err:", err)
        return reject(err)
      }
      resolve({message: `Rows updated: ${this.changes}`})
      db.close()
    })
  })
})

ipcMain.handle('id-exist', async(event, data) => {
  console.log("calling id-exist")
  return new Promise((resolve,reject) => {
    const db = new  sqlite3.Database(dbFilePath);
    db.get(data.query, data.values, function(err, row){
      if (err) {
        console.log("err:", err)
        reject(err)
      }
      if (row.id_exist === 1) {
        resolve(true)
        return
      }
      resolve(false)
    })
  })
})