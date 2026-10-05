using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArukuNaati.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddBookingAdditionalFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdditionalNotes",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Crop",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CropStage",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreferredDate",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PreferredTime",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProblemPurpose",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ServiceRequired",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdditionalNotes",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "Crop",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "CropStage",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "PreferredDate",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "PreferredTime",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ProblemPurpose",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ServiceRequired",
                table: "Bookings");
        }
    }
}
