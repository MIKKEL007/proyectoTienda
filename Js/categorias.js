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

    Swal.fire({
        title: "¿Agregar categoría?",
        text: `Se agregará "${nombre}" al sistema.`,
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
                body: JSON.stringify({ nombre })
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
});

// Función para editar una categoría
function editCategory(id) {
    fetch(`../Php/categorias.php?id=${id}`)
        .then(response => response.json())
        .then(categoria => {
            Swal.fire({
                title: "Editar Categoría",
                input: "text",
                inputValue: categoria.nombre,
                showCancelButton: true,
                confirmButtonText: "Guardar",
                cancelButtonText: "Cancelar",
                inputValidator: (value) => {
                    if (!value.trim()) {
                        return "El nombre no puede estar vacío.";
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch('../Php/categorias.php', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id, nombre: result.value })
                    })
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire({
                            icon: "success",
                            title: "¡Categoría actualizada!",
                            text: data.message,
                        });
                        getCategorias(); // Recargar lista
                    });
                }
            });
        });
}
