using System.ComponentModel.DataAnnotations;

namespace ConstruSoftTicket.Application.DTOs;

public class CreateTicketDto
{
    [Required(ErrorMessage = "El titulo es Obligatorio")]
    [MinLength(5, ErrorMessage = "El titulo debe tener al menos 5 caracteres")]
    [MaxLength(100, ErrorMessage = "El titulo no puede superar los 100 caracteres")]
    public string Titulo { get; set; } = string.Empty;

    [Required(ErrorMessage = "La descripción es Obligatorio")]
    [MinLength(5, ErrorMessage = "La descripción debe tener al menos 10 caracteres")]
    [MaxLength(100, ErrorMessage = "La descripción no puede superar los 500 caracteres")]
    public string Descripcion { get; set; } = string.Empty;

    public string Prioridad { get; set; } = string.Empty;

    public string Categoria { get; set; } = string.Empty;

    public string? ArchivoUrl { get; set; }
}