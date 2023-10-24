using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace najprojektik.Data.Migrations
{
    /// <inheritdoc />
    public partial class Guilds2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GuildsId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_GuildsId",
                table: "AspNetUsers",
                column: "GuildsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Guild_GuildsId",
                table: "AspNetUsers",
                column: "GuildsId",
                principalTable: "Guild",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Guild_GuildsId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_GuildsId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GuildsId",
                table: "AspNetUsers");
        }
    }
}
