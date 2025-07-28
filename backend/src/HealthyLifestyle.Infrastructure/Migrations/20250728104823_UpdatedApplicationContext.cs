using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyLifestyle.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedApplicationContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserChallengeParticipation_AspNetUsers_UserId",
                table: "UserChallengeParticipation");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChallengeParticipation_SocialChallenges_ChallengeId",
                table: "UserChallengeParticipation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserChallengeParticipation",
                table: "UserChallengeParticipation");

            migrationBuilder.RenameTable(
                name: "UserChallengeParticipation",
                newName: "UserChallengeParticipations");

            migrationBuilder.RenameIndex(
                name: "IX_UserChallengeParticipation_UserId",
                table: "UserChallengeParticipations",
                newName: "IX_UserChallengeParticipations_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserChallengeParticipation_ChallengeId",
                table: "UserChallengeParticipations",
                newName: "IX_UserChallengeParticipations_ChallengeId");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "UserChallengeParticipations",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserChallengeParticipations",
                table: "UserChallengeParticipations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserChallengeParticipations_AspNetUsers_UserId",
                table: "UserChallengeParticipations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChallengeParticipations_SocialChallenges_ChallengeId",
                table: "UserChallengeParticipations",
                column: "ChallengeId",
                principalTable: "SocialChallenges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserChallengeParticipations_AspNetUsers_UserId",
                table: "UserChallengeParticipations");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChallengeParticipations_SocialChallenges_ChallengeId",
                table: "UserChallengeParticipations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserChallengeParticipations",
                table: "UserChallengeParticipations");

            migrationBuilder.RenameTable(
                name: "UserChallengeParticipations",
                newName: "UserChallengeParticipation");

            migrationBuilder.RenameIndex(
                name: "IX_UserChallengeParticipations_UserId",
                table: "UserChallengeParticipation",
                newName: "IX_UserChallengeParticipation_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserChallengeParticipations_ChallengeId",
                table: "UserChallengeParticipation",
                newName: "IX_UserChallengeParticipation_ChallengeId");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "UserChallengeParticipation",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserChallengeParticipation",
                table: "UserChallengeParticipation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserChallengeParticipation_AspNetUsers_UserId",
                table: "UserChallengeParticipation",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChallengeParticipation_SocialChallenges_ChallengeId",
                table: "UserChallengeParticipation",
                column: "ChallengeId",
                principalTable: "SocialChallenges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
