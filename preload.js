const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    isElectron: true,
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    removeListener: (channel, callback) => {
        ipcRenderer.removeListener(channel, callback);
    },
    toggleFullScreen: () => {
        ipcRenderer.send('toggle-fullscreen');
    },
    processAudioFile: (filePath) => ipcRenderer.invoke('process-audio-file', filePath)
});
