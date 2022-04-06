using Microsoft.EntityFrameworkCore;

namespace WEBAPI.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {    
        }
        public DbSet<Usuario> Eventos { get; set; }
    }
}