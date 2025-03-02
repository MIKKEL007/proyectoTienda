// Función para obtener y mostrar precios
function getPrecios() {
    fetch('Php/precios.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#precios-table tbody");
            tableBody.innerHTML = "";
            data.forEach(precio => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${precio.precio_id}</td>
                    <td>${precio.producto_nombre}</td>
                    <td>${precio.concepto}</td>
                    <td>${precio.valor}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editPrice(${precio.precio_id})">Editar</button>
                        <button class="btn btn-danger" onclick="deletePrice(${precio.precio_id})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            Swal.fire('Error', 'Hubo un problema al cargar los precios', 'error');
        });
}

// Función para agregar un nuevo precio
document.getElementById('add-price-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const producto_id = document.getElementById('precio-producto').value;
    const concepto = document.getElementById('precio-concepto').value;
    const valor = parseFloat(document.getElementById('precio-valor').value);

    if (!producto_id || !concepto || isNaN(valor)) {
        Swal.fire('Error', 'Por favor complete todos los campos correctamente', 'error');
        return;
    }

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
        if (data.success) {
            Swal.fire('Precio agregado', 'El precio ha sido agregado correctamente', 'success');
            getPrecios();  // Recargar la lista de precios
        } else {
            Swal.fire('Error', data.message, 'error');
        }
    })
    .catch(error => {
        Swal.fire('Error', 'Hubo un problema al agregar el precio', 'error');
    });
});

// Función para eliminar un precio
function deletePrice(precio_id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('Php/precios.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ precio_id })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire('Eliminado', 'El precio ha sido eliminado', 'success');
                    getPrecios();  // Recargar la lista de precios
                } else {
                    Swal.fire('Error', data.message, 'error');
                }
            })
            .catch(error => {
                Swal.fire('Error', 'Hubo un problema al eliminar el precio', 'error');
            });
        }
    });
}

// Función para cargar productos en el formulario de precios
function loadProducts() {
    fetch('Php/productos.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('precio-producto');
            select.innerHTML = '<option value="">--SELECCIONE--</option>';
            data.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = producto.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => {
            Swal.fire('Error', 'Hubo un problema al cargar los productos', 'error');
        });
}

// Función para editar un precio (puedes implementar esta funcionalidad similar a agregar)
function editPrice(precio_id) {
    // Aquí puedes cargar los datos del precio y prellenar el formulario
    // y luego hacer una petición para editar el precio
    Swal.fire({
        title: 'Editar Precio',
        input: 'text',
        inputLabel: 'Nuevo precio en dólares',
        inputValue: '10.00', // Este sería el valor actual del precio
        showCancelButton: true,
        confirmButtonText: 'Guardar cambios',
    }).then((result) => {
        if (result.isConfirmed) {
            const nuevoPrecio = parseFloat(result.value);
            if (!isNaN(nuevoPrecio)) {
                // Realiza la solicitud de edición (similar a agregar)
                fetch('Php/precios.php', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ precio_id, valor: nuevoPrecio })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire('Editado', 'El precio ha sido actualizado', 'success');
                        getPrecios();  // Recargar la lista de precios
                    } else {
                        Swal.fire('Error', data.message, 'error');
                    }
                })
                .catch(error => {
                    Swal.fire('Error', 'Hubo un problema al editar el precio', 'error');
                });
            } else {
                Swal.fire('Error', 'Por favor ingrese un valor numérico válido', 'error');
            }
        }
    });
}

// Inicializar la página cargando precios y productos
document.addEventListener('DOMContentLoaded', () => {
    getPrecios();
    loadProducts();
});
