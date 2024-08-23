import xapi from 'xapi';

// Function to log events with detailed information
function logEvent(eventName, data) {
  console.log(`[${eventName}] Event Data:`, JSON.stringify(data, null, 2));
}

// Capture connectivity status of devices connected via HDMI
xapi.Status.Video.Output.Connector.forEach((connector, index) => {
  xapi.Status.Video.Output.Connector[index + 1].ConnectedDevice.on((device) => {
    logEvent(`Output Connector[${index + 1}] ConnectedDevice`, device);
  });
});

// Capture connection and disconnection events for external devices
xapi.Status.Video.Input.Connector.forEach((connector, index) => {
  xapi.Status.Video.Input.Connector[index + 1].ConnectedSource.on((source) => {
    logEvent(`Input Connector[${index + 1}] ConnectedSource`, source);
  });
});

// Capture events related to EDID and HDMI handshake status
xapi.Status.Video.Output.Connector.forEach((connector, index) => {
  xapi.Status.Video.Output.Connector[index + 1].EDID.on((edid) => {
    logEvent(`Output Connector[${index + 1}] EDID Status`, edid);
  });
});

console.log('Device Connectivity and Diagnostic Debugger is running. Connect/disconnect devices to capture events.');
