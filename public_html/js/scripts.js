/**
 * Lista de la compra (sin persistencia)
 * @author Alejandro Marín Gómez
 */

var VentanaTablaProductos = ''; // Referencia la ventana que tiene la tabla de los productos.
var VentanaAnyadirProducto = ''; // Referencia la ventana para anadir productos.

var Productos = new Array(); // Array principal del listado de productos.
// Requisito -> Array bidimensional (listado de productos con campos para mostrar en una tabla).
var ProductosTabla = new Array();

/*
 * Objeto de producto
 * @param {String} Nombre - Nombre del producto.
 * @param {Number} Unidades - Unidades a comprar del producto.
 * @param {Number} Precio - Precio unitario del producto.
 * @param {String} Supermercado - Nombre del supermercado.
 * @param {String} Notas - Notas aportadas por el usuario.
 * @return {Producto}
 */
// Requisito -> Objeto definido por el usuario
function Producto(Nombre, Unidades, Precio, Supermercado, Notas) {
    this.Nombre = Nombre;
    this.Unidades = Unidades;
    this.Precio = Precio;
    this.Supermercado = (Supermercado ? Supermercado : '(Sin indicar)');
    this.Notas = (Notas ? Notas : '(Sin información adicional)');
    this.Total = function() {
        return parseInt(this.Unidades) * parseFloat(this.Precio);
    };
}

/**
 * Añade un producto al array de productos, guarda su posición y añade un array con las columnas
 * de la fila del producto en el array de productos para mostrar en la tabla.
 * Por último, devuelve la posición anteriormente guardada.
 * @param {Producto} Producto - Objeto producto
 * @return {Number} - Posición en la que se encuentra el objeto
 */
// Requisito -> Función
function AnyadirProducto_Arrays(Producto) {
    let Posicion = Productos.push(Producto) - 1;
    // Requisito -> Añadimos un array en otro array (array bidimensional).
    ProductosTabla.push(new Array(
        Producto.Nombre,
        Producto.Supermercado,
        Producto.Unidades,
        Producto.Precio,
        Producto.Total(),
    ));
    return Posicion;
}

/**
 * Esta función se encarga de eliminar del array de productos, y del array de la tabla de productos
 * el producto que se encuentre en la posición que se pasa por parámetro.
 * @param {Number} Posicion - Posición del producto en ambos arrays.
 * @return {void}
 */

function EliminarProducto_Arrays(Posicion) {
    Productos.splice(Posicion, 1);
    ProductosTabla.splice(Posicion, 1);
}

/**
 * Comprueba si existen o no productos, en caso de que no existiera ninguno, muestra el mensaje
 * de que no hay productos y oculta el footer (con identificador "principal"), si existen
 * suma el total de todos los productos en la variable "SumaProductos" mientras recorre cada producto,
 * también comprueba si está posicionado el primero o segundo (para abrir o cerrar la fila) comprobando si
 * i + 1 es par o impar, de esta forma sólo hay dos productos por fila, en caso de ser el último
 * producto se cerraría la fila. Por último, en caso de existir productos y haberlos concatenado
 * en la variable "HTML" y también en la variable para el mensaje de WhatsApp, mostramos
 * el footer con el identificador (con identificador "principal"), imprimimos la suma total
 * de la lista de la compra, damos valor al atributo "href" del enlace con el mensaje por parámetro
 * para compartir el listado por WhatsApp.
 * @return {void}
 */

