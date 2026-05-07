using ArukuNaati.Server.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ArukuNaati.Server.Data
{
  
        public class AppDbContext : DbContext
        {
            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
            {
            }

            public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }

    }
}



