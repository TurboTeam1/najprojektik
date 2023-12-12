using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using najprojektik;
using najprojektik.Data;
using najprojektik.DTO_s;
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
    public ActionResult<UserDto> Get()
    {
        var currentUser = GetCurrentUser();
        var info = new UserDto
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
    private int GetguildMembersCount(int guildId)
    {
        IQueryable<ApplicationUser> users = _context.Users.Include(applicationUser => applicationUser.Guilds).AsNoTracking();

        return users.Where(u => u.Guilds.Id == guildId).Count();
    }

    public IEnumerable<UserDto> MapUserToDto(int id)
    {
        return _context.Users
            .Include(user => user.Guilds)
            .Where(user => user.Guilds.Id == id)
            .Select(user => new UserDto
            {
                Guild = user.Guilds.Name,
                UserName = user.UserName,
                Email = user.Email,
                Xp = user.Xp
            });
    }

    [HttpPut]
    [Route("joinGuild")]
    public ActionResult JoinGuild(int id)
    {
        var currentUser = GetCurrentUser();
        var newGuild = _context.Guild.Find(id);

        if (newGuild == null)
        {
            return NotFound();
        }

        currentUser.Guilds = newGuild;
        _context.SaveChanges();

        return Ok(
            new GuildDetailDto
            {
                Id = newGuild.Id,
                Name = newGuild.Name,
                Description = newGuild.Description,
                MaxMembers = newGuild.MaxMembers,
                MembersCount = GetguildMembersCount(newGuild.Id),
                Users = MapUserToDto(newGuild.Id)
            });
    }


    [HttpPut]
    [Route("leaveGuild")]
    public ActionResult LeaveGuild(int id)
    {
        var currentUser = GetCurrentUser();
        var newGuild = _context.Guild.Find(id);
        if (currentUser.Guilds == null)
        {
            return NotFound();
        }

        currentUser.Guilds = null;
        _context.SaveChanges();

        return Ok(
            new GuildDetailDto
            {
                Id = newGuild.Id,
                Name = newGuild.Name,
                Description = newGuild.Description,
                MaxMembers = newGuild.MaxMembers,
                MembersCount = GetguildMembersCount(newGuild.Id),
                Users = MapUserToDto(newGuild.Id)
            });
    }

    [HttpGet]
    [Route("getUsersInGuild")]
    public IEnumerable<UserDto> GetGuildById(int id)
    {
        return _context.Users
            .Include(user => user.Guilds)
            .Where(user => user.Guilds.Id == id)
            .Select(user => new UserDto
            {
                Guild = user.Guilds.Name,
                UserName = user.UserName,
                Email = user.Email,
                Xp = user.Xp
            });
    }

}


