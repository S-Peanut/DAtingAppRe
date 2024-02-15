using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;


namespace API.SignalR
{
[Authorize]
    public class PressenceHub : Hub
    {
        private readonly PresenceTracker __tracker;
        public PressenceHub(PresenceTracker _tracker)
        {
                __tracker = _tracker;
                
        }
        public override async Task OnConnectedAsync() {
                await __tracker.UserConnected(Context.User.GetUsername(), Context.ConnectionId);
                await Clients.Others.SendAsync("UserIsOnline", Context.User.GetUsername());

                var currentUsers = __tracker.GetOnlineUsers();
                await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {       await __tracker.UserDisconnected(Context.User.GetUsername(), Context.ConnectionId);
                await Clients.Others.SendAsync("UserIsOffline", Context.User.GetUsername());

                var currentUsers = await __tracker.GetOnlineUsers();
                await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
                await base.OnDisconnectedAsync(exception);
        }
        }
}