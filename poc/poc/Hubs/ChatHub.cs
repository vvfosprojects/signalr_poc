using Microsoft.AspNetCore.SignalR;
using Poc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace poc.Hubs
{
    public class ChatHub:Hub
    {
        public async Task AddToGroup(string group)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, group);
            await base.OnConnectedAsync();
        }

        public async Task RemoveToGroup(string group)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
            await base.OnConnectedAsync();
        }

        public async Task SendMessage(ChatMessage message)
        {
            await Clients.Group(message.group).SendAsync("ReceiveMessage", message);
        }
    }
}
