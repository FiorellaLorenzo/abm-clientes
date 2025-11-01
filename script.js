const form = document.getElementById("clienteForm");
const tabla = document.getElementById("tablaClientes");
const btnGuardar = document.getElementById("btnGuardar");

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let editando = null;

function mostrarClientes() {
  tabla.innerHTML = "";
  clientes.forEach((cliente, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${cliente.nombre}</td>
      <td>${cliente.apellido}</td>
      <td>${cliente.dni}</td>
      <td>${cliente.email}</td>
      <td>${cliente.telefono}</td>
      <td>
        <button class="btn-editar" onclick="editarCliente(${index})">📝 Editar</button>
        <button class="btn-eliminar" onclick="eliminarCliente(${index})">❌ Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function guardarEnLocalStorage() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const dni = document.getElementById("dni").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (!nombre || !apellido || !dni || !email || !telefono) {
    alert("⚠️ Todos los campos son obligatorios");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("⚠️ Ingresá un email válido");
    return;
  }

  if (!editando && clientes.some(c => c.dni === dni)) {
    alert("⚠️ Ya existe un cliente con ese DNI");
    return;
  }

  const nuevoCliente = { nombre, apellido, dni, email, telefono };

  if (editando !== null) {
    clientes[editando] = nuevoCliente;
    editando = null;
    btnGuardar.textContent = "💾 Guardar";
  } else {
    clientes.push(nuevoCliente);
  }

  guardarEnLocalStorage();
  mostrarClientes();
  form.reset();
});

function editarCliente(index) {
  const cliente = clientes[index];
  document.getElementById("nombre").value = cliente.nombre;
  document.getElementById("apellido").value = cliente.apellido;
  document.getElementById("dni").value = cliente.dni;
  document.getElementById("email").value = cliente.email;
  document.getElementById("telefono").value = cliente.telefono;

  editando = index;
  btnGuardar.textContent = "✏️ Actualizar";
}

function eliminarCliente(index) {
  if (confirm("¿Seguro que querés eliminar este cliente?")) {
    clientes.splice(index, 1);
    guardarEnLocalStorage();
    mostrarClientes();
  }
}

mostrarClientes();
