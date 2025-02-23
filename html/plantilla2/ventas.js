


// Función para agregar una venta
document.getElementById('add-sale-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const producto_id = parseInt(document.getElementById('venta-producto').value);
    const precio_id = parseInt(document.getElementById('venta-precio').value);
    const cantidad = parseFloat(document.getElementById('venta-cantidad').value);
    const fecha = document.getElementById('venta-fecha').value;

    const data = { producto_id,precio_id, cantidad,fecha };
   console.log(data);
    
    
    fetch('ventas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getVentas();  // Recargar la lista de ventas
    });
});

// Función para obtener y mostrar ventas
function getVentas() {
    fetch('ventas.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#ventas-table tbody");
            tableBody.innerHTML = "";
            data.forEach(venta => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${venta.id}</td>
                    <td>${venta.producto}</td>
                    <td>${venta.precio_venta}</td>
                    <td>${venta.cantidad}</td>
                `;
                tableBody.appendChild(row);
            });
        });
}

// Cargar productos en el formulario de ventas   
function loadProductsForSales() {
    fetch('productos.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('venta-producto');
            data.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = producto.nombre;
                select.appendChild(option);
            });
        });
}

// Cargar precios cuando se seleccione un producto
function loadPricesForProduct() {
    const productoId = document.getElementById('venta-producto').value;
    const selectPrecios = document.getElementById('venta-precio');

    if (!productoId) {
        selectPrecios.innerHTML = '<option value="">Selecciona un precio</option>';
        return;
    }

    fetch(`precios.php?producto_id=${productoId}`)
        .then(response => response.json())
        .then(data => {
            selectPrecios.innerHTML = '<option value="">Selecciona un precio</option>';
            data.forEach(precio => {
                
                const option = document.createElement('option');
                option.value = precio.precio_id;
                option.textContent = `${precio.concepto} - $${precio.valor}`;
                selectPrecios.appendChild(option);
            });
        });
}

// Función para establecer la fecha actual por defecto
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
    document.getElementById('venta-fecha').value = today;
}

// Inicializar la página cargando ventas
document.addEventListener('DOMContentLoaded', () => {
    getVentas();
    loadProductsForSales();
    setDefaultDate();

});