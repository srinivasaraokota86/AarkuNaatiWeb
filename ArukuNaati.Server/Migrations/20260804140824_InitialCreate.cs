//using System;
//using Microsoft.EntityFrameworkCore.Migrations;

//#nullable disable

//namespace ArukuNaati.Server.Migrations
//{
//    /// <inheritdoc />
//    public partial class InitialCreate : Migration
//    {
//        /// <inheritdoc />
//        protected override void Up(MigrationBuilder migrationBuilder)
//        {
//            migrationBuilder.CreateTable(
//                name: "Customers",
//                columns: table => new
//                {
//                    CustomerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
//                    CustomerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    CustomerClass = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    AddressLine1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_Customers", x => x.CustomerId);
//                });

//            migrationBuilder.CreateTable(
//                name: "Districts",
//                columns: table => new
//                {
//                    DistrictId = table.Column<int>(type: "int", nullable: false)
//                        .Annotation("SqlServer:Identity", "1, 1"),
//                    DistrictName = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    StateId = table.Column<int>(type: "int", nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_Districts", x => x.DistrictId);
//                });

//            migrationBuilder.CreateTable(
//                name: "Equipment",
//                columns: table => new
//                {
//                    Id = table.Column<int>(type: "int", nullable: false)
//                        .Annotation("SqlServer:Identity", "1, 1"),
//                    EquipmentName = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
//                    EquipmentNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_Equipment", x => x.Id);
//                });

//            migrationBuilder.CreateTable(
//                name: "FarmerAddresses",
//                columns: table => new
//                {
//                    AddressId = table.Column<int>(type: "int", nullable: false)
//                        .Annotation("SqlServer:Identity", "1, 1"),
//                    FarmerId = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    VillageId = table.Column<int>(type: "int", nullable: true),
//                    MandalId = table.Column<int>(type: "int", nullable: true),
//                    DistrictId = table.Column<int>(type: "int", nullable: true),
//                    StateId = table.Column<int>(type: "int", nullable: true),
//                    PinCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    FullAddress = table.Column<string>(type: "nvarchar(max)", nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_FarmerAddresses", x => x.AddressId);
//                });

//            migrationBuilder.CreateTable(
//                name: "Farmers",
//                columns: table => new
//                {
//                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
//                    FarmerCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Mobile = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    AadharNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    GSTNO = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    ISActive = table.Column<bool>(type: "bit", nullable: false),
//                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_Farmers", x => x.Id);
//                });

//            migrationBuilder.CreateTable(
//                name: "IntegrationSettings",
//                columns: table => new
//                {
//                    Id = table.Column<int>(type: "int", nullable: false)
//                        .Annotation("SqlServer:Identity", "1, 1"),
//                    BaseUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    EndpointName = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    EndpointVersion = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    SecretKey = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    IsActive = table.Column<bool>(type: "bit", nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_IntegrationSettings", x => x.Id);
//                });

//            migrationBuilder.CreateTable(
//                name: "Mandals",
//                columns: table => new
//                {
//                    MandalId = table.Column<int>(type: "int", nullable: false)
//                        .Annotation("SqlServer:Identity", "1, 1"),
//                    MandalName = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    DistrictId = table.Column<int>(type: "int", nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_Mandals", x => x.MandalId);
//                });

//            migrationBuilder.CreateTable(
//                name: "States",
//                columns: table => new
//                {
//                    StateId = table.Column<int>(type: "int", nullable: false)
//                        .Annotation("SqlServer:Identity", "1, 1"),
//                    StateName = table.Column<string>(type: "nvarchar(max)", nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_States", x => x.StateId);
//                });

//            migrationBuilder.CreateTable(
//                name: "Users",
//                columns: table => new
//                {
//                    UserId = table.Column<int>(type: "int", nullable: false)
//                        .Annotation("SqlServer:Identity", "1, 1"),
//                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
//                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
//                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
//                    ResetToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
//                    ResetTokenExpiry = table.Column<DateTime>(type: "datetime2", nullable: true)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_Users", x => x.UserId);
//                });

//            migrationBuilder.CreateTable(
//                name: "Villages",
//                columns: table => new
//                {
//                    VillageId = table.Column<int>(type: "int", nullable: false)
//                        .Annotation("SqlServer:Identity", "1, 1"),
//                    VillageName = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    MandalId = table.Column<int>(type: "int", nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_Villages", x => x.VillageId);
//                });

//            migrationBuilder.CreateTable(
//                name: "FarmerPayment",
//                columns: table => new
//                {
//                    Id = table.Column<int>(type: "int", nullable: false)
//                        .Annotation("SqlServer:Identity", "1, 1"),
//                    FarmerId = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
//                    Bank = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    AccountNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    IFSC = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
//                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    ReferenceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
//                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
//                    Release = table.Column<bool>(type: "bit", nullable: false)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_FarmerPayment", x => x.Id);
//                    table.ForeignKey(
//                        name: "FK_FarmerPayment_Farmers_FarmerId",
//                        column: x => x.FarmerId,
//                        principalTable: "Farmers",
//                        principalColumn: "Id",
//                        onDelete: ReferentialAction.Cascade);
//                });

//            migrationBuilder.CreateIndex(
//                name: "IX_FarmerPayment_FarmerId",
//                table: "FarmerPayment",
//                column: "FarmerId");
//        }

//        /// <inheritdoc />
//        protected override void Down(MigrationBuilder migrationBuilder)
//        {
//            migrationBuilder.DropTable(
//                name: "Customers");

//            migrationBuilder.DropTable(
//                name: "Districts");

//            migrationBuilder.DropTable(
//                name: "Equipment");

//            migrationBuilder.DropTable(
//                name: "FarmerAddresses");

//            migrationBuilder.DropTable(
//                name: "FarmerPayment");

//            migrationBuilder.DropTable(
//                name: "IntegrationSettings");

//            migrationBuilder.DropTable(
//                name: "Mandals");

//            migrationBuilder.DropTable(
//                name: "States");

//            migrationBuilder.DropTable(
//                name: "Users");

//            migrationBuilder.DropTable(
//                name: "Villages");

//            migrationBuilder.DropTable(
//                name: "Farmers");
//        }
//    }
//}