function ActualizarPagina_HTML() {
    let HTML = '';
    if(Productos.length > 0) {
        let MensajeWhatsApp = "Lista de productos a comprar:" + "\n" + "\n";
        let SumaProductos = 0;
        // Requisito -> Bucle
        for(let i = 1; i <= Productos.length; i++) {
            let Producto = Productos[i - 1];
            SumaProductos += parseFloat(Producto.Total());
            // Mensaje de WhatsApp
            MensajeWhatsApp += "---" + "\n"
            + "Producto: " + Producto.Nombre + "\n"
            + "Unidades: " + Producto.Unidades + "\n"
            + "Notas: " + Producto.Notas + "\n"
            + "Supermercado: " + Producto.Supermercado + "\n"
            + "Total del producto: " + Producto.Total() + "\n";
            // HTML
            if(i % 2 !== 0) HTML += '<div class="row mx-0">';
            HTML += '<div class="col-12 col-lg-6 p-4">'
            + '<article>'
            + '<header class="row">'
            + '<h3 class="col titulo mt-4 mx-4 pb-3"><i class="fa fa-circle"></i> ' + Producto.Nombre + '</h3>'
            + '</header>'
            + '<section class="row m-3">'
            + '<div class="col-12 col-lg-6">'
            + '<h4><i class="fa fa-tag"></i> <span class="font-weight-bold unidades">5</span> unidades.</h4>'
            + '<h2 class="my-4 mb-lg-0 pt-2" style="border-top: 2px solid #fff;"><i class="fa fa-money"></i> Precio: <span class="font-weight-bold precio">' + Producto.Total() + ' €</span></h2>'
            + '</div>'
            + '<div class="col-12 col-lg-6">'
            + '<p class="nota p-3" style="background-color: #fff;"><i class="fa fa-sticky-note"></i> <b>Nota:</b> <span><i>' + Producto.Notas + '</i></span></p>'
            + '</div>'
            + '</section>'
            + '<footer class="row py-3 mx-0">'
            + '<div class="col-12 col-lg-6">'
            + '<h5 class="my-2"><i class="fa fa-shopping-cart"></i> Supermercado: <span class="font-weight-bold supermercado">' + Producto.Supermercado + '</span></h5>'
            + '</div>'
            + '<div class="d-print-none col-12 col-lg-6 text-center text-lg-right">'
            + '<button class="btn btn-danger my-2 my-lg-0" onclick="EliminarProducto(' + (i - 1)  + ');"><i class="fa fa-trash"></i> Eliminar producto</button>'
            + '</div>'
            + '</footer>'
            + '</article>'
            + '</div>';
            if(i % 2 === 0 || i === Productos.length) HTML += '</div>';
        }
        document.getElementById("principal").style.display = "block";
        document.getElementById("total").innerHTML = SumaProductos + " €";
        MensajeWhatsApp += "\n" + "---" + "\n"
        + "Total de la compra: " + SumaProductos + " €";
        document.getElementById("boton_whatsapp").href = "https://api.whatsapp.com/send?text=" + encodeURI(MensajeWhatsApp);
    } else {
        HTML = '<div class="row mx-0">'
        + '<div class="col p-4">'
        + '<h3 class="animated zoomIn text-center"><i class="fa fa-list"></i> Su lista actualmente está vacía :(</h3>'
        + '</div>'
        + '</div>';
        document.getElementById("principal").style.display = "none";
    }
    document.getElementById("listado").innerHTML = HTML;
}

/**
 * Esta función se encarga de abrir la ventana para añadir los productos,
 * fijamos un ancho y calculamos el margen izquierdo para que aparezca centrada en la pantalla
 * y el tamaño de alto dejamos el que tiene la pantalla.
 * @return {void}
 */

function MostrarVentanaAnyadirProducto() {
    let Ancho = 700;
    // Requisito -> Screen
    let Left = (screen.availWidth - Ancho) / 2;
    VentanaAnyadirProducto = window.open("anyadir_producto.html", "Añadir un producto", "top=0,left=" + Left + ",width=" + Ancho + ",height=" + screen.availHeight); // Requisito -> Creación de ventana secundaria con comunicación entre ellas.
}

/**
 * Esta es la función llamada desde el formulario que permite añadir productos,
 * se crea un objeto tipo "Producto" indicando sus propiedades, y se le pasa por parámetro a
 * la función encargada de añadirlo a ambos arrays y se obtiene la posición en la que se encuentra
 * en los arrays (coincide en ambos ya que añade el producto al final), después se llama a la
 * función que actualiza el estado de la página principal.
 * En caso de que la ventana de la tabla estuviera abierta (se comprueba mediante la función a la que le pasamos
 * el objeto de la ventana por parámetro), se actualiza la tabla. Y por último devolvemos la posición
 * del producto en los arrays, que habíamos almacenado.
 * @param {String} Nombre - Nombre del producto.
 * @param {Number} Unidades - Unidades a comprar del producto.
 * @param {Number} Precio - Precio unitario del producto.
 * @param {String} Supermercado - Nombre del supermercado.
 * @param {String} Notas - Notas aportadas por el usuario.
 * @return {Number} - Posición en los arrays (tanto el principal de productos como el de la tabla).
 */

function AnyadirProducto(Nombre, Unidades, Precio, Supermercado, Notas) {
    let ObjetoProducto = new Producto(
        Nombre,
        Unidades,
        Precio,
        Supermercado,
        Notas,
    );
    let Posicion = AnyadirProducto_Arrays(ObjetoProducto);
    ActualizarPagina_HTML();
    if(VentanaAbierta(VentanaTablaProductos)) ActualizarVentanaTabla();
    return Posicion;
}

/**
 * Primero pide confirmación de eliminación del objeto en los arrays. Una vez confirmado
 * pasa por parámetro la posición del objeto en los arrays a la función que elimina el objeto en ambos arrays.
 * Actualizamos el estado de la página HTML y en caso de que la ventana que muestra la tabla
 * de productos (lo comprueba una función), llamamos a la función encargada de actualizar
 * la tabla de la ventana.
 * @param {Number} Posicion - Posición del objeto producto en los arrays.
 * @return {void}
 */

function EliminarProducto(Posicion) {
    if(confirm("¿Está seguro de que desea eliminar el producto?")) {
        EliminarProducto_Arrays(Posicion);
        ActualizarPagina_HTML();
        if(VentanaAbierta(VentanaTablaProductos)) ActualizarVentanaTabla();
    }
}

