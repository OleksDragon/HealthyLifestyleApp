using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyLifestyle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddExpertImageUrlsToRoleSpecificDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardPictureUrl",
                table: "TrainerDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExpertDetailsPictureUrl",
                table: "TrainerDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardPictureUrl",
                table: "PsychologistDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExpertDetailsPictureUrl",
                table: "PsychologistDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardPictureUrl",
                table: "DoctorDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExpertDetailsPictureUrl",
                table: "DoctorDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardPictureUrl",
                table: "DietitianDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExpertDetailsPictureUrl",
                table: "DietitianDetails",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardPictureUrl",
                table: "TrainerDetails");

            migrationBuilder.DropColumn(
                name: "ExpertDetailsPictureUrl",
                table: "TrainerDetails");

            migrationBuilder.DropColumn(
                name: "CardPictureUrl",
                table: "PsychologistDetails");

            migrationBuilder.DropColumn(
                name: "ExpertDetailsPictureUrl",
                table: "PsychologistDetails");

            migrationBuilder.DropColumn(
                name: "CardPictureUrl",
                table: "DoctorDetails");

            migrationBuilder.DropColumn(
                name: "ExpertDetailsPictureUrl",
                table: "DoctorDetails");

            migrationBuilder.DropColumn(
                name: "CardPictureUrl",
                table: "DietitianDetails");

            migrationBuilder.DropColumn(
                name: "ExpertDetailsPictureUrl",
                table: "DietitianDetails");
        }
    }
}
