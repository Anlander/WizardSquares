using Microsoft.AspNetCore.Mvc;
using Wizardworks.Server.Models;

namespace Wizardworks.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class SquareController : ControllerBase
{
    // Simple in-memory storage
    private static List<Square> _cubes = new List<Square>()
    {
         new Square { color = "#121212", position = 3},
         new Square { color = "#fff", position = 4},
         new Square { color = "#dedede", position = 5}
    };

    [HttpPost]
    public IActionResult AddCube([FromBody] Square square)
    {
        _cubes.Add(square);
        return Ok(square);
    }

    [HttpGet(Name = "GetCubeInformation")]
    public IActionResult GetCubes()
    {
        return Ok(_cubes);
    }
}
