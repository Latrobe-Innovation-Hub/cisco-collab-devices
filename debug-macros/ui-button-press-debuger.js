import xapi from 'xapi';

// Function to log events with detailed information
function logEvent(eventName, data) {
  console.log(`[${eventName}] Event Data:`, JSON.stringify(data, null, 2));
}

// Capture any button presses on the standard UI, including 'Share', 'Cancel', and others
xapi.Event.UserInterface.Extensions.Widget.Action.on((event) => {
  logEvent('Widget Action', event);
});

// Capture all user interface commands, including touch panel interactions
xapi.Event.UserInterface.Extensions.Panel.Clicked.on((event) => {
  logEvent('Panel Clicked', event);
});

// Capture all taps and interactions on the touch panel UI
xapi.Event.UserInterface.Extensions.Panel.on((event) => {
  logEvent('Panel Event', event);
});

// Capture any event changes for video sharing status
xapi.Status.Video.Presentation.Mode.on((mode) => {
  logEvent('Presentation Mode', mode);
});

// Capture changes in presentation sources
xapi.Status.Video.Presentation.Source.on((source) => {
  logEvent('Presentation Source', source);
});

// Capture video sharing activity when 'Share' or 'Stop Sharing' buttons are pressed
xapi.Status.Video.Presentation.LocalInstance.on((instance) => {
  logEvent('Local Presentation Instance', instance);
});

// Log any changes to output configuration (e.g., when content is shared to a screen)
xapi.Config.Video.Output.Connector.forEach((connector, index) => {
  xapi.Config.Video.Output.Connector[index + 1].MonitorRole.on((role) => {
    logEvent(`Output Connector[${index + 1}] MonitorRole`, role);
  });
});

console.log('UI Button Press Debugger is running. Interact with the touch panel or share screen to capture events.');
