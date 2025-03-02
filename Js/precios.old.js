


// Función para obtener y mostrar precios
function getPrecios() {
    fetch('Php/precios.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#precios-table tbody");
            tableBody.innerHTML = "";
            // console.log(data)
            data.forEach(precio => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${precio.precio_id}</td>
                    <td>${precio.producto_nombre}</td>
                    <td>${precio.concepto}</td>
                    <td>${precio.valor}</td>
                    <td><button onclick="editPrice(${precio.id})">Editar</button></td>
                `;
                tableBody.appendChild(row);
            });
        });
}

// Función para agregar un nuevo precio
document.getElementById('add-price-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const producto_id = document.getElementById('precio-producto').value;
    const concepto = document.getElementById('precio-concepto').value;
    const valor = parseFloat(document.getElementById('precio-valor').value);
    
    const data = { producto_id, concepto, valor };
    
    fetch('Php/precios.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getPrecios();  // Recargar la lista de precios
    });
});

// Cargar productos en el formulario de precios
function loadProducts() {
    fetch('Php/productos.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('precio-producto');
            const option = document.createElement('option');
            option.value = null;
            option.textContent = '--SELECIONE--';
            select.appendChild(option);
            data.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = producto.nombre;
                select.appendChild(option);
            });
        });
}

// Inicializar la página cargando precios y productos
document.addEventListener('DOMContentLoaded', () => {
    getPrecios();
    loadProducts();
});