/*const carro = JSON.parse(localStorage.getItem("carro")) || [];
/*
console.table(productos);*/
/*let carro = [];*/
let productos;
capturarProductosJson();
let carro = JSON.parse(localStorage.getItem('carro')) || [];
let seccionMisProds = document.getElementById('misProds');
let tablaVentana = document.getElementById('tablaVentana');
let totalAPagar = document.getElementById('total');
/*const botonVaciarCarro = document.querySelector('#vaciar_carro');*/


//si habia algo en la tabla cuando se cerro
(carro.length != 0) && capturarCompraDelStorage();

//visualizar lo que quedo en el storage cuando se cierra la pagina
function capturarCompraDelStorage(){
    for(const producto of carro){
        console.log(producto);
        document.getElementById("tablaVentana").innerHTML += `
        <tr id=${producto.id}>
            <td>${producto.objeto}</td>
            <td>${producto.nombre}</td>
            <td>$ ${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><button class="Accion" onclick="eliminar(event)">x</buton></td>
        </tr>
    `;
    
    }
    let= totalCarro = carro.reduce((acumulador, producto)=> acumulador + producto.precio,0);
    let capturaDelTotal = document.getElementById('total');
    capturaDelTotal.innerText="Total a pagar $: "+totalCarro;
    
}


//Para eliminar productos del carro luego de traerlos
function eliminar(ev){
    let fila = ev.target.parentElement.parentElement;
    let id = fila.id;
    let indice = carro.findIndex((producto) => producto.id == id);
    //remueve el producto del carro
    carro.splice(indice,1);
    console.table(carro);
    //remueve la fila de la tabla
    fila.remove();
    //recalcular el total
    let preciosAcumulados = carro.reduce((acumulador,producto)=>acumulador+producto.precio,0);
    total.innerText="Total a pagar $: "+preciosAcumulados;
    

    // Guardamos el carrito en el localStorage para tenerlo actualizado si recargamos la página porque hicimos cambios
    localStorage.setItem('carro', JSON.stringify(carro));
}




//para mostrar los productos con sus cards en la pagina principal

function renderizarProductos(productos){
    //vaciamos en contenedor para evitar duplicados
    seccionMisProds.innerHTML=``;
    //cargamos las cartas de los productos 
    for(const producto of productos){
        seccionMisProds.innerHTML+=`
            <div class="card">
                <img class="card-img-top" src=${producto.imagen} alt=${producto.nombre}>
                <div class="card-body">
                    <h4 class="card-title">${producto.objeto} ${producto.nombre}</h4>
                    <p class="card-text">$ ${producto.precio}</p>
                    <h6 class="card-text">stock: ${producto.stock}</h6>
                    <button id=${producto.id} class="btn btn-primary compra">Comprar</button>
                </div>
            </div>
        `;
    }

    // Ahora la card está en el DOM. El botón ya existe, por lo tanto lo capturo
	let botones = document.getElementsByClassName('compra');
	for(const boton of botones){
    // Agrego el evento click al botón capturado.
        boton.addEventListener('click', () => {
            const prodAlCarro = productos.find((productos) => productos.id == boton.id);
            
                
		// Si hacemos clic en el botón, se agrega al carrito
            agregarAlCarro(prodAlCarro);
              
        });
            
    }
}



function agregarAlCarro(producto){
    carro.push(producto);
    console.table(carro);
    //SWEET ALERT
    Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Cargado Al Carrito',
                showConfirmButton: false,
                timer: 1000,
      })

    tablaVentana.innerHTML += `
            <tr id=${producto.id}>
                <td>${producto.objeto}</td>
                <td>${producto.nombre}</td>
                <td>$ ${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td><button class="Accion" onclick="eliminar(event)">x</buton></td>
            </tr>
    `;
    
    
    //total
    let total= carro.reduce((acumulador,producto)=> acumulador +  producto.precio, 0);
    document.getElementById('total').innerText =`Total a pagar $:${total}`;
 
    // Guardamos el carrito en el localStorage para tenerlo actualizado si recargamos la página porque hicimos cambios
    localStorage.setItem('carro',JSON.stringify(carro));
};

//botones
//VACIAR CARRITO

let botonVaciar = document.getElementById("vaciar_carro")
    botonVaciar.addEventListener("click", respuestaClick);
    function respuestaClick(){
        tablaVentana.innerHTML = "";
        carro = [];
        total.innerHTML=`Total a pagar $: 0`;
        localStorage.setItem('carro', JSON.stringify([]));
    }
    


async function capturarProductosJson(){
    const URLJSON = 'productos.Json';
    const respuesta = await fetch(URLJSON);
    const datosObtenidos = await respuesta.json();
    //console.log(datosObtenidos);
    productos = datosObtenidos;
    renderizarProductos(productos); 
}

