using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArukuNaati.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddFarmerPaymentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Bags",
                table: "Procurements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Fpo",
                table: "Procurements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Grade",
                table: "Procurements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LotNo",
                table: "Procurements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Moisture",
                table: "Procurements",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Quality",
                table: "Procurements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "FarmerPayments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FarmerCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FarmerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BankName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IFSCCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReferenceNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Release = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FarmerPayments", x => x.PaymentId);
                });

            migrationBuilder.CreateTable(
                name: "QualityInspections",
                columns: table => new
                {
                    QualityInspectionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProcurementId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Moisture = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Damage = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ripeness = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ForeignMaterial = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QualityGrade = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Inspector = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualityInspections", x => x.QualityInspectionId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FarmerPayments");

            migrationBuilder.DropTable(
                name: "QualityInspections");

            migrationBuilder.DropColumn(
                name: "Bags",
                table: "Procurements");

            migrationBuilder.DropColumn(
                name: "Fpo",
                table: "Procurements");

            migrationBuilder.DropColumn(
                name: "Grade",
                table: "Procurements");

            migrationBuilder.DropColumn(
                name: "LotNo",
                table: "Procurements");

            migrationBuilder.DropColumn(
                name: "Moisture",
                table: "Procurements");

            migrationBuilder.DropColumn(
                name: "Quality",
                table: "Procurements");
        }
    }
}
