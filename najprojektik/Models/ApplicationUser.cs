using Microsoft.AspNetCore.Identity;

namespace najprojektik.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? guild {  get; set; }
        public int Xp { get; set; }
    }   
}