// Función para agregar una venta
document.getElementById('add-sale-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const producto_id = parseInt(document.getElementById('venta-producto').value);
    const precio_id = parseInt(document.getElementById('venta-precio').value);
    const cantidad = parseFloat(document.getElementById('venta-cantidad').value);
    const fecha = document.getElementById('venta-fecha').value;


    const data = { producto_id, precio_id, cantidad, fecha };
     // Verifica los datos que se están enviando

    // Validar si los campos son correctos
    if (!producto_id || !precio_id || !cantidad || !fecha) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, complete todos los campos.',
        });
        return;
    }

    
    
    fetch('../Php/ventas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {

       console.log(data);
       
        
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Venta agregada',
                text: data.message,
            });
            getVentas();  // Recargar la lista de ventas
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al agregar la venta: ' + data.error,
            });
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al procesar la venta.',
        });
    });
});

// Función para obtener y mostrar ventas
function getVentas() {
    fetch('../Php/ventas.php')
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
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar ventas',
                text: 'No se pudieron cargar las ventas.',
            });
        });
}

// Cargar productos en el formulario de ventas   
function loadProductsForSales() {
    fetch('../Php/productos.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('venta-producto');
            data.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = producto.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar productos',
                text: 'No se pudieron cargar los productos.',
            });
        });
}

// Cargar precios cuando se seleccione un producto
function loadPricesForProduct() {
    const productoId = document.getElementById('venta-producto').value;
    const selectPrecios = document.getElementById('venta-precio');

    console.log(productoId);
    
    if (!productoId) {
        selectPrecios.innerHTML = '<option value="">Selecciona un precio</option>';
        return;
    }

    fetch(`../Php/precios.php`)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            
            selectPrecios.innerHTML = '<option value="">Selecciona un precio</option>';
            data.forEach(precio => {

                    if (productoId ==precio.producto_idp ) {
                        
                   
                    const option = document.createElement('option');
                    option.value = precio.precio_id;  // Asegúrate de que el campo correcto es `id`
                    option.textContent = `${precio.concepto} - $${precio.valor}`;
                    selectPrecios.appendChild(option);  
                }
                
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar precios',
                text: 'No se pudieron cargar los precios.',
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
