const electron = require('electron')
const { ipcRenderer } = electron
var $ = require('jquery');
var sql = require('mssql');
const sha256 = require('js-sha256').sha256;

var config = {
    server: 'localhost',
    database: 'Prueba_Usuario',
    user: 'sa',
    password: 'Inacap123',
    port: 1433
};

function userCreate() {
    try {
        debugger;
        var conn = new sql.ConnectionPool(config);
        console.log(conn);

        let userSession = process.env.username || process.env.user;
        const txtUsername = document.querySelector('#txtUsername').value
        const txtPassword = document.querySelector('#txtPassword').value
        const txtNombre = document.querySelector('#txtNombre').value
        const cmbRol = document.querySelector('#cmbRol').value
        var date = new Date();
        var formatedMysqlString = (new Date((new Date((new Date(new Date())).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace('T', ' ');
        var formatedDateTime = formatedMysqlString + '.' + ('000' + date.getUTCMilliseconds()).slice(-3);

        var req = new sql.Request(conn);
                
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return;
            }                       
            var validarCampos = validaSeleccion();
            if (validarCampos.insertar) {
                req.query("INSERT INTO Usuario VALUES ('" + txtUsername + "', '" + EncryptPass(txtPassword) + "','" + txtNombre + "', " + cmbRol + ", '" + userSession + "', CONVERT(datetime, '" + formatedDateTime + "'), null, null)", (err, r, fields) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        if (r.rowsAffected > 0) {
                            showMessageDialog(BootstrapDialog.TYPE_INFO,
                                'INFO',
                                'Datos Guardados Correctamente');                         
                        }
                    }

                    conn.close();
                })
            } else {
                showMessageDialog(BootstrapDialog.TYPE_ERROR,
                    'Error',
                    validarCampos.mensaje);
            }
        })
    } catch (e) {

        console.log(e)
    }
}

function EncryptPass(txtPassword) {
    try {
        var passencrypt = sha256(txtPassword)
    } catch (e) {

        console.log(e)
    }
    return passencrypt;
}

const btnGuardar = document.querySelector('#btnGuardar')
btnGuardar.addEventListener("click", (e) => {    
    userCreate()
    e.preventDefault()    
});

//eventos
$(".control").on('change', function (event) {
    debugger;
    const txtUsername = document.querySelector('#txtUsername').value
    const txtPassword = document.querySelector('#txtPassword').value
    const txtNombre = document.querySelector('#txtNombre').value
    const cmbRol = document.querySelector('#cmbRol').value
    var  regularExpression = /^[A-Z]+$/i

    if (txtUsername != '') {        
        $("#txtUsername").addClass("dataComplete");      
    }else{
        $("#txtUsername").removeClass("dataComplete");   
        $("#txtUsername").addClass("dataRequired");
    } 
    if (txtPassword != ''){        
        $("#txtPassword").addClass("dataComplete");
    }else{
        $("#txtPassword").removeClass("dataComplete");   
        $("#txtPassword").addClass("dataRequired");
    }
    if (txtNombre != ''){
        $("#txtNombre").addClass("dataComplete");
    }else{
        $("#txtNombre").removeClass("dataComplete");   
        $("#txtNombre").addClass("dataRequired");
    }
    if (cmbRol != 0){
        $("#cmbRol").addClass("dataComplete");
    }else{
        $("#cmbRol").removeClass("dataComplete");   
        $("#cmbRol").addClass("dataRequired");
    }
    if (!regularExpression.test(txtNombre) && txtNombre != ''){ 
        
        showMessageDialog(BootstrapDialog.TYPE_ERROR,
            'Error',
            'El campo Nombre no es válido.');            
    }
});

function validaSeleccion() {
    mensajeError = '';
    var sw = true;
    const txtUsername = document.querySelector('#txtUsername').value
    const txtPassword = document.querySelector('#txtPassword').value
    const txtNombre = document.querySelector('#txtNombre').value
    const cmbRol = document.querySelector('#cmbRol').value

    if (txtUsername == '' || txtPassword == '' || txtNombre == '' || cmbRol == 0) {
        $("#txtUsername").addClass("dataRequired");
        $("#txtPassword").addClass("dataRequired");
        $("#txtNombre").addClass("dataRequired");
        $("#cmbRol").addClass("dataRequired");
        mensajeError = 'Todos los campos son Obligatorios'
        sw = false;
    } 
    return {
        'insertar': sw,
        'mensaje': mensajeError
    };
}

