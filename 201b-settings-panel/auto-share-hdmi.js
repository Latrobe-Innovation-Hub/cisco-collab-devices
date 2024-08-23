import xapi from 'xapi';

// Configuration - Set these values based on your codec
const CONNECTOR_ID = 3; // Set the connector ID for the HDMI input
const SOURCE_NAME = 'PC 1 (HDMI)'; // Set a descriptive name for the source
const DEFAULT_SOURCE_ID = 1; // Set this to your main camera or preferred source

// Flag to track whether the HDMI input is already presenting
let isPresenting = false;

// Function to detect the current meeting protocol (Webex, MS Teams, etc.)
async function getMeetingProtocol() {
  try {
    const calls = await xapi.Status.Call.get();
    if (calls.length > 0) {
      return calls[0].Protocol; // Returns the protocol, e.g., 'Webex', 'SIP', 'H323', or 'WebRTC'
    }
  } catch (error) {
    console.error("Error fetching call protocol:", error);
  }
  return null;
}

// Function to force the view to a different source
async function forceDefaultView() {
  console.log("Forcing view to the default source...");
  try {
    await xapi.Command.Video.Input.SetMainSource({ SourceId: DEFAULT_SOURCE_ID });
    console.log("View successfully switched to the default source.");
  } catch (error) {
    console.error("Error switching to the default source:", error);
  }
}

// Function to automatically start presenting HDMI input when connected (only if not in a WebRTC meeting)
async function autoPresentPC1() {
  if (isPresenting) return; // Prevent duplicate triggers
  const protocol = await getMeetingProtocol();
  
  if (protocol === 'WebRTC') {
    console.log(`WebRTC meeting detected. Skipping auto-presentation for ${SOURCE_NAME}.`);
    
    // Force the view away from HDMI during WebRTC
    forceDefaultView();
    return; // Skip if the meeting is WebRTC (e.g., Microsoft Teams)
  }

  console.log(`Running autoPresentPC1 function for ${SOURCE_NAME}...`);

  // Automatically start presenting using the presentation command
  xapi.Command.Presentation.Start({ ConnectorId: CONNECTOR_ID })
    .then(() => {
      console.log(`${SOURCE_NAME} connected and auto-presented using Presentation.Start.`);
      isPresenting = true; // Mark as presenting
    })
    .catch((error) => console.error(`Error auto-presenting ${SOURCE_NAME}:`, error));
}

// Listen for changes in signal state on the specified connector
xapi.Status.Video.Input.Connector[CONNECTOR_ID].SignalState.on((status) => {
  console.log(`SignalState Event Triggered on ${SOURCE_NAME}:`, status);
  
  if (status === 'OK') {
    autoPresentPC1();
  } else if (status === 'NotFound') {
    // Reset the presenting flag when the signal is lost
    isPresenting = false;
  }
});

// Listen for changes in the main video source (e.g., when "view" or "cancel" buttons are pressed)
xapi.Status.Video.Input.MainSource.on((source) => {
  console.log(`Main video source changed: ${JSON.stringify(source)}`);
  // Add additional logic here if needed
});

// Listen for changes in presentation state (e.g., screen share actions)
xapi.Status.UserInterface.Presentation.on((presentation) => {
  console.log(`Presentation state changed: ${JSON.stringify(presentation)}`);
  // Add additional logic here if needed
});

console.log(`HDMI auto-view macro for ${SOURCE_NAME} is running. Plug/unplug HDMI to test.`);
