var showAlertMessage = function (type, message) {
    var divAlert = document.getElementById("divAlertMessage");
    divAlert.innerHTML = `<div class="alert alert-${type} alert-dismissible fade in">` +
        `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>` +
        `${message}</div>`;
    divAlert.style.display = 'block';
};

