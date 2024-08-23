import xapi from 'xapi';

// Function to log events with detailed information
function logEvent(eventName, data) {
  console.log(`[${eventName}] Event Data:`, JSON.stringify(data, null, 2));
}

// Capture microphone mute/unmute events
xapi.Status.Audio.Microphones.Mute.on((status) => {
  logEvent('Microphone Mute Status', status);
});

// Capture volume level changes
xapi.Status.Audio.Volume.Level.on((level) => {
  logEvent('Volume Level', level);
});

// Capture speaker mute/unmute events
xapi.Status.Audio.Output.Line.Mute.on((status) => {
  logEvent('Speaker Mute Status', status);
});

console.log('Audio Input/Output Debugger is running. Adjust microphone or speaker settings to capture events.');
