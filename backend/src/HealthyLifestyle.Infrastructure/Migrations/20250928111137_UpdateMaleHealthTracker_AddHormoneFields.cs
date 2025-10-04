using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyLifestyle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMaleHealthTracker_AddHormoneFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnergyLevelScore",
                table: "MaleHealthTrackers");

            migrationBuilder.AddColumn<double>(
                name: "Estradiol",
                table: "MaleHealthTrackers",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "FSH",
                table: "MaleHealthTrackers",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "FreeTestosterone",
                table: "MaleHealthTrackers",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LH",
                table: "MaleHealthTrackers",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Prolactin",
                table: "MaleHealthTrackers",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Estradiol",
                table: "MaleHealthTrackers");

            migrationBuilder.DropColumn(
                name: "FSH",
                table: "MaleHealthTrackers");

            migrationBuilder.DropColumn(
                name: "FreeTestosterone",
                table: "MaleHealthTrackers");

            migrationBuilder.DropColumn(
                name: "LH",
                table: "MaleHealthTrackers");

            migrationBuilder.DropColumn(
                name: "Prolactin",
                table: "MaleHealthTrackers");

            migrationBuilder.AddColumn<int>(
                name: "EnergyLevelScore",
                table: "MaleHealthTrackers",
                type: "int",
                nullable: true);
        }
    }
}
