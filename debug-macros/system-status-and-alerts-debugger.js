import xapi from 'xapi';

// Function to log events with detailed information
function logEvent(eventName, data) {
  console.log(`[${eventName}] Event Data:`, JSON.stringify(data, null, 2));
}

// Capture system alerts (e.g., temperature warnings, network issues)
xapi.Status.SystemUnit.State.Operational.on((state) => {
  logEvent('System Operational State', state);
});

// Capture uptime status changes
xapi.Status.SystemUnit.Uptime.on((uptime) => {
  logEvent('System Uptime', uptime);
});

// Capture events when the system reboots or restarts
xapi.Event.SystemUnit.Restart.on((event) => {
  logEvent('System Restart', event);
});

// Capture temperature warnings and alerts
xapi.Status.SystemUnit.Hardware.Module.Temperature.Status.on((tempStatus) => {
  logEvent('Temperature Status', tempStatus);
});

// Capture power cycle events
xapi.Event.SystemUnit.Power.Cycle.on((event) => {
  logEvent('Power Cycle', event);
});

console.log('System Status and Alerts Debugger is running. Monitor for system events and alerts.');
