const { contextBridge, ipcRenderer } = require('electron');
// Expose insertData method to the renderer process
contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => ipcRenderer.send(channel, data) ,
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    invoke: (channel, data) => {
        return ipcRenderer.invoke(channel, data);
    }
})