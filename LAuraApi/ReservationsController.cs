using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LAuraApi.Models; 

namespace LAuraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly RestaurantContext context;

        public ReservationsController(RestaurantContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await context.Reservations.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            context.Reservations.Add(reservation);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetReservations), new { id = reservation.Id }, reservation);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.Id) return BadRequest();

            context.Entry(reservation).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await context.Reservations.FindAsync(id);
            if (reservation == null) return NotFound();

            context.Reservations.Remove(reservation);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}