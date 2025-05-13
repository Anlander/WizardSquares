using Microsoft.AspNetCore.Mvc;
using Wizardworks.Server.Models;

namespace Wizardworks.Server.Controllers;

[Route("[controller]")]
public class SquareController : ControllerBase
{
  private static List<Square> _squares = new List<Square>();

  [HttpPost]
  public IActionResult AddCube([FromBody] Square square)
  {
    _squares.Add(square);
    return Ok(square);
  }

  [HttpGet(Name = "GetCubeInformation")]
  public IActionResult GetCubes()
  {
    return Ok(_squares);
  }

  [HttpDelete]
  public IActionResult ClearAllCubes()
  {
    _squares.Clear();
    return Ok(new { message = "All squares cleared successfully" });
  }
}
