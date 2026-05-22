using ConstruSoftTicket.Domain.Entities;

public interface IAuthService
{
    bool Login(string email, string password);
    string HashPassword(User user, string password);
    string GenerateToken(User user); // 🔥 FALTA ESTO
}