$(function(){
    document.addEventListener("devicerady".function(){
    $('#cBtn').tap(function(){
        var nom = $('#cName').val();
        var ema = $('#cMail').val();
        var tel = $('#cTel').val();
        // alert(nom+' '+ema+' '+tel);
        if(nom!='' && ema!='' && tel!='')
            alert(nom+' '+ema+' '+tel);
            
    })
    $('#btnListar').tap(function(){
        listarContactos();
    });
},false);
});

function listarContactos(){
    function onSuccess(contacts) {
        $('#lista').html('');
    for(i=0;i<contacts.length;i++){
        $('<li class="forward"><a href="tel:'+contacts[i].phoneNumbers[0].value+' ">'+contacts[i].name.fomatted+'</a></li>').appendTo('#lista')
    }
};

function onError(contactError) {
    alert('onError!');
};

var options      = new ContactFindOptions();
options.filter   = "";
options.multiple = true;
var fields       = ["*"];
navigator.contacts.find(fields, onSuccess, onError, options);
}

function crearContacto(nom,ema,tel){
    //Creamos Contacto
     var myContact = navigator.contacts.create();
    //Asignarle un nombre para mostrar
    myContact.displayname = nom;  //Asegura compatibilidad con iOS y android
    myContact.nickname = nom; //Asegura compatibilidad con iOS y android
    //Asignar nombre del Contacto
    var nombre = new ContactName();
    nombre.givenName = nom;
    myContact.name = nombre;
    
    //Asignar email del Contacto
    var email = [];
    email[0] = new ContactField("home",ema,true);
    email[1] = new ContactField("work","pisd@email.com",false);
    myContact.emails = email;
    
    //Asignar teléfono del Contacto
    var telefono = [];
    telefono[0] = new ContactField("home",tel,false);
    telefono[1] = new ContactField("work","123-4324",true);
    myContact.phoneNumbers = telefono;
    
    //Guardar Contacto
    myContact.save(function(){
        $('#cName').val('');
        $('#cMail').val('');
        $('#cTel').val('');
        navigator.notification.alert("Contacto Creado",function(){
            window.location.href="#home";
        },"Felicidades", "Aceptar");
    }, function(err){
        alert(err.code);
    });
}