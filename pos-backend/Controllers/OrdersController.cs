using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using pos_backend.Data;
using pos_backend.DTOs;
using pos_backend.Hubs;
using pos_backend.Models;
using System.Diagnostics;

namespace pos_backend.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<OrderHub> _hub;

        public OrdersController(AppDbContext context, IHubContext<OrderHub> hub)
        {
            _context = context;
            _hub = hub;
        }


        /// <summary>
        /// API lấy danh sách đơn hàng
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            try
            {
                var orders = await _context.Orders
                .Include(o => o.Items)
                .OrderByDescending(o => o.Id)
                .ToListAsync();

                return Ok(orders);

            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// API tạo đơn hàng
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderRequest request)
        {
            try
            {
                var order = new Order();

                foreach (var item in request.Items)
                {
                    var product = await _context.Products.FindAsync(item.ProductId);
                    if (product == null)
                    {
                        return BadRequest($"Product {item.ProductId} not found");
                    }

                    order.Items.Add(new OrderItem
                    {
                        ProductId = product.Id,
                        ProductName = product.Name,
                        Price = product.Price,
                        Quantity = item.Quantity
                    });

                    order.Total += product.Price * item.Quantity;
                }

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                await _hub.Clients.All.SendAsync("OrderCreated", order);

                return Ok(order);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
