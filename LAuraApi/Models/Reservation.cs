namespace LAuraApi.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string Guests { get; set; }
        public string Status { get; set; } = "Pending";
    }
}