using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using najprojektik;
using najprojektik.Data;
using najprojektik.Models;
using System.Security.Claims;


[Route("api/[controller]")]
[ApiController]

public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<DTO> Get()
    {
        var currentUser = GetCurrentUser();

        var info = new DTO
        {
            Xp = currentUser.Xp,
            Guild = currentUser.Guilds.Name
        };

        return info;

    }

    private ApplicationUser GetCurrentUser()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        ApplicationUser? user = _context.Users
            .Include(user => user.Guilds)
            .SingleOrDefault(user => user.Id == userId);
        

        return user!;
    }
}