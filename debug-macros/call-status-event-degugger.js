import xapi from 'xapi';

// Function to log events with detailed information
function logEvent(eventName, data) {
  console.log(`[${eventName}] Event Data:`, JSON.stringify(data, null, 2));
}

// Capture any call initiation, connection, or disconnection events
xapi.Status.Call.on((call) => {
  logEvent('Call Status', call);
});

// Capture events when a call is connected or disconnected
xapi.Event.CallSuccessful.on((event) => {
  logEvent('Call Successful', event);
});

xapi.Event.CallDisconnect.on((event) => {
  logEvent('Call Disconnected', event);
});

// Capture changes in call protocols (e.g., Webex, SIP, WebRTC)
xapi.Status.Call.Protocol.on((protocol) => {
  logEvent('Call Protocol', protocol);
});

console.log('Call Status and Event Debugger is running. Start or receive a call to capture events.');
