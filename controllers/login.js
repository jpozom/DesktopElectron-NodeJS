const electron = require('electron')
const { ipcRenderer } = electron
var sql = require('mssql');
const sha256 = require('js-sha256').sha256;

let listaUser = []

let config = {
  server: 'localhost',
  database: 'Prueba_Usuario',
  user: 'sa',
  password: 'Inacap123',
  port: 1433
}

function getUsuarios() {
  var conn = new sql.ConnectionPool(config);
  console.log(conn);

  var req = new sql.Request(conn);
  const user = document.querySelector('#txtUser').value
  const pass = document.querySelector('#txtPass').value
  //debugger;
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    if (user !== "" && pass !== "") {
      req.query("SELECT * FROM Usuario INNER JOIN Rol ON Usuario.IdRol = Rol.Id where Username = '" + user + "' and Password = '" + EncryptPass(pass) + "'", function (err, recordset) {
        if (err) {
          console.log(err);
          return;
        } else {
          //console.log(recordset);
          if (recordset.rowsAffected != 0) {
            if (recordset.recordset[0].Username && recordset.recordset[0].Password) {
              ipcRenderer.send('entry-accepted', 'ping')
              listaUser.push({
                id: recordset.recordset[0].Id,
                user: recordset.recordset[0].Username,
                nameComplete: recordset.recordset[0].NombreCompleto,
                idRol: recordset.recordset[0].IdRol,
                descripcion: recordset.recordset[0].Descripcion
              })
              console.log(listaUser);
              ipcRenderer.send('data:session', listaUser)
            }
          } else {
            showAlertMessage(
              'info',
              'Usuario y/o Contraseña Incorrectos'
            );
          }
        }
        conn.close();
      })
    } else {
      showAlertMessage(
        'info',
        'Enter the requested data'
      );
    };
  });
}

const btnSave = document.querySelector('#btnSave')
btnSave.addEventListener("click", (e) => {
  getUsuarios();
  e.preventDefault()
});

function EncryptPass(pass) {
  var passencrypt = sha256(pass)
  return passencrypt;
}

// function getUsuariobyRol(id) {
//   let listaDescripcion = new Array()

//   var conn = new sql.ConnectionPool(config);
//   console.log(conn);

//   var req = new sql.Request(conn);
//   const user = document.querySelector('#txtUser').value
//   const pass = document.querySelector('#txtPass').value

//   conn.connect(function (err) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     if (user !== "" && pass !== "") {
//       req.query("SELECT Descripcion FROM Rol INNER JOIN Usuario ON Rol.Id = Usuario.IdRol where Usuario.Id = '" + id + "'", function (err, recordset) {
//         if (err) {
//           console.log(err);
//           return;
//         } else {

//           if (recordset.rowsAffected != 0) {
//             //set1.add(recordset.recordset[0].Descripcion)
//             listaDescripcion.push({descripcion: recordset.recordset[0].Descripcion})
//           }
//         }
//         conn.close();
//       })
//     }
//   });
//   return listaDescripcion
// }