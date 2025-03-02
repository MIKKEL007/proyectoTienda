// // Función para obtener y mostrar productos
// function getProductos() {
//     fetch('../Php/productos.php')
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.querySelector("#productos-table tbody");
//             tableBody.innerHTML = "";
//             data.forEach(producto => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${producto.id}</td>
//                     <td>${producto.nombre}</td>
//                     <td>${producto.categoria_nombre}</td>
//                     <td>${producto.stock}</td>
//                     <td>
//                         <button class="btn btn-warning" onclick="editProduct(${producto.id})">Editar</button>
//                     </td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error al cargar productos',
//                 text: error.message
//             });
//         });
// }

// // Función para agregar un nuevo producto
// document.getElementById('add-product-form').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const nombre = document.getElementById('producto-nombre').value;
//     const categoria_id = document.getElementById('producto-categoria').value;
//     const quintales = document.getElementById('producto-quintales').checked;

//     // Validación básica
//     if (!nombre || !categoria_id) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Campos incompletos',
//             text: 'Por favor, complete todos los campos.'
//         });
//         return;
//     }

//     const data = { nombre, categoria_id, quintales };
    
//     fetch('../Php/productos.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         Swal.fire({
//             icon: 'success',
//             title: 'Producto agregado',
//             text: data.message
//         });
//         getProductos();  // Recargar la lista de productos
//     })
//     .catch(error => {
//         Swal.fire({
//             icon: 'error',
//             title: 'Error al agregar producto',
//             text: error.message
//         });
//     });
// });

// // Función para editar un producto
// function editProduct(id) {
//     fetch(`../Php/productos.php?id=${id}`)
//         .then(response => response.json())
//         .then(producto => {
            
//             console.log(producto);
            
//             document.getElementById('producto-nombre').value = producto.nombre;
//             document.getElementById('producto-categoria').value = producto.categoria_id;
//             document.getElementById('producto-quintales').checked = producto.quintales;

//             // Cambiar el título del formulario a "Editar Producto"
//             document.querySelector('h2').textContent = "Editar Producto";
//         })
//         .catch(error => {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error al cargar producto',
//                 text: error.message
//             });
//         });
// }

// // Función para cargar categorías en el formulario de productos
// function loadCategories() {
//     fetch('../Php/categorias.php')
//         .then(response => response.json())
//         .then(data => {
//             const select = document.getElementById('producto-categoria');
//             const option = document.createElement('option');
//             option.value = null;
//             option.textContent = '--SELECCIONE--';
//             select.appendChild(option);
//             data.forEach(categoria => {
//                 const option = document.createElement('option');
//                 option.value = categoria.id;
//                 option.textContent = categoria.nombre;
//                 select.appendChild(option);
//             });
//         })
//         .catch(error => {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error al cargar categorías',
//                 text: error.message
//             });
//         });
// }

// // Inicializar la página cargando productos y categorías
// document.addEventListener('DOMContentLoaded', () => {
//     getProductos();
//     loadCategories();
// });



// Función para obtener y mostrar productos
// function getProductos() {
//     fetch('../Php/productos.php')
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.querySelector("#productos-table tbody");
//             tableBody.innerHTML = "";
//             data.forEach(producto => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${producto.id}</td>
//                     <td>${producto.nombre}</td>
//                     <td>${producto.categoria_nombre}</td>
//                     <td>${producto.stock}</td>
//                     <td>
//                         <button class="btn btn-warning" onclick="editProduct(${producto.id})">Editar</button>
//                     </td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error al cargar productos',
//                 text: error.message
//             });
//         });
// }

