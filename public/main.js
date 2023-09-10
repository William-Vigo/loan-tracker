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

// Todo erorr handling
ipcMain.on('insert-new-client', (_, data) => {
  console.log(data)
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

// Todo error handling 
ipcMain.handle('get-all', async (event, data) => {
  return new Promise( (resolve, reject) => {
    const db = new sqlite3.Database(dbFilePath);
    db.all(data.query, [], (err, rows) => {
      db.close();
      resolve(rows)
    });
  })
})