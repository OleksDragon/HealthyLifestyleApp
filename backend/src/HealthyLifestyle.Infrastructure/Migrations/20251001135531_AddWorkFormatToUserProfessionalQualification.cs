using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyLifestyle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkFormatToUserProfessionalQualification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WorkFormat",
                table: "UserProfessionalQualifications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkFormat",
                table: "UserProfessionalQualifications");
        }
    }
}
