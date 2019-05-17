var sql = require('mssql');

let listaUser = [];

var config = {
    server: 'localhost',
    database: 'Prueba_Usuario',
    user: 'sa',
    password: 'Inacap123',
    port: 1433
};

var dbConn = new sql.ConnectionPool(config);
dbConn.connect(function () {

    let request = new sql.Request(dbConn);

    request.query("select * from Usuario", function (recordSet) {
        let lista = {
            users: recordSet
        }       
        listaUser.push(lista)
        console.log(listaUser);
        dbConn.close();
    }).catch(function (err) {
        console.log(err);
        dbConn.close();
    });
}).catch(function (err) {
    console.log(err);
})

module.exports = {
    listUserResponse: listaUser
}

// listaUser.forEach(function(element) {    
//     listaSessionUser.push({                                        
//       id: element.id,               
//       user: element.user,
//       pass: element.pass,
//       name: element.name,
//       surname: element.surname, 
//     })   
// })  