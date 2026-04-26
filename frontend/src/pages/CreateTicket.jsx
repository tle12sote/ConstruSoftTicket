import React, { useState } from "react";
import "../styles/Ticket.css";

export default function CreateTicket() {
  // Estados
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Función al enviar
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5010/api/Ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo,
        descripcion
      })
    });

    if (response.ok) {
      alert("Ticket registrado correctamente");
      setTitulo("");
      setDescripcion("");
    } else {
      alert("Error al registrar el ticket");
    }

  } catch (error) {
    console.error(error);
    alert("Error de conexión");
  }
};

  return (
    <div>
      <h2>Crear Ticket</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </div>

        <button type="submit">Registrar ticket</button>
      </form>
    </div>
  );
}