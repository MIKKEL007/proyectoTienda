document.addEventListener("DOMContentLoaded", function () {

    loadCategories()
    document.getElementById("generar-reporte-compras").addEventListener("click", generarReporteCompras);
    document.getElementById("generar-reporte-ventas").addEventListener("click", generarReporteVentas);
    document.getElementById("generar-reporte-productos").addEventListener("click", generarReporteProductos);
});

function generarReporteCompras() {
    const fechaInicio = document.getElementById("fecha-inicio-compras").value;
    const fechaFin = document.getElementById("fecha-fin-compras").value;

    if (!fechaInicio || !fechaFin) {
        Swal.fire("Error", "Debe seleccionar un rango de fechas", "error");
        return;
    }

    window.open(`../Php/reporte_compras.php?inicio=${fechaInicio}&fin=${fechaFin}`, "_blank");
}

function generarReporteVentas() {
    const fechaInicio = document.getElementById("fecha-inicio-ventas").value;
    const fechaFin = document.getElementById("fecha-fin-ventas").value;

    if (!fechaInicio || !fechaFin) {
        Swal.fire("Error", "Debe seleccionar un rango de fechas", "error");
        return;
    }

    window.open(`../Php/reporte_ventas.php?inicio=${fechaInicio}&fin=${fechaFin}`, "_blank");
}

function generarReporteProductos() {
    const categoria = document.getElementById("categoriaS").value;
    window.open(`../Php/reporte_productos.php?categoria=${categoria}`, "_blank");
}


// // Función para cargar categorías en el formulario de productos
function loadCategories() {
    fetch('../Php/categorias.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('categoriaS');
            select.innerHTML = ''; // Limpiar antes de cargar

            const option = document.createElement('option');
            option.value = "TODOS";
            option.textContent = 'TODOS';
            select.appendChild(option);

            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar categorías',
                text: error.message
            });
        });
}