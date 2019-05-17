const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = electron
const path = require('path')
const url = require('url')


if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

let mainWindow
let WinUsuario
let UsuarioCreate
//let username = process.env. || process.env.user;
//console.log(username)

function createWindows() {
    //ventana Principal   
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        //fullscreen: true,    
        show: false,
        width: 1800,
        height: 900,
        title: 'Home'
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/home.html'),
        protocol: 'file',
        slashes: true
    }))

    const MainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(MainMenu)

    mainWindow.on('closed', () => {
        app.quit()
    });

    let child
    child = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        show: false,
        parent: mainWindow,
        maxWidth: 1000,
        maxHeight: 1000,
        title: 'Login'
    })

    //child.setMenu(null);
    child.once('ready-to-show', () => {
        child.show()
    })
    child.loadURL(url.format({
        pathname: path.join(__dirname, 'views/login.html'),
        protocol: 'file',
        slashes: true
    }))

    child.on('closed', () => {
        app.quit()
    });

    ipcMain.on('entry-accepted', (event, arg) => {
        if (arg == 'ping') {
            mainWindow.show()
            child.hide()
        }
    })

    ipcMain.on('entry-logOut', (event, arg) => {
        if (arg == 'ping') {
            mainWindow.hide()
            child.show()
        }
    })
}

//evento que escucha el click y valida la creacion de la nueva ventana
ipcMain.on('entry-adminuser', (event, arg) => {
    if (arg == 'entry') {
        userIndex()
    }
})

//creacion ventana Administarcion de Usuarios URL"Index"
function userIndex() {
    WinUsuario = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        parent: mainWindow,
        width: 1000,
        height: 300,
        title: 'Administración Usuario'
    })

    //WinUsuario.setMenu(null);       
    WinUsuario.loadURL(url.format({
        pathname: path.join(__dirname, 'views/usuario.html'),
        protocol: 'file',
        slashes: true
    }))

    WinUsuario.on('closed', () => {
        WinUsuario = null
    })
}

//evento que escucha el click y valida la creacion de la nueva ventana
ipcMain.on('userCreate', (event, arg) => {
    if (arg == 'click') {
        userCreate()        
    }
})

//creacion ventana Administarcion de Usuarios URL"Create"
function userCreate() {
    UsuarioCreate = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        parent: WinUsuario,
        width: 1000,
        height: 600,
        title: 'Usuario Create'
    })

    //WinUsuario.setMenu(null);       
    UsuarioCreate.loadURL(url.format({
        pathname: path.join(__dirname, 'views/usuarioCreate.html'),
        protocol: 'file',
        slashes: true
    }))

    UsuarioCreate.on('closed', () => {
        UsuarioCreate = null
    })
}

ipcMain.on('data:session', (event, data) => {    
    mainWindow.webContents.send('list:dataUser', data)
})

//inicio a la app 
app.on('ready', createWindows)

const templateMenu = [{
    label: 'File',
    submenu: [{
        label: 'Exit',
        accelerator: 'Ctrl+Q',
        click() {
            app.quit()
        }
    }]
}]

if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [{
                label: 'Show/Hide Dev Tools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}
