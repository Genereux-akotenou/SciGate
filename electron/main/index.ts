import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'

// -----------------------------------------------------------------
// Var setup
// -----------------------------------------------------------------
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '../..')
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST
// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()
// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// -----------------------------------------------------------------
// Import Service
// -----------------------------------------------------------------
const AppStorage = require('../../service/AppStorage.cjs');
const SSHManager = require('../../service/SSHManager.cjs');
let sshManager = new SSHManager();

// -----------------------------------------------------------------
// App Render
// -----------------------------------------------------------------
let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')
async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
    },
    width: 1200,
    height: 800
  })
  // Open devTool if the app is not packaged
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }
  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })
  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

// -----------------------------------------------------------------
// App state
// -----------------------------------------------------------------
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})
app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})
app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// -----------------------------------------------------------------
// New window example arg: new windows url
// -----------------------------------------------------------------
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1200,
    height: 800
  })
  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } 
  else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

// -----------------------------------------------------------------
// Handle IPC requests
// -----------------------------------------------------------------
ipcMain.handle('add-server', async (event, server) => {
  try {
    const serverId = await AppStorage.addServer(server);
    return { success: true, serverId };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
ipcMain.handle('fetch-server', async (event, server) => {
  try {
    const serverId = await AppStorage.getAllServers(server);
    return { success: true, serverId };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
// ipcMain.handle('get-ssh-manager', async (event, server) => {
//   try {
//     const sshManager = new SSHManager();
//     return { success: true, obj: sshManager };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// });
ipcMain.handle('ssh-connect', async (event, config) => {
  try {
    await sshManager.connect(config);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('ssh-disconnect', async () => {
  try {
    sshManager.disconnect();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('ssh-execute-command', async (event, command) => {
  try {
    const result = await sshManager.executeCommand(command);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});