// // Función para formatear a Upper Camel Case
function toUpperCamelCase(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

// // Función para agregar un nuevo producto
// document.getElementById('add-product-form').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     let nombre = document.getElementById('producto-nombre').value.trim();
//     const categoria_id = document.getElementById('producto-categoria').value;
//     const quintales = document.getElementById('producto-quintales').checked;

//     // Validación básica
//     if (!nombre || !categoria_id) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Campos incompletos',
//             text: 'Por favor, complete todos los campos.'
//         });
//         return;
//     }

//     nombre = toUpperCamelCase(nombre); // Aplicar Upper Camel Case

//     const data = { nombre, categoria_id, quintales };
    
//     fetch('../Php/productos.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         Swal.fire({
//             icon: 'success',
//             title: 'Producto agregado',
//             text: data.message
//         });
//         getProductos();  // Recargar la lista de productos
//     })
//     .catch(error => {
//         Swal.fire({
//             icon: 'error',
//             title: 'Error al agregar producto',
//             text: error.message
//         });
//     });
// });

// // Función para editar un producto
// function editProduct(id) {
//     fetch(`../Php/productos.php?id=${id}`)
//         .then(response => response.json())
//         .then(producto => {
            
//             console.log(producto);
            
//             document.getElementById('producto-nombre').value = producto.nombre;
//             document.getElementById('producto-categoria').value = producto.categoria_id;

//             // Ocultar checkbox de compra por quintales
//             document.getElementById('producto-quintales').parentElement.style.display = 'none';

//             // Cambiar el título principal a "Editar Producto"
//             document.querySelector('h2').textContent = "Editar Producto";

//             // Cambiar el texto del botón y el color
//             const submitButton = document.getElementById('submit-button');
//             submitButton.textContent = "Actualizar Producto";
//             submitButton.classList.remove('btn-primary');
//             submitButton.classList.add('btn-success');
//             // Ocultar el segundo título "Agregar Nuevo Producto"
//             document.getElementById('add-title').style.display = 'none';

//         })
//         .catch(error => {

//             console.log(error);
            
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error al cargar producto',
//                 text: error.message
//             });
//         });
// }

// function resetForm() {
//     document.getElementById('producto-nombre').value = '';
//     document.getElementById('producto-categoria').value = '';
//     document.getElementById('producto-quintales').checked = false;
//     document.getElementById('producto-quintales').style.display = 'inline-block'; // Mostrar checkbox de nuevo

//     document.querySelector('#form-title').textContent = "Agregar Producto";

//     const submitButton = document.getElementById('submit-button');
//     submitButton.textContent = "Agregar Producto";
//     submitButton.classList.remove('btn-success');
//     submitButton.classList.add('btn-primary');

//     document.getElementById('cancel-button').style.display = 'none'; // Ocultar botón cancelar

// }


// // Función para cargar categorías en el formulario de productos
function loadCategories() {
    fetch('../Php/categorias.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('producto-categoria');
            select.innerHTML = ''; // Limpiar antes de cargar

            const option = document.createElement('option');
            option.value = "";
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

// // Inicializar la página cargando productos y categorías
// document.addEventListener('DOMContentLoaded', () => {
//     getProductos();
//     loadCategories();
// });


// Variable para almacenar el ID del producto en edición
let editingProductId = null;

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

// Función para editar un producto
function editProduct(id) {
    fetch(`../Php/productos.php?id=${id}`)
        .then(response => response.json())
        .then(producto => {
            console.log(producto);

            // Guardar el ID del producto en edición
            editingProductId = producto.id;

            // Llenar el formulario con los datos actuales
            document.getElementById('producto-nombre').value = producto.nombre;
            document.getElementById('producto-categoria').value = producto.categoria_id;
            document.getElementById('producto-quintales').style.display = 'none'; // Ocultar el checkbox

            // Cambiar el título del formulario
            document.querySelector('#form-title').textContent = "Editar Producto";

            // Cambiar el texto del botón y el color
            const submitButton = document.getElementById('submit-button');
            submitButton.textContent = "Actualizar Producto";
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('btn-success');

            
            document.getElementById('mis-q').style.display = 'none';


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

// Función para agregar o actualizar un producto
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

    // Convertir a UpperCamelCase antes de enviar
    const formatNombre = toUpperCamelCase(nombre)
    const data = { nombre: formatNombre, categoria_id };

    // Si estamos editando, enviamos una solicitud PUT
    if (editingProductId) {
        data.id = editingProductId;

        fetch('../Php/productos.php', {
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
                title: 'Producto actualizado',
                text: data.message
            });

            // Resetear el formulario
            resetForm();
            getProductos();
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar producto',
                text: error.message
            });
        });

    } else { // Si no estamos editando, enviamos una solicitud POST para agregar un producto
        data.quintales = quintales;

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

            // Resetear el formulario
            resetForm();
            getProductos();
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar producto',
                text: error.message
            });
        });
    }
});

// Función para cancelar edición y resetear el formulario
function resetForm() {
    document.getElementById('producto-nombre').value = '';
    document.getElementById('producto-categoria').value = '';
    document.getElementById('producto-quintales').checked = false;
    document.getElementById('producto-quintales').style.display = 'inline-block'; // Mostrar checkbox de nuevo

    document.querySelector('#form-title').textContent = "Agregar Producto";

    const submitButton = document.getElementById('submit-button');
    submitButton.textContent = "Agregar Producto";
    submitButton.classList.remove('btn-success');
    submitButton.classList.add('btn-primary');

    document.getElementById('mis-q').style.display = 'block';

    document.getElementById('cancel-button').style.display = 'none'; // Ocultar botón cancelar

    editingProductId = null;
}

// Cargar productos y categorías al iniciar
document.addEventListener('DOMContentLoaded', () => {
    getProductos();
    loadCategories();
});
