document.addEventListener("DOMContentLoaded", () => {
    getCompras();
    loadProductsForPurchases();
    setDefaultDate();
});

// Función para agregar una compra
document.getElementById("add-purchase-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const producto_id = document.getElementById("compra-producto").value;
    const precio_compra = parseFloat(document.getElementById("compra-precio").value);
    const cantidad = parseInt(document.getElementById("compra-cantidad").value);
    const fecha = document.getElementById("compra-fecha").value;

    // 🔍 Validaciones antes de enviar
    if (!producto_id || isNaN(precio_compra) || precio_compra <= 0 || isNaN(cantidad) || cantidad <= 0 || !fecha) {
        Swal.fire({
            icon: "warning",
            title: "Datos incorrectos",
            text: "Por favor, completa todos los campos con valores válidos.",
        });
        return;
    }

    const data = { producto_id, precio_compra, cantidad, fecha };

    // ⚡ Confirmación antes de enviar
    Swal.fire({
        title: "¿Confirmar compra?",
        text: "Se agregará una nueva compra al sistema.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, agregar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            fetch("../Php/compras.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    Swal.fire({
                        icon: "success",
                        title: "Compra agregada",
                        text: data.message,
                    });
                    document.getElementById("add-purchase-form").reset();
                    setDefaultDate();
                    getCompras(); // Recargar lista
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Hubo un problema al registrar la compra.",
                    });
                    console.error("Error:", error);
                });
        }
    });
});

// Función para obtener y mostrar compras
function getCompras() {
    fetch("../Php/compras.php")
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.querySelector("#compras-table tbody");
            tableBody.innerHTML = "";
            data.forEach((compra) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${compra.id}</td>
                    <td>${compra.producto}</td>
                    <td>$${compra.precio_compra}</td>
                    <td>${compra.cantidad}</td>
                    <td>${compra.fecha}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => console.error("Error cargando compras:", error));
}

// Cargar productos en el formulario de compras
function loadProductsForPurchases() {
    fetch("../Php/productos.php")
        .then((response) => response.json())
        .then((data) => {
            const select = document.getElementById("compra-producto");
            select.innerHTML = '<option value="">Seleccione un producto</option>';
            data.forEach((producto) => {
                const option = document.createElement("option");
                option.value = producto.id;
                option.textContent = producto.nombre;
                select.appendChild(option);
            });
        })
        .catch((error) => console.error("Error cargando productos:", error));
}

// Función para establecer la fecha actual por defecto
function setDefaultDate() {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    document.getElementById("compra-fecha").value = today;
}
