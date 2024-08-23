import xapi from 'xapi';

// Function to log events with detailed information
function logEvent(eventName, data) {
  console.log(`[${eventName}] Event Data:`, JSON.stringify(data, null, 2));
}

// Capture events related to IP address changes
xapi.Status.Network.IPV4.Address.on((address) => {
  logEvent('IPV4 Address', address);
});

// Capture network disconnection or reconnection events
xapi.Status.Network.Disconnect.on((status) => {
  logEvent('Network Disconnect', status);
});

xapi.Status.Network.Connect.on((status) => {
  logEvent('Network Connect', status);
});

// Capture DHCP lease changes
xapi.Status.Network.IPV4.DHCP.Address.on((address) => {
  logEvent('DHCP Lease Address', address);
});

console.log('Network and Connectivity Debugger is running. Monitor network status and IP changes.');
