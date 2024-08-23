# 201B Presentation Space Control Macro for Cisco Devices

This repository contains a set of macros and a UI panel designed to control various AV systems and presentation settings in the 201B Presentation Space. The solution provides a highly integrated experience for managing projectors, screen roles, input sources, presentation presets, and more.

## Features

- **Projector Control:** Turn the projector on and off with a single button press.
- **Screen Role Management:** Set screens to display the same content or toggle between predefined roles.
- **Input Source Control:** Seamlessly switch between different inputs, including HDMI and other connected devices.
- **Presentation Presets:** Quickly recall different video configurations for various scenarios.
- **Automatic HDMI Presentation:** Automatically share HDMI input when connected, excluding specific meeting protocols like WebRTC (e.g., Microsoft Teams).
- **Theme Switching:** Toggle between light and dark modes for the UI interface.

## How It Works

The solution is built using a combination of Cisco xAPI macros and a custom UI panel. The macros listen for user interactions and perform actions such as switching inputs, controlling projectors, and recalling presentation presets. The HDMI auto-presentation macro ensures that connected devices are automatically displayed, improving ease of use during meetings.

## UI Panel Structure

The UI panel is organized into different sections, each providing control over specific aspects of the presentation space:

1. **System Controls:**
    - **Projector Control:** Buttons for turning the projector on or off.
    - **Default Input Selection:** Button to reset the input source to the default option.

2. **Video Presets:**
    - Buttons to recall various preset video configurations tailored for different scenarios.

3. **Mode Switching:**
    - Buttons to switch between light and dark themes for the interface.

4. **Screen Role Management:**
    - Set both screens to display the same content or toggle screen roles between predefined settings.

## Usage

### Installation

1. Upload the `panel-201b-ui.xml` file as a UI extension in the Cisco Room device settings.
2. Add the following macro files to the Cisco Room device’s Macro Editor:
    - `201b-panel.js`: Handles panel interactions and controls AV systems.
    - `auto-share-hdmi.js`: Automatically shares the HDMI input when connected.
    - `screen-roll-setting.js`: Manages screen role switching and screen mirroring.

3. Ensure the macros and UI panel are activated.

### Configuring Devices

- **Device URLs:** Update the `DEVICE_URLS` array in the `201b-panel.js` file to match the IP addresses of the devices being controlled.
- **Server URL:** Set the `SERVER_URL` for any additional API integrations needed, such as controlling external devices or logging system information.

### Operating the Macro

1. Access the **System Controls** panel from the Home Screen of the Cisco Touch 10 interface.
2. Use the buttons provided to manage projector states, input sources, screen roles, and video presets.
3. The HDMI auto-presentation feature will automatically start sharing the connected HDMI input unless the meeting is detected as a WebRTC (Microsoft Teams) meeting, in which case it remains inactive.

### Customization

You can customize the following elements in the macros:

- **Input Source IDs:** Adjust the connector IDs in the macros to match your specific room setup.
- **Presentation Presets:** Update the preset numbers to match the video configurations used in your environment.
- **Screen Roles:** Define new screen role configurations based on room requirements.

## Example UI Layout

The UI panel is designed for easy navigation with clearly labeled buttons for each function:

```
| Projector          | On     | Off   | Default Input |
| Video Presets      | 1      | 2     | 3     | 4      |
| Mode               | Light  | Dark  |
| Screen Roles       | [X] [O] | [O] [X] | [X] [X] |
```

## Notes

- Ensure your network permits HTTP requests from the Cisco Room device to any external devices.
- The macros are designed to handle both single and group actions for easier control.
- The panel layout is flexible and can be further customized to accommodate additional control needs.

## Known Limitations

- The current setup is optimized for predefined device configurations. Additional devices may require further customization.
- WebRTC meetings (e.g., Microsoft Teams) may override screen role settings due to automatic mirroring, which is managed in the macros.
