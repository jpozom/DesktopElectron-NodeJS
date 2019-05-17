const electron = require('electron')
const { ipcRenderer } = electron

ipcRenderer.on('list:dataUser', (event, data) => {

    const nameNav = document.querySelector('#nameNav')
    const roleNav = document.querySelector('#roleNav')
    const nameBar = document.querySelector('#nameBar')

    nameNav.innerText = data[0].nameComplete
    roleNav.innerText = data[0].descripcion
    nameBar.innerText = data[0].nameComplete

})

const btnLogOut = document.querySelector('.btnLogOut')
const btnAdminUser = document.querySelector('.btnAdminUser')

btnLogOut.addEventListener("click", (e) => {
    ipcRenderer.send('entry-logOut', 'ping')
})

btnAdminUser.addEventListener("click", (e) => {
    ipcRenderer.send('entry-adminuser', 'entry')
})