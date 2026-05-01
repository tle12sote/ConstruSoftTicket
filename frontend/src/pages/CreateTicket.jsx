import { useState } from "react";
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";
import { createTicket } from "../services/ticketService";
import "../styles/Ticket.css"

export default function CreateTicket() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: ""
  });
 
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const handleChange = (event) => {
    const { name, value } = event.target;
 
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const isFormValid = () => {
    return (
      formData.titulo.trim().length > 0 &&
      formData.descripcion.trim().length > 0
    );
  };
  const handleSubmit = async (event) => {
  event.preventDefault();
 
  if (!isFormValid()) {
    setMessageType("error");
    setMessage("Debe completar el título y la descripción del ticket.");
    return;
  }
 
  try {
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");
 
    const result = await createTicket({
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim()
    });
 
    setMessageType("success");
    setMessage(result.mensaje || "Ticket registrado correctamente.");
 
    setFormData({
      titulo: "",
      descripcion: ""
    });
  } catch (error) {
    setMessageType("error");
    setMessage("No se pudo registrar el ticket. Revise la conexión con la API.");
    console.error("Error al registrar ticket:", error);
  } finally {
    setIsSubmitting(false);
  }
};
return (
  <main>
    <h1>Registro de Ticket</h1>
 
    <p>
      Complete la información básica de la incidencia técnica. Los datos
      ingresados deben ser claros para facilitar su atención posterior.
    </p>
 
    <form onSubmit={handleSubmit}>
      <InputField
        label="Título del ticket"
        name="titulo"
        value={formData.titulo}
        placeholder="Ejemplo: PC no enciende"
        required={true}
        onChange={handleChange}
      />
 
      <div>
        <label htmlFor="descripcion">Descripción de la incidencia</label>
 
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          placeholder="Describa brevemente el problema encontrado"
          required
          rows="5"
          onChange={handleChange}
        />
      </div>
 
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrar ticket"}
      </button>
    </form>
 
    <FormMessage type={messageType} message={message} />
  </main>
);
}