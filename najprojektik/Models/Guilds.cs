using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;

namespace najprojektik.Models
{
    public class Guilds
    {
        [Key]
        public int Id { get; set; } = default!;
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int MaxMembers { get; set; }

        public ICollection<ApplicationUser> Members { get; } = new List<ApplicationUser>();
    }
}
