using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using najprojektik;
using najprojektik.Data;
using najprojektik.Models;
using System.Security.Claims;

[ApiController]
[Route("[controller]")]

public class UsersController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;
    private readonly ApplicationDbContext _context;

    public UsersController(ILogger<UsersController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public ActionResult<DTO> Get()
    {
        var currentUser = GetCurrentUser();
        var info = new DTO
        {
            Xp = currentUser.Xp,
            Guild = currentUser.Guilds.Name,
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


    [HttpPut]
    [Route("joinGuild")]
    public async Task<IActionResult> JoinGuild(int id)
    {
        var currentUser = GetCurrentUser();
        var newGuild = await _context.Guild.FindAsync(id);

        if (newGuild == null)
        {
            return NotFound();
        }

        currentUser.Guilds = newGuild;
        await _context.SaveChangesAsync();

        return NoContent();
    }


    [HttpPut]
    [Route("leaveGuild")]
    public async Task<IActionResult> LeaveGuild()
    {
        var currentUser = GetCurrentUser();

        if (currentUser.Guilds == null)
        {
            return NotFound();
        }

        currentUser.Guilds = null;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet]
    [Route("getUsersInGuild")]
    public IEnumerable<DTO> GetGuildById(int id)
    {
        return _context.Users
            .Include(user => user.Guilds)
            .Where(user => user.Guilds.Id == id)
            .Select(user => new DTO
            {
                Guild = user.Guilds.Name,
                UserName = user.UserName,
                Email = user.Email,
                Xp = user.Xp
            });
    }

}


