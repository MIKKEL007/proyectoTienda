// Función para obtener y mostrar precios
function getPrecios() {
    fetch('../Php/precios.php')
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
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            Swal.fire('Error', 'Hubo un problema al cargar los precios', 'error');
        });
}

// // Función para formatear a Upper Camel Case
function toUpperCamelCase(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}
let editingPriceId = null;

// Función para agregar un nuevo precio
document.getElementById('add-price-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const producto_id = document.getElementById('precio-producto').value;
    const concepto = document.getElementById('precio-concepto').value.toUpperCase();
    const valor = parseFloat(document.getElementById('precio-valor').value);

    if (!producto_id || !concepto || isNaN(valor)) {
        Swal.fire('Error', 'Por favor complete todos los campos correctamente', 'error');
        return;
    }
    console.log(editingPriceId);

    const data = { producto_id, concepto, valor };
    if (editingPriceId) {
        data.id = editingPriceId;

        
        fetch('../Php/precios.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Precio actualizado',
                text: data.message
            });

            // Resetear el formulario
            resetForm();
            getPrecios();
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar precio',
                text: error.message
            });
        });

    } else { // Si no estamos editando,

    fetch('../Php/precios.php', {
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
            Swal.fire('Error CD', data.message, 'error');
        }
    })
    .catch(error => {
        Swal.fire('Error', 'Hubo un problema al agregar el precio', 'error');
    });
} 

});

// Función para cancelar edición y resetear el formulario
function resetForm() {

    document.getElementById('precio-producto').value = "";
    document.getElementById('precio-concepto').value = "";
    document.getElementById('precio-valor').value = "";

    document.querySelector('#form-title').textContent = "Agregar Precio";

    const submitButton = document.getElementById('submit-button');
    submitButton.textContent = "Agregar Precio";
    submitButton.classList.remove('btn-success');
    submitButton.classList.add('btn-primary');
    document.getElementById('precio-producto').disabled = false
    document.getElementById('precio-concepto').disabled = false;

    submitButton.classList.remove('w-40');


    document.getElementById('cancel-button').style.display = 'none'; // Ocultar botón cancelar

    editingPriceId = null;
}

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
            fetch('../Php/precios.php', {
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
    fetch('../Php/productos.php')
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
function editPrice(id) {
    fetch(`../Php/precios.php?id=${id}`)
    .then(response => response.json())
    .then(precio => {        
        
       editingPriceId = precio[0].precio_id;
        
       document.getElementById('precio-producto').value = precio[0].producto_id;
       document.getElementById('precio-concepto').value = precio[0].concepto;
       document.getElementById('precio-valor').value = precio[0].valor;

        // Cambiar el título del formulario
        document.querySelector('#form-title').textContent = "Editar Precio";

         // Cambiar el texto del botón y el color
         const submitButton = document.getElementById('submit-button');
         submitButton.textContent = "Actualizar Precio";
         submitButton.classList.remove('btn-primary');
         submitButton.classList.add('btn-success');

         submitButton.classList.add('w-40');

         document.getElementById('precio-producto').disabled = true;
         document.getElementById('precio-concepto').disabled = true;

          // Mostrar el botón de cancelar
        document.getElementById('cancel-button').style.display = 'inline-block';

    })
    .catch(error => {

        console.log(error);
        
        Swal.fire({
            icon: 'error',
            title: 'Error al cargar producto',
            text: error.message
        });
    });
}

// Inicializar la página cargando precios y productos
document.addEventListener('DOMContentLoaded', () => {
    getPrecios();
    loadProducts();
});
