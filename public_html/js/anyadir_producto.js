var PaginaPrincipal = window.opener;
var Formulario = document.FormularioProducto;

/**
 * Esta función es llamada cuando cambia el contenido del campo en el que indicamos
 * las unidades y el precio unitario. Se encarga de actualizar el campo de sólo lectura
 * que muestra el precio total.
 * @returns {void}
 */

function ActualizarTotal() {
    let Unidades = Formulario.Unidades.value;
    let Precio = Formulario.Precio.value;
    let Total = 0;
    if(parseInt(Unidades) > 0 && parseFloat(Precio) >= 0) {
        Total = parseInt(Unidades) * parseFloat(Precio);
    }
    Formulario.Total.value = Total;
}

/**
 * Esta función se ejecuta cuando guardamos el producto, verifica que la información
 * introducida es válida, en caso de que no coloca el foco en el campo y en caso necesario
 * se introduce un valor en el campo. En caso de que los valores sean correctos, manda a la función
 * que añade el producto (en la ventana que ha abierto ésta ventana secundaria) por parámetros los valores
 * introducidos del producto por el usuario. En caso de recibir una posición igual o superior a cero
 * significa que ha sido añadido correctamente, en caso contrario mostraríamos una mensaje de error.
 * En caso de que fuera bien, preguntamos si se desea añadir otro producto, en caso de que sí,
 * reseteamos los campos del formulario y fijamos el foco en el campo del nombre. En caso contrario cerramos
 * el formulario.
 * @return {undefined}
 */

function GuardarProducto() {
    let Nombre = Formulario.Nombre;
    let Unidades = Formulario.Unidades;
    let Precio = Formulario.Precio;
    let Supermercado = Formulario.Supermercado;
    let Notas = Formulario.Notas;
    if(!Nombre.value) {
        alert("Por favor, introduzca el nombre del producto.");
        Nombre.focus();
    } else if (!Unidades.value) {
        alert("Por favor, introduzca las unidades del producto que desea comprar.");
        Unidades.focus();
    } else if (parseInt(Unidades.value) <= 0 || isNaN(Unidades.value)) {
        alert("Las unidades del producto debe ser un número entero superior a 0.");
        Unidades.value = 1;
        Unidades.focus();
    } else if (!Precio.value) {
        alert("Por favor, introduzca el precio del producto.");
        Precio.focus();
    } else if (parseFloat(Precio.value) < 0 || isNaN(Precio.value)) {
        alert("El precio del producto debe ser un número positivo.");
        Precio.value = 0;
        Precio.focus();
    } else {
        // Requisito -> Comunicación de la ventana principal con ventanas secundarias.
        let Posicion = PaginaPrincipal.AnyadirProducto(Nombre.value, Unidades.value, Precio.value, Supermercado.value, Notas.value);
        if(Posicion >= 0) {
            alert("El producto ha sido añadido a la lista correctamente.");
            if(confirm("¿Desea añadir otro producto?")) {
                Formulario.reset();
                Nombre.focus();
            } else {
                this.close();
            }
        } else {
            alert("Lo sentimos, hemos tenido un fallo interno.");
        }
    }
}
