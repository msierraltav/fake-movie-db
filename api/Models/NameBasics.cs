using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace api.Models
{
    public class NameBasics {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Nconst { get; set; }
    public string PrimaryName { get; set; }
    public string BirthYear { get; set; }
    public string DeathYear { get; set; }
    public string PrimaryProfession { get; set; }
    [ForeignKey("KnownForTitles")]    
    public string KnownForTitles { get; set; }
}
}


