using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyLifestyle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RecipeMealEntrySetNullFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealEntries_Recipes_RecipeId",
                table: "MealEntries");

            migrationBuilder.AddForeignKey(
                name: "FK_MealEntries_Recipes_RecipeId",
                table: "MealEntries",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealEntries_Recipes_RecipeId",
                table: "MealEntries");

            migrationBuilder.AddForeignKey(
                name: "FK_MealEntries_Recipes_RecipeId",
                table: "MealEntries",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
