// const { app, BrowserWindow } = require('electron')
const {
  app,
  BrowserWindow,
  ipcMain,
  tray,
  Menu,
  MenuItem,
} = require('electron')
const {
  P2P
} = require('./services/p2p')

const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  ipcMain.handle('ping', () => 'pong')
  //win.loadURL(`file://${ __dirname}/index.html`)
  win.loadFile(
    path.join(__dirname, 'index.html')
  )
  //win.loadFile('index.html')

  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'Electron',
    submenu: [{
      role: 'dev-tools',
      accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+i',
//      accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
      click: () => {
        win.webContents.openDevTools()
        console.log('Electron rocks!')
      }
    }]
  }))
  Menu.setApplicationMenu(menu)

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