/**
 * Esta función se encarga de generar el contenido que irá dentro del body de la ventana que muestra
 * la tabla. En caso de que hubieran productos en el array bidimensional de productos para la tabla
 * crea la tabla, la cabecera y en el body comienza un bucle por cada fila y después otro bucle para cada elemento del array de esa fila
 * y la última columna (el total) la suma a la variable. Por último mostramos ese total de la compra.
 * @return {String} - Devuelve el contenido que va dentro del body de la ventana que muestra la tabla.
 */

function GenerarContenidoVentanaTabla() {
    let ContenidoVentana = '<p class="m-3"><i class="fa fa-exclamation-circle"></i> Su lista actualmente se encuentra vacía :(</p>';
    if(ProductosTabla.length > 0) {
        ContenidoVentana = '<table class="table table-striped">'
        + '<thead>'
        + '<tr>'
        + '<th>Nombre</th>'
        + '<th>Supermercado</th>'
        + '<th>Unidades</th>'
        + '<th>Precio (€)</th>'
        + '<th>Total (€)</th>'
        + '<tr>'
        + '</thead>'
        + '<tbody>';
        let SumarTotalLista = 0;
        for(let i = 0; i < ProductosTabla.length; i++) {
            ContenidoVentana += '<tr>';
            for(let x = 0; x < ProductosTabla[i].length; x++) {
                ContenidoVentana += '<td>' + ProductosTabla[i][x] + '</td>';
                if(x === (ProductosTabla[i].length - 1)) SumarTotalLista += parseFloat(ProductosTabla[i][x]);
            }
            ContenidoVentana += '</tr>';
        }
        ContenidoVentana += '</tbody>'
        + '<tfoot>'
        + '<th colspan="4"></th>'
        + '<th>' + SumarTotalLista + '</th>'
        + '<tfoot>'
        + '</table>';
    }
    return ContenidoVentana;
}

function MostrarVentanaTabla() {
    let MargenRespectoMonitor = 250;
    let NuevoAlto = screen.availHeight - MargenRespectoMonitor * 2;
    let NuevoAncho = screen.availWidth - MargenRespectoMonitor * 2;
    VentanaTablaProductos = window.open("", "Lista de productos", "top=" + MargenRespectoMonitor + ",left=" + MargenRespectoMonitor + ",width=" + NuevoAncho + ",height=" + NuevoAlto);
    let ContenidoVentana = '<!DOCTYPE html>'
    + '<html lang="es">'
    + '<head>'
    + '<meta charset="utf-8">'
    + '<link href="css/bootstrap.min.css" rel="stylesheet">'
    + '<link href="css/font-awesome.min.css" rel="stylesheet">'
    + '</head>'
    + '<body>'
    + '<main></main>'
    + '</body>'
    + '</html>';
    VentanaTablaProductos.document.write(ContenidoVentana);
    ActualizarVentanaTabla();
}

function VentanaAbierta(Ventana) {
    return (!Ventana.closed && Ventana !== '' ? true : false);
}

/**
 * Esta función se encarga de actualizar el contenido de la ventana que contiene la tabla,
 * almacena en una variable la tabla generada por otra función y sustituye el contenido de la
 * etiqueta "main" por la tabla actualizada.
 * @returns {void}
 */

function ActualizarVentanaTabla() {
    let ContenidoVentana = GenerarContenidoVentanaTabla();
    VentanaTablaProductos.document.getElementsByTagName("main")[0].innerHTML = ContenidoVentana;
}

/**
 * En esta función indicaremos que navegadores son o no compatibles con nuestra aplicación,
 * como podemos comprobar, sólo hemos permitido el acceso a Firefox, obtenemos la cadena userAgent del navegador
 * y comprobamos si contienen los nombres de los navegadores, en caso de Firefox permitiremos el acceso.
 * @return {Boolean} - ¿Es compatible el navegador?
 */

function NavegadorCompatible() {
    let Compatible = false;
    // Requisito -> Navigator
    var InformacionNavegador = navigator.userAgent.toLowerCase();
    if(InformacionNavegador.indexOf("edge") >= 0) {
        Compatible = false;
    } else if((InformacionNavegador.indexOf("opera") || InformacionNavegador.indexOf('opr')) >= 0) {
        Compatible = false;
    } else if(InformacionNavegador.indexOf("chrome") >= 0) {
        Compatible = false;
    } else if(InformacionNavegador.indexOf("safari") >= 0) {
        Compatible = false;
    } else if(InformacionNavegador.indexOf("firefox") >= 0) {
        Compatible = true;
    }
    return Compatible;
}

/*
 * Funcion principal encargada de comprobar si es soportado por nuestra aplicación el navegador
 * del cliente. En caso de que sí, ejecutamos la función encargada de controlar la página.
 * En caso de que no, mostraremos un mensaje recomendando el uso de Firefox.
 */

function IniciarPrograma() {
    if(NavegadorCompatible()) {
        ActualizarPagina_HTML();
    } else {
        document.getElementsByTagName("body")[0].innerHTML = '<p class="m-3">Lo sentimos, esta aplicación actualmente no es compatible con tu navegador, te recomendamos que utilices: <b>Mozilla Firefox</b>.</p>';
    }
}

// Ejecutamos la función principal una vez ha cargado el documento.

window.onload = IniciarPrograma;
