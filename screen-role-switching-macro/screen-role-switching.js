import xapi from 'xapi';

// Function to detect the current meeting protocol (Webex, MS Teams, etc.)
function getMeetingProtocol() {
  return xapi.Status.Call.get()
    .then((calls) => {
      if (calls.length > 0) {
        return calls[0].Protocol; // Returns the protocol, e.g., 'Webex', 'SIP', 'H323', or 'WebRTC'
      }
      return null;
    })
    .catch((error) => {
      console.error("Error fetching call protocol:", error);
      return null;
    });
}

// Function to automatically set both screens to the same content in MS Teams (WebRTC) meetings
function autoSetScreensForWebRTC() {
  getMeetingProtocol().then((protocol) => {
    if (protocol === 'WebRTC') {
      // Set both screens to the same content automatically in MS Teams (WebRTC)
      xapi.Config.Video.Output.Connector[1].MonitorRole.set('First')
        .then(() => console.log("WebRTC detected: Connector 1 MonitorRole set to 'First'"))
        .catch((error) => console.error("Error setting Connector 1 MonitorRole:", error));

      xapi.Config.Video.Output.Connector[2].MonitorRole.set('First')
        .then(() => console.log("WebRTC detected: Connector 2 MonitorRole set to 'First'"))
        .catch((error) => console.error("Error setting Connector 2 MonitorRole:", error));
    }
  });
}

// Listen for active calls and automatically set screen roles for WebRTC (MS Teams)
xapi.Status.Call.on((call) => {
  if (call.Status === 'Connected') {
    autoSetScreensForWebRTC();
  }
});

// Function to set both screens to display the same content
function setScreensToSame() {
  xapi.Config.Video.Output.Connector[1].MonitorRole.set('First')
    .then(() => console.log("Connector 1 MonitorRole set to 'First'"))
    .catch((error) => console.error("Error setting Connector 1 MonitorRole:", error));

  xapi.Config.Video.Output.Connector[2].MonitorRole.set('First')
    .then(() => console.log("Connector 2 MonitorRole set to 'First'"))
    .catch((error) => console.error("Error setting Connector 2 MonitorRole:", error));
}

// Listen for button press events from the Extension Editor
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.Type === 'clicked') {
    getMeetingProtocol().then((protocol) => {
      if (protocol !== 'WebRTC') {
        // Allow screen flip actions in all contexts except WebRTC (MS Teams)
        if (event.WidgetId === "flip-1") {
          xapi.Config.Video.Output.Connector[1].MonitorRole.set('First')
            .then(() => console.log("Connector 1 MonitorRole set to 'First'"))
            .catch((error) => console.error("Error setting Connector 1 MonitorRole:", error));

          xapi.Config.Video.Output.Connector[2].MonitorRole.set('Second')
            .then(() => console.log("Connector 2 MonitorRole set to 'Second'"))
            .catch((error) => console.error("Error setting Connector 2 MonitorRole:", error));
        } else if (event.WidgetId === "flip-2") {
          xapi.Config.Video.Output.Connector[1].MonitorRole.set('Second')
            .then(() => console.log("Connector 1 MonitorRole set to 'Second'"))
            .catch((error) => console.error("Error setting Connector 1 MonitorRole:", error));

          xapi.Config.Video.Output.Connector[2].MonitorRole.set('First')
            .then(() => console.log("Connector 2 MonitorRole set to 'First'"))
            .catch((error) => console.error("Error setting Connector 2 MonitorRole:", error));
        }
      } else {
        // Skip role changes in WebRTC (MS Teams) as screens are already mirrored
        console.log("WebRTC detected. Skipping manual role changes.");
      }

      // Handle the "set both screens to the same content" button in all contexts
      if (event.WidgetId === 'set_screens_same') {
        setScreensToSame();
      }
    });
  }
});
