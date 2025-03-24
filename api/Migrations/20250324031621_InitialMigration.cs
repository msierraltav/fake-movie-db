using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NameBasics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nconst = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrimaryName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthYear = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeathYear = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrimaryProfession = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KnownForTitles = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NameBasics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TitleBasics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tconst = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TitleType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrimaryTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OriginalTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsAdult = table.Column<bool>(type: "bit", nullable: false),
                    StartYear = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndYear = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RuntimeMinutes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Genres = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TitleBasics", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NameBasics");

            migrationBuilder.DropTable(
                name: "TitleBasics");
        }
    }
}
