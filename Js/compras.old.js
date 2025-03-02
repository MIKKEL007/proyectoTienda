


// Función para agregar una compra
document.getElementById('add-purchase-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const producto_id = document.getElementById('compra-producto').value;
    const precio_compra = parseFloat(document.getElementById('compra-precio').value);
    const cantidad = parseInt(document.getElementById('compra-cantidad').value);
    const fecha = document.getElementById('compra-fecha').value;

    const data = { producto_id, precio_compra, cantidad, fecha };

    console.log(data);
    
    
    fetch('Php/compras.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getCompras();  // Recargar la lista de compras
    });
});

// Función para obtener y mostrar compras
function getCompras() {
    fetch('Php/compras.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#compras-table tbody");
            tableBody.innerHTML = "";
            data.forEach(compra => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${compra.id}</td>
                    <td>${compra.producto}</td>
                    <td>${compra.precio_compra}</td>
                    <td>${compra.cantidad}</td>
                    <td>${compra.fecha}</td>
                `;
                tableBody.appendChild(row);
            });
        });
}

// Cargar productos en el formulario de compras
function loadProductsForPurchases() {
    fetch('Php/productos.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('compra-producto');
            data.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = producto.nombre;
                select.appendChild(option);
            });
        });
}
// Función para establecer la fecha actual por defecto
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
    document.getElementById('compra-fecha').value = today;
}
// Inicializar la página cargando compras
document.addEventListener('DOMContentLoaded', () => {
    getCompras();
    loadProductsForPurchases();
    setDefaultDate();
});