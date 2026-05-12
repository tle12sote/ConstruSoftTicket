using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConstruSoftTicket.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCambios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ArchivoUrl",
                table: "Tickets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Categoria",
                table: "Tickets",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Prioridad",
                table: "Tickets",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArchivoUrl",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Categoria",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Prioridad",
                table: "Tickets");
        }
    }
}
