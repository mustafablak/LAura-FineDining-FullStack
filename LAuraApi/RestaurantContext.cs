using Microsoft.EntityFrameworkCore;
using LAuraApi.Models;

namespace LAuraApi
{
    public class RestaurantContext : DbContext
    {
        public RestaurantContext(DbContextOptions<RestaurantContext> options) : base(options) { }

        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}