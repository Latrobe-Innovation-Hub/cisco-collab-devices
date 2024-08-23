# HDMI Auto-Present Macro for Cisco Devices

This macro automatically presents HDMI content on your Cisco Room device when connected, with conditional behavior based on the active meeting protocol. It runs in the background without requiring a user interface (UI) and is especially useful for scenarios where seamless content sharing is needed.

## Features
- **Automatic HDMI Content Sharing:** Automatically starts sharing HDMI content when the source is connected, as long as the active meeting is not WebRTC (e.g., Microsoft Teams).
- **Meeting Protocol Detection:** Detects whether the active meeting is WebRTC and prevents HDMI auto-presentation if WebRTC is in use, ensuring compatibility with platforms like Microsoft Teams.
- **Auto-Switching to Default Source:** If WebRTC is detected, the macro automatically switches to a preferred default source (e.g., the main camera) instead of the HDMI input.

## How It Works
The macro monitors the signal state of a specified HDMI connector. When content is detected, the macro automatically starts the presentation unless a WebRTC meeting is active. The macro also includes logic to handle changes in the main video source and presentation state.

## Configuration
The following variables can be customized based on your setup:
- **`CONNECTOR_ID`**: Set the ID for the HDMI input connector (default is 2).
- **`SOURCE_NAME`**: A descriptive name for the source (e.g., "PC 1 (HDMI)").
- **`DEFAULT_SOURCE_ID`**: The ID of your default source (e.g., main camera) to switch to when WebRTC is detected.

## Key Functionalities
1. **Signal State Monitoring**: The macro listens for changes in the signal state of the HDMI input. When content is detected (`SignalState: OK`), the macro triggers the presentation.
2. **WebRTC Detection**: The macro checks for WebRTC meetings (e.g., Microsoft Teams) and skips the auto-presentation if detected, switching to a default source instead.
3. **Source and Presentation Monitoring**: It also monitors changes in the main video source and presentation state, allowing for additional customization if needed.

## How to Use
1. Add the provided script to your Cisco Room device’s macros.
2. Configure the `CONNECTOR_ID`, `SOURCE_NAME`, and `DEFAULT_SOURCE_ID` variables according to your setup.
3. Run the macro to automatically manage HDMI content sharing based on meeting type and input status.

## Notes
- This macro runs entirely in the background without the need for user interaction.
- Ensure that your device’s HDMI connector ID matches the configured `CONNECTOR_ID` in the script.
- The macro is designed to prevent unintended disruptions during WebRTC calls, making it ideal for hybrid environments where multiple conferencing platforms are in use.
