// Función para obtener y mostrar productos
function getProductos() {
    fetch('Php/productos.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#productos-table tbody");
            tableBody.innerHTML = "";
            data.forEach(producto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.categoria_nombre}</td>
                    <td>${producto.stock}</td>
                    <td><button onclick="editProduct(${producto.id})">Editar</button></td>
                `;
                tableBody.appendChild(row);
            });
        });
}

// Función para agregar un nuevo producto
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('producto-nombre').value;
    const categoria_id = document.getElementById('producto-categoria').value;
    const quintales = document.getElementById('producto-quintales').checked;
    
    const data = { nombre, categoria_id, quintales };
    
    fetch('Php/productos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getProductos();  // Recargar la lista de productos
    });
});

// Función para editar un producto
function editProduct(id) {
    fetch(`Php/productos.php?id=${id}`)
        .then(response => response.json())
        .then(producto => {
            document.getElementById('producto-nombre').value = producto.nombre;
            document.getElementById('producto-categoria').value = producto.categoria_id;
            document.getElementById('producto-quintales').checked = producto.quintales;
        });
}

// Cargar categorías en el formulario de productos
function loadCategories() {
    fetch('Php/categorias.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('producto-categoria');
            const option = document.createElement('option');
                option.value = null;
                option.textContent = '--SELECCIONE--';
                select.appendChild(option);
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nombre;
                select.appendChild(option);
            });
        });
}

// Inicializar la página cargando productos y categorías
document.addEventListener('DOMContentLoaded', () => {
    getProductos();
    loadCategories();
});
