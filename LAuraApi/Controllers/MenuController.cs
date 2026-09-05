using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LAuraApi.Models; 

namespace LAuraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly RestaurantContext _context;

        public MenuController(RestaurantContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItems()
        {
            return await _context.MenuItems.ToListAsync();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenuItem(int id, MenuItem menuItem)
        {
            if (id != menuItem.Id) return BadRequest();
            
            _context.Entry(menuItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);
            if (menuItem == null) return NotFound();

            _context.MenuItems.Remove(menuItem);
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<MenuItem>> PostMenuItem(MenuItem menuItem)
        {
            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMenuItems), new { id = menuItem.Id }, menuItem);
        }
    }
}
