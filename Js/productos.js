// Función para obtener y mostrar productos
function getProductos() {
    fetch('../Php/productos.php')
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
                    <td>
                        <button class="btn btn-warning" onclick="editProduct(${producto.id})">Editar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar productos',
                text: error.message
            });
        });
}

// Función para agregar un nuevo producto
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('producto-nombre').value;
    const categoria_id = document.getElementById('producto-categoria').value;
    const quintales = document.getElementById('producto-quintales').checked;

    // Validación básica
    if (!nombre || !categoria_id) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, complete todos los campos.'
        });
        return;
    }

    const data = { nombre, categoria_id, quintales };
    
    fetch('../Php/productos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: data.message
        });
        getProductos();  // Recargar la lista de productos
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Error al agregar producto',
            text: error.message
        });
    });
});

// Función para editar un producto
function editProduct(id) {
    fetch(`../Php/productos.php?id=${id}`)
        .then(response => response.json())
        .then(producto => {
            document.getElementById('producto-nombre').value = producto.nombre;
            document.getElementById('producto-categoria').value = producto.categoria_id;
            document.getElementById('producto-quintales').checked = producto.quintales;

            // Cambiar el título del formulario a "Editar Producto"
            document.querySelector('h2').textContent = "Editar Producto";
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar producto',
                text: error.message
            });
        });
}

// Función para cargar categorías en el formulario de productos
function loadCategories() {
    fetch('../Php/categorias.php')
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
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar categorías',
                text: error.message
            });
        });
}

// Inicializar la página cargando productos y categorías
document.addEventListener('DOMContentLoaded', () => {
    getProductos();
    loadCategories();
});
