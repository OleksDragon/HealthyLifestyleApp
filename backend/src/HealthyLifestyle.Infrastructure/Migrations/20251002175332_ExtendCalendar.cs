using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyLifestyle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ExtendCalendar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NotificationBefore",
                table: "CalendarEvents",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TaskToDo",
                table: "CalendarEvents",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NotificationBefore",
                table: "CalendarEvents");

            migrationBuilder.DropColumn(
                name: "TaskToDo",
                table: "CalendarEvents");
        }
    }
}
