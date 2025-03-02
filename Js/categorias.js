document.addEventListener('DOMContentLoaded', () => {
    getCategorias();
});

// Función para obtener y mostrar categorías
function getCategorias() {
    fetch('../Php/categorias.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#categorias-table");
            tableBody.innerHTML = "";
            data.forEach(categoria => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${categoria.id}</td>
                    <td>${categoria.nombre}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editCategory(${categoria.id})">Editar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

// // Función para formatear a Upper Camel Case
function toUpperCamelCase(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}
let editingCategoryId = null;

// Función para agregar una nueva categoría con SweetAlert
document.getElementById('add-category-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nombre = document.getElementById('categoria-nombre').value.trim();
    
    if (nombre === "") {
        Swal.fire({
            icon: "warning",
            title: "Campo vacío",
            text: "Por favor, ingresa un nombre para la categoría.",
        });
        return;
    }

     // Convertir a UpperCamelCase antes de enviar
     const formatNombre = toUpperCamelCase(nombre)
     

     const data = { nombre: formatNombre};

     console.log(data);
     
     if (editingCategoryId) {
        data.id = editingCategoryId;

        fetch('../Php/categorias.php', {
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
                title: 'Categoria actualizada',
                text: data.message
            });

            // Resetear el formulario
            resetForm();
            getCategorias();
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar categoria',
                text: error.message
            });
        });

    } else { // Si no estamos editando,

    Swal.fire({
        title: "¿Agregar categoría?",
        text: `Se agregará "${formatNombre}" al sistema.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, agregar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('../Php/categorias.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombre: formatNombre })
            })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    icon: "success",
                    title: "¡Categoría agregada!",
                    text: data.message,
                });
                document.getElementById('add-category-form').reset();
                getCategorias(); // Recargar la lista
            });
        }
    });
} 

});

// Función para cancelar edición y resetear el formulario
function resetForm() {

    document.getElementById('categoria-nombre').value = "";

    document.querySelector('#form-title').textContent = "Agregar Categoria";

    const submitButton = document.getElementById('submit-button');
    submitButton.textContent = "Agregar Categoria";
    submitButton.classList.remove('btn-success');
    submitButton.classList.add('btn-primary');


    submitButton.classList.remove('w-40');

    document.getElementById('cancel-button').style.display = 'none'; // Ocultar botón cancelar

    editingCategoryId = null;
}

// Función para editar una categoría
function editCategory(id) {
    fetch(`../Php/categorias.php?id=${id}`)
        .then(response => response.json())
        .then(categoria => {
           editingCategoryId = categoria.id;
            
           document.getElementById('categoria-nombre').value = categoria.nombre;

            // Cambiar el título del formulario
            document.querySelector('#form-title').textContent = "Editar Categoria";

             // Cambiar el texto del botón y el color
             const submitButton = document.getElementById('submit-button');
             submitButton.textContent = "Actualizar Producto";
             submitButton.classList.remove('btn-primary');
             submitButton.classList.add('btn-success');

   
             submitButton.classList.add('w-40');

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
