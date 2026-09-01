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
        public DbSet<Farmers> Farmers { get; set; }

        public DbSet<FarmerAddress> FarmerAddresses { get; set; }

       // public DbSet<FarmerLand> FarmerLands { get; set; }

       // public DbSet<FarmerCrop> FarmerCrops { get; set; }

        //public DbSet<CropType> CropTypes { get; set; }

        //public DbSet<SoilType> SoilTypes { get; set; }

       // public DbSet<IrrigationType> IrrigationTypes { get; set; }

        public DbSet<State> States { get; set; }

        public DbSet<District> Districts { get; set; }

        public DbSet<Mandal> Mandals { get; set; }

        public DbSet<Village> Villages { get; set; }
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<IntegrationSettings> IntegrationSettings { get; set; }

        public DbSet<FarmerPayment> FarmerPayment { get; set; }
        public DbSet<FarmerPayments> FarmerPayments { get; set; }
        public DbSet<Procurement> Procurements { get; set; }
        public DbSet<QualityInspection> QualityInspections { get; set; }
        public DbSet<Weighment> Weighments { get; set; }

    }
}



