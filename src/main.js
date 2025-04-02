const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Use this instead of electron-is-dev
const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
    console.log('Creating window...');
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        // Add these options
        frame: true,
        resizable: true,
        fullscreenable: true,
        useContentSize: true,
        // Add this to prevent bounce/scroll effects
        scrollBounce: false
    });

    const startURL = isDev 
        ? 'http://localhost:3000' 
        : `file://${path.join(__dirname, '../build/index.html')}`;
    
    console.log('Loading URL:', startURL);
    
    mainWindow.loadURL(startURL);

    // Force disable scrolling immediately after content loads
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.executeJavaScript(`
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.position = 'fixed';
            document.body.style.position = 'fixed';
            document.body.style.width = '100vw';
            document.body.style.height = '100vh';
            document.documentElement.style.width = '100vw';
            document.documentElement.style.height = '100vh';
        `);
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    console.log('App is ready, creating window...');
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

// Add this IPC handler
ipcMain.handle('process-audio-file', async (event, filePath) => {
    try {
        const { PythonShell } = require('python-shell');
        
        let options = {
            mode: 'json',
            pythonPath: 'python',
            scriptPath: path.join(__dirname, '../python'),
            args: [filePath]
        };

        return new Promise((resolve, reject) => {
            PythonShell.run('process_audio.py', options, function (err, results) {
                if (err) {
                    console.error('Python script error:', err);
                    reject(err);
                }
                
                const result = results ? results[results.length - 1] : null;
                
                if (!result || result.status === 'error') {
                    reject(new Error(result?.error || 'Processing failed'));
                    return;
                }
                
                resolve({
                    status: 'success',
                    result: {
                        data: {
                            file_path: result.data.output_path, // Use the transcript file path
                            transcript: result.data.transcript,
                            speakers: result.data.speakers
                        }
                    },
                    file: {
                        path: result.data.output_path, // Use the transcript file path
                        duration: 0
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error processing audio:', error);
        throw error;
    }
});

