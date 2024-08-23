import xapi from 'xapi';

// Function to log events with detailed information
function logEvent(eventName, data) {
  console.log(`[${eventName}] Event Data:`, JSON.stringify(data, null, 2));
}

// Capture button clicks across all UI screens
xapi.Event.UserInterface.Extensions.Widget.Action.on((event) => {
  logEvent('Widget Action', event);
});

// Capture swipes and other touch interactions
xapi.Event.UserInterface.Extensions.Panel.Clicked.on((event) => {
  logEvent('Panel Clicked', event);
});

// Capture navigation between different UI panels and pages
xapi.Event.UserInterface.Extensions.Page.on((event) => {
  logEvent('Page Navigation', event);
});

console.log('Touch Panel Interaction Debugger is running. Interact with the touch panel to capture events.');
