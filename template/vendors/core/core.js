var showAlertMessage = function (type, message) {
    var divAlert = document.getElementById("divAlertMessage");
    divAlert.innerHTML = `<div class="alert alert-${type} alert-dismissible fade in">` +
        `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>` +
        `${message}</div>`;
    divAlert.style.display = 'block';
};

var showMessageDialog = function (type, title, message) {
    BootstrapDialog.show({
        type: type,
        title: 'F22 - ' + title,
        message: message,
        buttons: [{
            label: 'Aceptar',
            cssClass: 'btn-success',
            action: function (dialog) {
                dialog.close();
            }
        }]
    });
    
};

var showValidationMessage = function (type, message) {
    var divAlert = document.getElementById("divValidationMessage");
    divAlert.innerHTML = `<div>` +
       
        `${message}</div>`;
    divAlert.style.display = 'block';
};

var showMessageDialogRedirect = function (type, title, message, url) {
    BootstrapDialog.show({
        type: type,
        title: 'F22 - ' + title,
        message: message,
        buttons: [{
            label: 'Aceptar',
            cssClass: 'btn-success',
            action: function (dialog) {

                dialog.close();
                document.location.href = url;                
            }            
        }]
    });       
    
    $(document).keypress(function (event) {
        $('.modal').find('.btn-success').focus();
    }); 
};

