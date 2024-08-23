import xapi from 'xapi';

// Function to log any events or status changes detected
function logEvent(eventName, data) {
  console.log(`[${eventName}] Event Data:`, JSON.stringify(data, null, 2));
}

// Listen for changes in input connector status
xapi.Status.Video.Input.Connector.on((status) => {
  logEvent('Input Connector Status', status);
});

// Listen for changes in input source status
xapi.Status.Video.Input.Connector.forEach((connector, index) => {
  xapi.Status.Video.Input.Connector[index + 1].SourceStatus.on((status) => {
    logEvent(`Connector[${index + 1}] SourceStatus`, status);
  });
});

// Listen for changes in connected sources
xapi.Status.Video.Input.Connector.forEach((connector, index) => {
  xapi.Status.Video.Input.Connector[index + 1].ConnectedSource.on((source) => {
    logEvent(`Connector[${index + 1}] ConnectedSource`, source);
  });
});

// Listen for changes in video source mode
xapi.Status.Video.Input.Connector.forEach((connector, index) => {
  xapi.Status.Video.Input.Connector[index + 1].Mode.on((mode) => {
    logEvent(`Connector[${index + 1}] Mode`, mode);
  });
});

// Listen for generic video input changes
xapi.Status.Video.Input.on((input) => {
  logEvent('Video Input Status', input);
});

// Listen for presentation source status
xapi.Status.Video.Presentation.on((presentation) => {
  logEvent('Presentation Status', presentation);
});

// Listen for video input availability
xapi.Status.Video.Input.Availability.on((availability) => {
  logEvent('Video Input Availability', availability);
});

// Listen for video source configuration changes
xapi.Config.Video.Input.Connector.forEach((connector, index) => {
  xapi.Config.Video.Input.Connector[index + 1].Source.on((source) => {
    logEvent(`Config Connector[${index + 1}] Source`, source);
  });
});

// Listen for any connector status changes at the system level
xapi.Status.Video.on((videoStatus) => {
  logEvent('Overall Video Status', videoStatus);
});

console.log('Debugging script is running. Plug/unplug HDMI to capture events.');
