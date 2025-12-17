using Microsoft.AspNetCore.SignalR;
using pos_backend.Models;
using System.Diagnostics;
namespace pos_backend.Hubs
{
    public class OrderHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            Debug.WriteLine($"Connected: {Context.ConnectionId}");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            Debug.WriteLine($"Disconnected: {Context.ConnectionId}");
            await base.OnDisconnectedAsync(exception);
        }
    }
}
