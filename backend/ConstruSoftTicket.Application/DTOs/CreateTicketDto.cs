namespace ConstruSoftTicket.Application.DTOs;

public class CreateTicketDto
{
    public string Titulo { get; set; } = string.Empty;

    public string Descripcion { get; set; } = string.Empty;

    public string Prioridad { get; set; } = string.Empty;

    public string Categoria { get; set; } = string.Empty;

    public string? ArchivoUrl { get; set; }
}