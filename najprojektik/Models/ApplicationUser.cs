using Microsoft.AspNetCore.Identity;

namespace najprojektik.Models
{
    public class ApplicationUser : IdentityUser
    {

        public int Xp { get; set; }

        public Guilds? Guilds { get; set; }
    }
}