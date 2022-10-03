// Aplicaciones JavaScript

inNombre = document.getElementById('inNombre');
inApellido = document.getElementById('inApellido');
inEmail = document.getElementById('inEmail');
inPassword = document.getElementById('inPassword');
inNacimiento = document.getElementById('inNacimiento');
inPais = document.getElementById('inPais');
inPosicion = document.getElementById('inPosicion');
inRecordarme = document.getElementById('inRecordarme');
btnSubmit = document.getElementById('btnSubmit');
btnUsuarios = document.getElementById('btnUsuarios');
btnBorrar = document.getElementById('btnBorrar');
formHTML = document.getElementById('formHTML');

const users = [];

class User {
    constructor(nombre, apellido, email, password, nacimiento, pais, posicion, recordarme){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.nacimiento = nacimiento;
        this.pais = pais;
        this.posicion = posicion;
        this.recordarme = recordarme;
    }
}

function agregarUsuario(nombre, apellido, email, password, nacimiento, pais, posicion, recordarme){
    users.push(new User(nombre, apellido, email, password, nacimiento, pais, posicion, recordarme));
}

function guardarUsuarios(){
    sessionStorage.clear();
    sessionStorage.setItem("Usuarios SS", JSON.stringify(users));
    const usuariosLS = users.filter((user) => user.recordarme === true);
    localStorage.clear();
    localStorage.setItem("Usuarios LS", JSON.stringify(usuariosLS));
}

function obtenerUsuariosSS(){
    const usuariosSession = JSON.parse(sessionStorage.getItem("Usuarios SS"));
    return usuariosSession;
}

function obtenerUsuariosLS(){
    const usuariosLocal = JSON.parse(sessionStorage.getItem("Usuarios LS"));
    return usuariosLocal;
}

function borrarTodo(){
    sessionStorage.clear();
    localStorage.clear();
    users.splice(0, users.length);
}

function seleccionarUsuarios(){
    formHTML.innerHTML = '';
    formHTML.innerHTML = '<div class="mb-5"><h3>Usuarios Guardados</h3></div><div class="mb-4"><select class="form-select" id="selectStorage"><option value="default">Selecionar tipo de usuarios guardados</option><option value="session">Guardados en la sesión</option><option value="local">Guardados en está página</option></select></div>';
    selectStorage = document.getElementById('selectStorage');
    selectStorage.onchange = () => {
        mostrarUsuarios(selectStorage.value, obtenerUsuariosSS(), obtenerUsuariosLS());
    }
}

function mostrarUsuarios(storage, usuariosSession, usuariosLocal){
    formHTML.innerHTML = '';
    if(storage == "session"){
        formHTML.innerHTML = '<div class="mb-5"><h3>Usuarios Guardados en la Sesión</h3></div>';
        usuariosSession.forEach((usuario) => {
            formHTML.innerHTML += `<div class="mb-5"><p class="lead">${usuario.nombre} ${usuario.apellido}</p></div>`;
        });
    }else if(storage == "local"){
        formHTML.innerHTML = '<div class="mb-5"><h3>Usuarios Guardados en está Página</h3></div>';
        usuariosLocal.forEach((usuario) => {
            formHTML.innerHTML += `<div class="mb-5"><p class="lead">${usuario.nombre} ${usuario.apellido}</p></div>`;
        });
    }
}

btnUsuarios.onclick = () => {
    seleccionarUsuarios();
}

btnSubmit.onclick = () => {
    agregarUsuario(inNombre.value, inApellido.value, inEmail.value, inPassword.value, inNacimiento.value, inPais.value, inPosicion.value, inRecordarme.checked);
    guardarUsuarios()
}

btnBorrar.onclick = () => {
    Toastify({
        text: "La memoria caché ha sido borrada con éxito.",
        duration: 2500
    }).showToast();
    borrarTodo();
}