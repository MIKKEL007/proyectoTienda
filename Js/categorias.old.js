

// Función para obtener y mostrar categorías
function getCategorias() {
    fetch('Php/categorias.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#categorias-table tbody");
            tableBody.innerHTML = "";
            data.forEach(categoria => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${categoria.id}</td>
                    <td>${categoria.nombre}</td>
                    <td><button onclick="editCategory(${categoria.id})">Editar</button></td>
                `;
                tableBody.appendChild(row);
            });
        });
}

// Función para agregar una nueva categoría
document.getElementById('add-category-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('categoria-nombre').value;
    
    const data = { nombre };
    
    fetch('Php/categorias.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getCategorias();  // Recargar la lista de categorías
    });
});

// Función para editar una categoría
function editCategory(id) {
    fetch(`Php/categorias.php?id=${id}`)
        .then(response => response.json())
        .then(categoria => {
            document.getElementById('categoria-nombre').value = categoria.nombre;
        });
}

// Inicializar la página cargando categorías
document.addEventListener('DOMContentLoaded', () => {
    getCategorias();
});