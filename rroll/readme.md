Cisco Webex Room Device - Telehealth Portal WebView Macro
This repository contains a custom macro for Cisco Webex room devices that allows users to open a web page (such as a telehealth portal) directly from the Touch 10 or Navigator interface. The macro includes options for both opening and closing the web page with easy-access buttons.

Features
Open a WebView for the Telehealth Portal: Users can quickly access a web page (e.g., telehealth portal, informational site) by pressing a button on the Touch 10 or Navigator.
Secure Web Access: The macro can include basic authentication (username and password) if needed to access secure web portals.
Easily Close the WebView: A dedicated button is provided to clear the WebView and return to the standard interface.
User Interface
The buttons in the interface are designed as follows:

Open WebView: Button labeled "Open Telehealth Portal"
Close WebView: Button labeled "Close Telehealth Portal"


Script Explanation
The macro file is rroll.js. It includes functions to handle opening and closing a WebView on the Cisco Webex device:

Functions
openTelehealthWebPage(): Opens the default telehealth portal (currently set to https://google.com).
openTelehealthWebPage2(): Opens a different URL (currently set to a popular video) with the option to include basic authentication if needed.
closeTelehealthWebPage(): Closes the WebView, clearing the screen and returning to the default interface.
Button Controls
open_telehealth Button: Opens the telehealth portal (or any URL configured in the script).
close_telehealth Button: Closes the WebView and clears the screen.
Script Logic
The script listens for button press events using the Widget ID configured in the Extension Editor.
When the "Open Telehealth Portal" button is pressed, the selected web page is opened in a WebView.
When the "Close Telehealth Portal" button is pressed, the WebView is cleared.
How to Use
Upload the rroll.js script to your Cisco Webex room device through the Macro Editor.
Configure the UI buttons in the Extension Editor as shown in the screenshot.
Run the macro and test the functionality using the buttons.
Installation
Open the Macro Editor on your Cisco Webex device.
Create a new macro and paste the contents of the rroll.js script.
Save and activate the macro.
Ensure that the buttons are configured in the User Interface Extensions.
Troubleshooting
WebView Not Opening: Verify that the Widget IDs (open_telehealth, close_telehealth) match those configured in the script.
Error Opening WebView: Ensure that the device has internet access and that the URL is correct.
License
This project is licensed under the Cisco Sample Code License.
