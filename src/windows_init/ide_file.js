const { BrowserWindow, ipcMain } = require('electron');
const electronLocalshortcut = require('electron-localshortcut');
const path = require('path');

const ideFileWindow = (filePath) => {
    const ideFileWin = new BrowserWindow({
        width: 1100,
        height: 900,

        show: false,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    ideFileWin.setMenu(null);

    ideFileWin.loadFile(path.join(__dirname, '../windows/ide_file.html'));

    electronLocalshortcut.register(ideFileWin, "Ctrl+R", () => {
        ideFileWin.webContents.send("reload");
    });

    electronLocalshortcut.register(ideFileWin, "Ctrl+S", () => {
        ideFileWin.webContents.send("save_file");
    });

    require('@electron/remote/main').enable(ideFileWin.webContents);

    ipcMain.on("request_file_path", (event, arg) => {
        if (ideFileWin.isDestroyed()) return;
        
        ideFileWin.webContents.send("file_path", filePath);
    });

    //ideFileWin.webContents.openDevTools();
};

module.exports = ideFileWindow;