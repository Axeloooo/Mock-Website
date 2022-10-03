// Productos JavaScript 

btnJamonFud = document.getElementById('btnJamonFud');
btnOaxacaLaVillita = document.getElementById('btnOaxacaLaVillita');
btnManchegoNocheBuena = document.getElementById('btnManchegoNocheBuena');
btnPiernaSanRafael = document.getElementById('btnPiernaSanRafael');
btnFresaYoplait = document.getElementById('btnFresaYoplait');
btnCarrito = document.getElementById('btnCarrito');
btnComprar = document.getElementById('btnComprar');
btnBorrarTodo = document.getElementById('btnBorrarTodo');
carritoHTML = document.getElementById('carritoHTML');
totalHTML = document.getElementById('totalHTML');

const carrito = [];

function agregarAlCarrito(producto){
    fetch('../json/dataBase.json')
        .then((data) => data.json())
        .then((dataBase) => {
            let item = dataBase.find((item) => item.nombre === producto);
            carrito.push(item);
        })
}

function guardarCarrito(){
    sessionStorage.setItem("Mi Carrito", JSON.stringify(carrito));
}

function obtenerCarrito(){
    const miCarrito = JSON.parse(sessionStorage.getItem("Mi Carrito"));
    return miCarrito;
}

function verCarrito(miCarrito){
    carritoHTML.innerHTML = '';
    if(miCarrito.length > 0){
        miCarrito.forEach((item) => {
            let html = `<li class="list-group-item"><p class="">${item.nombre} $${item.precio}</p></li>`;
        carritoHTML.innerHTML += html;
        });
    }else if(miCarrito.length == 0){
        carritoHTML.innerHTML = '<li class="list-group-item"><p class="">Sin items en tu carrito.</p></li>'; 
    }
}

function borrarCarrito(){
    carritoHTML.innerHTML = '';
    carritoHTML.innerHTML = '<li class="list-group-item"><p class="">Sin items en tu carrito.</p></li>';
    totalHTML.innerHTML = '';
    totalHTML.innerHTML = '<li class="list-group-item"><p class="lead fw-bold">Total $0</p></li>';
}

function precioTotal(miCarrito){
    let total = 0;
    miCarrito.forEach((item) => {
        total += item.precio;
    });
    return total;
}

function mostrarTotal(total){
    totalHTML.innerHTML = '';
    totalHTML.innerHTML += `<li class="list-group-item"><p class="lead fw-bold">Total $${total}</p></li>`;
}

function finalizarComprar(miCarrito){
    if(miCarrito.length > 0){
        Swal.fire(
            'Todo listo!',
            'Has comprado tus items exitosamente!',
            'success'
        )
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tu carrito está vacío!',
        })
    }
}

btnComprar.onclick = () => {
    finalizarComprar(obtenerCarrito());
}

btnBorrarTodo.onclick = () => {
    if(carrito.length == 0){
        Toastify({
            text: "No hay items que elinminar en tu carrito.",
            duration: 2500
        }).showToast();
    }else if(carrito.length > 0){
        Toastify({
            text: "Todos los items de tú carrito han sido eliminados.",
            duration: 2500
        }).showToast();
    }
    borrarCarrito();
    carrito.splice(0, carrito.length);
    sessionStorage.clear();
}

btnCarrito.onclick = () => {
    guardarCarrito();
    verCarrito(obtenerCarrito());
    mostrarTotal(precioTotal(obtenerCarrito()));
}

btnJamonFud.onclick = () => {
    Toastify({
        text: "Jamón Fud ha sido agregado a tú carrito.",
        duration: 2500
    }).showToast();
    carritoHTML.innerHTML = "";
    totalHTML.innerHTML = "";
    agregarAlCarrito(btnJamonFud.value);
}

btnOaxacaLaVillita.onclick = () => {
    Toastify({
        text: "Queso Oaxaca La Villita ha sido agregado a tú carrito.",
        duration: 2500
    }).showToast();
    carritoHTML.innerHTML = "";
    totalHTML.innerHTML = "";
    agregarAlCarrito(btnOaxacaLaVillita.value);
}

btnManchegoNocheBuena.onclick = () => {
    Toastify({
        text: "Queso Manchego Noche Buena ha sido agregado a tú carrito.",
        duration: 2500
    }).showToast();
    carritoHTML.innerHTML = "";
    totalHTML.innerHTML = "";
    agregarAlCarrito(btnManchegoNocheBuena.value);
}

btnPiernaSanRafael.onclick = () => {
    Toastify({
        text: "Jamón de Pierna San Rafael ha sido agregado a tú carrito.",
        duration: 2500
    }).showToast();
    carritoHTML.innerHTML = "";
    totalHTML.innerHTML = "";
    agregarAlCarrito(btnPiernaSanRafael.value);
}

btnFresaYoplait.onclick = () => {
    Toastify({
        text: "Disfruta de Fresa Yoplait ha sido agregado a tú carrito.",
        duration: 2500
    }).showToast();
    carritoHTML.innerHTML = "";
    totalHTML.innerHTML = "";
    agregarAlCarrito(btnFresaYoplait.value);
}