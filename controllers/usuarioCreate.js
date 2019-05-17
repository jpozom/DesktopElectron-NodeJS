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
            if (txtUsername != "" || txtPassword != "" || txtNombre != "" || cmbRol > 0) {
                req.query("INSERT INTO Usuario VALUES ('" + txtUsername + "', '" + EncryptPass(txtPassword) + "','" + txtNombre + "', " + cmbRol + ", '" + userSession + "', CONVERT(datetime, '" + formatedDateTime + "'), null, null)", (err, r, fields) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        if (r.rowsAffected > 0) {
                            alert('datos guardados')
                        }
                    }

                    conn.close();
                })
            } else {
                showAlertMessage(
                    'info',
                    'Ingrese los Datos Solicitados'
                );
            }
        })
    } catch (e) {

        console.log(e)
    }
}

function EncryptPass(txtPassword) {
    var passencrypt = sha256(txtPassword)
    return passencrypt;
}

const btnGuardar = document.querySelector('#btnGuardar')
btnGuardar.addEventListener("click", (e) => {
    userCreate()
});