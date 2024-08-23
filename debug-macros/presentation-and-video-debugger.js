import xapi from 'xapi';

// Function to log events with detailed information
function logEvent(eventName, data) {
  console.log(`[${eventName}] Event Data:`, JSON.stringify(data, null, 2));
}

// Capture changes in presentation mode (e.g., Sharing, Idle)
xapi.Status.Video.Presentation.Mode.on((mode) => {
  logEvent('Presentation Mode', mode);
});

// Capture events related to video sharing activity (e.g., Start/Stop sharing)
xapi.Status.Video.Presentation.LocalInstance.on((instance) => {
  logEvent('Local Presentation Instance', instance);
});

// Capture changes in the content being presented
xapi.Status.Video.Presentation.Source.on((source) => {
  logEvent('Presentation Source', source);
});

// Capture input source changes for connected devices (e.g., HDMI, cameras)
xapi.Status.Video.Input.Connector.forEach((connector, index) => {
  xapi.Status.Video.Input.Connector[index + 1].SourceStatus.on((status) => {
    logEvent(`Connector[${index + 1}] SourceStatus`, status);
  });
});

// Capture events when output roles or screen configurations are changed
xapi.Config.Video.Output.Connector.forEach((connector, index) => {
  xapi.Config.Video.Output.Connector[index + 1].MonitorRole.on((role) => {
    logEvent(`Output Connector[${index + 1}] MonitorRole`, role);
  });
});

console.log('Presentation and Video Debugger is running. Start or stop a presentation to capture events.');
