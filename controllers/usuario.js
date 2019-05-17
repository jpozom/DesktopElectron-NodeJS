const electron = require('electron')
const { ipcRenderer } = electron
var sql = require('mssql');
var $ = require('jquery');

var config = {
    server: 'localhost',
    database: 'Prueba_Usuario',
    user: 'sa',
    password: 'Inacap123',
    port: 1433
};

getListausuario()

function getListausuario() {

    try {        
        var conn = new sql.ConnectionPool(config);
        console.log(conn);

        var req = new sql.Request(conn);

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return;
            }
            req.query("SELECT * FROM Usuario", (err, recordset, fields) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    if (recordset.rowsAffected != 0) {
                        var datos = recordset.recordset
                        var arrayJson = JSON.parse(JSON.stringify(datos));

                        var tableBodySeccion = $('#datatable-buttons tbody');
                        tableBodySeccion.html('');
                        var tableBodyDataSeccion = '';

                        $(arrayJson).each(function (index, item) {                            

                            tableBodyDataSeccion += `<tr>` +
                                `<td class="id">` + item.Id + `</td>` +
                                `<td class="user">` + item.Username + `</td>` +
                                `<td class="name">` + item.NombreCompleto + `</td>` +
                                `</tr>`;
                        })
                        tableBodySeccion.html(tableBodyDataSeccion);
                    }
                }

                conn.close();
            })
        })
    } catch (e) {

        console.log(e)
    }
}

const btnCreate = document.querySelector('#btnCreate')
btnCreate.addEventListener("click", (e) => {
    ipcRenderer.send('userCreate', 'click')
});
