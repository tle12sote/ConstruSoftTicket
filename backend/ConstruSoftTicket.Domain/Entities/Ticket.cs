namespace ConstruSoftTicket.Domain.Entities;

public class Ticket
{
    public Guid Id { get; set; }

    public string Titulo { get; set; } = string.Empty;

    public string Descripcion { get; set; } = string.Empty;

    // Baja, Media, Alta, Urgente
    public string Prioridad { get; set; } = string.Empty;

    // Hardware, Software, Internet, etc.
    public string Categoria { get; set; } = string.Empty;

    // Ruta o nombre del archivo
    public string? ArchivoUrl { get; set; }

    public DateTime FechaCreacion { get; set; }

    // Pendiente, En proceso, Resuelto
    public string Estado { get; set; } = string.Empty;
}