using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyLifestyle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRecipeIdToMealEntries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ImageUrl",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FoodItemName",
                table: "MealEntries",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<Guid>(
                name: "RecipeId",
                table: "MealEntries",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MealEntries_RecipeId",
                table: "MealEntries",
                column: "RecipeId");

            migrationBuilder.AddForeignKey(
                name: "FK_MealEntries_Recipes_RecipeId",
                table: "MealEntries",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealEntries_Recipes_RecipeId",
                table: "MealEntries");

            migrationBuilder.DropIndex(
                name: "IX_MealEntries_RecipeId",
                table: "MealEntries");

            migrationBuilder.DropColumn(
                name: "RecipeId",
                table: "MealEntries");

            migrationBuilder.AlterColumn<string>(
                name: "ImageUrl",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FoodItemName",
                table: "MealEntries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
