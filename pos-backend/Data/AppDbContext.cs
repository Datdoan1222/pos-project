using Microsoft.EntityFrameworkCore;
using pos_backend.Models;

namespace pos_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Order> Orders => Set<Order>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Cà phê đen",
                    Price = 25000,
                    Image = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
                },
                new Product
                {
                    Id = 2,
                    Name = "Cà phê sữa",
                    Price = 30000,
                    Image = "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400"
                },
                new Product
                {
                    Id = 3,
                    Name = "Trà sữa",
                    Price = 35000,
                    Image = "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400"
                },
                new Product
                {
                    Id = 4,
                    Name = "Sinh tố bơ",
                    Price = 40000,
                    Image = "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400"
                },
                new Product
                {
                    Id = 5,
                    Name = "Nước ép cam",
                    Price = 35000,
                    Image = "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400"
                },
                new Product
                {
                    Id = 6,
                    Name = "Trà chanh",
                    Price = 20000,
                    Image = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400"
                },
                new Product
                {
                    Id = 7,
                    Name = "Soda chanh",
                    Price = 25000,
                    Image = "https://images.unsplash.com/photo-1527960669845-6c5e5fe36c08?w=400"
                },
                new Product
                {
                    Id = 8,
                    Name = "Matcha latte",
                    Price = 45000,
                    Image = "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400"
                }
            );
        }
    }
}
