# Telehealth Web Portal Demo Macro

This repository contains a demonstration macro designed for Cisco Webex room devices that provides quick access to a telehealth portal via the Touch 10 or Navigator interface. The macro includes options for securely opening a web page and closing it when no longer needed.

## Features

- **Open the Telehealth Web Portal with Authentication**: Securely access a telehealth web page using basic authentication (username and password) embedded within the URL.
- **Alternate Web Page Access**: An option to open a different web page, such as a public-facing site, is included in the demo.
- **Close the WebView Easily**: Users can quickly close the web page and return to the default interface with a dedicated button.

## Script Overview

The macro file is `telehealth-demo.js`, and it includes functions to handle the following tasks:

### Functions

- **`openTelehealthWebPage()`**: Opens the default web page (`https://google.com`) as a simple example.
- **`openTelehealthWebPage2()`**: Opens a telehealth portal with embedded basic authentication credentials (`telehealth:latrobe`). This is useful for securely accessing restricted web portals.
- **`closeTelehealthWebPage()`**: Closes the WebView, clearing the content from the screen and returning to the main interface.

### Button Controls

- **`open_telehealth` Button**: Triggers the opening of the telehealth portal.
- **`close_telehealth` Button**: Closes the WebView and clears the screen.

### Script Logic

- The script listens for button press events using the Widget IDs configured in the Extension Editor.
- When the "Open Telehealth Portal" button is pressed, the secure telehealth portal is opened.
- When the "Close Telehealth Portal" button is pressed, the WebView is cleared.

## How to Use

1. Upload the `telehealth-demo.js` script to your Cisco Webex room device using the Macro Editor.
2. Configure the UI buttons in the Extension Editor with Widget IDs: `open_telehealth` and `close_telehealth`.
3. Run the macro and test the functionality using the buttons.

### Installation Steps

1. Open the Macro Editor on your Cisco Webex device.
2. Create a new macro and paste the contents of the `telehealth-demo.js` script.
3. Save and activate the macro.
4. Set up the buttons in the User Interface Extensions to match the Widget IDs in the script.

### Example Interface

The UI includes two buttons:
- **"Open Telehealth Portal"**: Opens the secure telehealth portal.
- **"Close Telehealth Portal"**: Closes the WebView.

## Troubleshooting

- **WebView Not Opening**: Ensure that the Widget IDs (`open_telehealth`, `close_telehealth`) match those configured in the script.
- **Authentication Issues**: Verify that the username and password are correct in the URL used in `openTelehealthWebPage2`.
- **Error Opening the Web Page**: Check the network connection and ensure that the device has access to the specified URL.

## License

This project is licensed under the Cisco Sample Code License.

---

This macro provides an easy way to integrate web-based telehealth portals directly into Cisco Webex room devices, offering quick access with simple touch controls.
