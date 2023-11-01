using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace najprojektik.Data.Migrations
{
    /// <inheritdoc />
    public partial class gec : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MembersCount",
                table: "Guild",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MembersCount",
                table: "Guild");
        }
    }
}
