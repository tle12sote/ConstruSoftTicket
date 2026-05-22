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

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  // VALIDAR FORMULARIO
  const validateForm = () => {

    const newErrors = {};

    // VALIDAR TITULO
    if (!formData.titulo.trim()) {
      newErrors.titulo = "El titulo es obligatorio.";
    } else if (formData.titulo.trim().length < 5) {
      newErrors.titulo =
        "El titulo debe tener al menos 5 caracteres.";
    }

    // VALIDAR DESCRIPCION
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripcion es obligatoria.";
    } else if (formData.descripcion.trim().length < 10) {
      newErrors.descripcion =
        "La descripcion debe tener al menos 10 caracteres.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleSubmit = async (event) => {

    event.preventDefault();

    setMessage("");
    setMessageType("");

    // VALIDAR
    if (!validateForm()) {
      return;
    }

    try {

      setIsSubmitting(true);

      const result = await createTicket({
        titulo: formData.titulo.trim(),
        descripcion: formData.descripcion.trim(),
        prioridad: formData.prioridad,
        categoria: formData.categoria,
        archivoUrl: formData.archivoUrl.trim() || null
      });

      setMessageType("success");
      setMessage(result.mensaje);

      // LIMPIAR FORMULARIO
      setFormData({
        titulo: "",
        descripcion: "",
        prioridad: "",
        categoria: "",
        archivoUrl: ""
      });

      setErrors({});

    } catch (error) {

      setMessageType("error");
      setMessage(
        "No se pudo registrar el ticket. Verifique la informacion ingresada."
      );

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
          placeholder="Ejemplo: Equipo no enciende"
          required={true}
          onChange={handleChange}
          error={errors.titulo}
        />

        {/* DESCRIPCION */}
        <div>

          <label>Descripción</label>

          <textarea
            name="descripcion"
            value={formData.descripcion}
            placeholder="Describa detalladamente el problema"
            rows="5"
            onChange={handleChange}
          />

          {errors.descripcion && (
            <p>{errors.descripcion}</p>
          )}

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

        {/* ARCHIVO */}
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

      <FormMessage
        type={messageType}
        message={message}
      />

    </main>
  );
}