namespace pos_backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public decimal Total { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public List<OrderItem> Items { get; set; } = new();
    }
}
