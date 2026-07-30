using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArukuNaati.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddEquipmentNumberToEquipment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Farmers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EquipmentNumber",
                table: "Equipment",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Farmers");

            migrationBuilder.DropColumn(
                name: "EquipmentNumber",
                table: "Equipment");
        }
    }
}
