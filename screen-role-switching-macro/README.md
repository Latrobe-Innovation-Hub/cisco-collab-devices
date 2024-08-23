# Cisco Webex Room Device Screen Role Switching Macro

This repository contains a custom macro for Cisco Webex room devices to dynamically manage screen roles based on user interactions and meeting contexts. The macro is designed to automatically configure screen content sharing during Microsoft Teams (WebRTC) meetings, as well as provide users with control over screen roles through a simple button interface.

## Features

- **Auto Configuration for Microsoft Teams (WebRTC) Meetings**: Automatically sets both screens to display the same content during WebRTC meetings, such as Microsoft Teams.
- **User-Controlled Screen Role Switching**: Allows users to switch between different screen configurations using easy-access buttons on the Touch 10 or Navigator interface.
- **Button-Based Controls**: Users can toggle between primary/secondary roles for each display or set both screens to show the same content with a single button press.

## User Interface

The buttons in the interface are designed as follows:

- **Left Display Primary, Right Display Secondary**: `[X] [O]`
- **Left Display Primary, Right Display Primary**: `[O] [X]`
- **Both Displays Show the Same Content**: `[X] [X]`

![User Interface](Screenshot%202024-08-23%20115858.png)

## Script Explanation

The primary macro file is `screen-role-switching.js`. It performs the following key functions:

1. **Detects the Current Meeting Protocol**: Identifies if the ongoing meeting is using WebRTC (Microsoft Teams) and automatically configures the screens for optimal display.

2. **Auto-Configuration for WebRTC Meetings**: If the meeting is detected as WebRTC (e.g., Microsoft Teams), the macro automatically mirrors the content on both screens, ensuring a consistent user experience.

3. **Manual Role Switching via Buttons**: Users can manually switch the screen roles using the buttons configured in the Extension Editor. The macro listens for button presses and adjusts the screen roles accordingly.

### Button Controls

- **`flip-1` Button**: Sets the left display as primary and the right display as secondary.
- **`flip-2` Button**: Sets the right display as primary and the left display as secondary.
- **`set_screens_same` Button**: Sets both displays to show the same content.

### Script Logic

- The macro first checks for the meeting protocol. If the protocol is WebRTC, the screen roles are set to show the same content.
- In non-WebRTC contexts, users have full control over screen roles using the buttons.
- The script ensures that the screen roles are always correctly set based on the user’s input or the meeting context.

## How to Use

1. Upload the `screen-role-switching.js` script to your Cisco Webex room device through the Macro Editor.
2. Configure the UI buttons in the Extension Editor as shown in the screenshot.
3. Run the macro and test the functionality using the buttons and during WebRTC (Microsoft Teams) meetings.

### Installation

1. Open the Macro Editor on your Cisco Webex device.
2. Create a new macro and paste the contents of the `screen-role-switching.js` script.
3. Save and activate the macro.
4. Ensure that the buttons are configured in the User Interface Extensions.

## Troubleshooting

- **Buttons Not Working**: Ensure the widget IDs (`flip-1`, `flip-2`, `set_screens_same`) match those configured in the script.
- **Screen Role Issues During WebRTC Meetings**: The macro is designed to handle WebRTC-specific configurations automatically. If issues persist, verify that the monitor roles are set correctly.

## License

This project is licensed under the Cisco Sample Code License.

---

Enjoy seamless screen role switching with this easy-to-use Cisco Webex macro!
