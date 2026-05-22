using ConstruSoftTicket.Domain.Entities;

namespace ConstruSoftTicket.Application.Interfaces
{
    public interface IUserRepository
    {
        void Add(User user);
        User? GetByEmail(string email);
    }
}