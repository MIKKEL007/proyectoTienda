$(document).ready(function() {
    cargarCategorias();
    cargarProductos();

    $("#buscador").on("input", function() {
        filtrarProductos();
    });
});

function cargarCategorias() {
    $.ajax({
        url: "Php/categorias.php",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#categoria");
            select.append(`<option value="">Todas</option>`);
            data.forEach(categoria => {
                select.append(`<option value="${categoria.nombre}">${categoria.nombre}</option>`);
            });
        }
    });
}

function cargarProductos() {
    $.ajax({
        url: "Php/productos.php",
        type: "GET",
        dataType: "json",
        success: function(data) {
            mostrarProductos(data);
        }
    });
}

function mostrarProductos(productos) {
    let tbody = $("#tabla_productos");
    tbody.empty();
    productos.forEach(producto => {
        tbody.append(`
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.categoria_nombre}</td>
                <td>${producto.stock}</td>
            </tr>
        `);
    });
}

function filtrarProductos() {
    let busqueda = $("#buscador").val().toLowerCase();
    $.ajax({
        url: "Php/productos.php",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let productosFiltrados = data.filter(producto =>
                producto.nombre.toLowerCase().startsWith(busqueda)
            );
            mostrarProductos(productosFiltrados);
        }
    });
}

function filtrarPorCategoria() {
    let categoriaSeleccionada = $("#categoria").val();
    $.ajax({
        url: "Php/productos.php",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let productosFiltrados = data.filter(producto =>
                categoriaSeleccionada === "" || producto.categoria_nombre === categoriaSeleccionada
            );
            mostrarProductos(productosFiltrados);
        }
    });
}

