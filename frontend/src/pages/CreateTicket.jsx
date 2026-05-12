import { useState } from "react";
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";
import { createTicket } from "../services/ticketService";
import "../styles/Ticket.css";

export default function CreateTicket() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "",
    categoria: "",
    archivoUrl: ""
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
      formData.titulo.trim() &&
      formData.descripcion.trim() &&
      formData.prioridad.trim() &&
      formData.categoria.trim()
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      setMessageType("error");
      setMessage("Complete todos los campos obligatorios.");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await createTicket({
        titulo: formData.titulo.trim(),
        descripcion: formData.descripcion.trim(),
        prioridad: formData.prioridad,
        categoria: formData.categoria,
        archivoUrl: formData.archivoUrl.trim() || null // opcional
      });

      setMessageType("success");
      setMessage(result.mensaje || "Ticket creado correctamente.");

      setFormData({
        titulo: "",
        descripcion: "",
        prioridad: "",
        categoria: "",
        archivoUrl: ""
      });

    } catch (error) {
      setMessageType("error");
      setMessage("Error al registrar ticket.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Registro de Ticket</h1>

      <form onSubmit={handleSubmit}>
        {/* TITULO */}
        <InputField
          label="Título"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
        />

        {/* DESCRIPCIÓN */}
        <div>
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="5"
          />
        </div>

        {/* PRIORIDAD */}
        <div>
          <label>Prioridad</label>
          <select
            name="prioridad"
            value={formData.prioridad}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        {/* CATEGORIA */}
        <div>
          <label>Categoría</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Red">Red</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* ARCHIVO URL */}
        <div>
          <label>Archivo (URL opcional)</label>
          <input
            type="text"
            name="archivoUrl"
            value={formData.archivoUrl}
            onChange={handleChange}
            placeholder="https://..."
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