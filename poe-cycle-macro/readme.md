# Cisco Webex Device Macro: PoE Port Cycle and System Control

This repository provides a macro for Cisco Webex devices to manage Power over Ethernet (PoE) ports, ping testing, Wake-on-LAN (WoL), and device reboot/shutdown commands. It integrates with a Flask API backend for network device control, enabling centralized management for IT and AV administrators.

## Table of Contents

- [Features](#features)
- [Usage Scenarios](#usage-scenarios)
- [How It Works](#how-it-works)
- [Configuration](#configuration)
- [Systemd Service for PoE API](#systemd-service-for-poe-api)
- [Example Workflow](#example-workflow)
- [Integration with Control Panel](#integration-with-control-panel)
- [Example UI Panel (Demo)](#example-ui-panel-demo)
- [UI Preview](#ui-preview)
- [Installation](#installation)
- [API Documentation](poe-flask-api/README.md)

## Features

- **Cycle PoE Ports:** Remotely toggle PoE ports to power cycle connected devices.
- **Ping Test:** Test the connectivity to a specified API endpoint.
- **Wake-on-LAN (WoL):** Send magic packets to wake up devices based on their MAC addresses.
- **Reboot and Shutdown Controls:** Remotely reboot or shut down devices in different rooms, providing centralized management.

## Usage Scenarios

This macro is ideal for managing AV and IT devices in environments like presentation spaces, classrooms, or conference rooms. It integrates seamlessly into existing control interfaces on Cisco Webex devices, allowing administrators to remotely manage devices such as projectors, PCs, or other network-enabled equipment.

## How It Works

The macro listens for button presses from a Cisco Webex device's UI panel and sends HTTP requests to the Flask API backend. The key features include:

- **Flask API Integration:** Executes PoE cycling, ping tests, and WoL commands by interacting with a backend API.
- **UI Widget Listeners:** Reacts to button clicks from the Webex device's UI to perform actions like PoE cycling or device reboot.
- **Alert Feedback:** Displays success or error messages on the Cisco Webex device to indicate the result of each action.

## Configuration

1. **API URLs:** In the `poe-cycle.js` file, update the `flaskApiUrl`, `pingUrl`, and other endpoint URLs to match your backend Flask API deployment.
2. **MAC Addresses:** Configure the MAC addresses of the devices you wish to manage for Wake-on-LAN functionality.
3. **Room and Host Codes:** Modify room and host codes in the reboot and shutdown functions to fit your environment.

## Systemd Service for PoE API

The backend Flask API is managed as a systemd service for reliable and continuous operation. The systemd service ensures that the Flask API remains available on system reboot.

### Service Configuration

The systemd service file (`host_wol_service.service`) is located in the `poe-flask-api` directory. Below is the structure for the PoE API:

```ini
[Unit]
Description=Flask Application for PoE Control and Wake-on-LAN
After=network.target

[Service]
User=andy
Group=andy
WorkingDirectory=/home/andy/poe-flask-api/
Environment="PATH=/home/andy/myenv/bin"
ExecStart=/home/andy/myenv/bin/python /home/andy/poe-flask-api/app.py

[Install]
WantedBy=multi-user.target
```

### Managing the PoE API Service

1. **Start the Service**:
   ```bash
   sudo systemctl start host_wol_service.service
   ```

2. **Enable the Service on Boot**:
   ```bash
   sudo systemctl enable host_wol_service.service
   ```

3. **Check Service Status**:
   ```bash
   sudo systemctl status host_wol_service.service
   ```

4. **Stop the Service**:
   ```bash
   sudo systemctl stop host_wol_service.service
   ```

For detailed API usage and setup instructions, refer to the [API Documentation](poe-flask-api/README.md).

## Example Workflow

1. **Cycle PoE Port:**
   - Press the "PoE Cycle" button on the Cisco Webex UI panel to send a POST request to the Flask API, toggling power on a specific PoE port.

2. **Ping Test:**
   - Press the "Ping Test" button to run a connectivity test to a specified endpoint using the API.

3. **Wake-on-LAN:**
   - Select a device from the panel, then send a WoL packet to the device based on its MAC address using the API.

4. **Reboot/Shutdown:**
   - Remotely reboot or shut down specified devices using the control panel.

## Integration with Control Panel

The macro is designed to be part of a comprehensive AV control system but can also be used as a standalone utility. It integrates with control panels to offer device management features, such as:

- **Projector Control:** Control the power and input sources for wall or floor projectors.
- **Presentation Management:** Manage video walls, input sources, and presentation settings.
- **Device Management:** Wake, reboot, or shut down network-enabled devices in the room.

## Example UI Panel (Demo)

The following XML can be used to create a standalone demo panel for this macro:

```xml
<Extensions>
  <Version>1.11</Version>
  <Panel>
    <Order>1</Order>
    <PanelId>poe_control_panel</PanelId>
    <Origin>local</Origin>
    <Location>HomeScreen</Location>
    <Icon>Lightbulb</Icon>
    <Color>#D43B52</Color>
    <Name>PoE Control Panel</Name>
    <ActivityType>Custom</ActivityType>
    <Page>
      <Name>Control Actions</Name>
      <Row>
        <Name>PoE Port Control</Name>
        <Widget>
          <WidgetId>poe-cycle</WidgetId>
          <Name>Cycle PoE Port</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>
      <Row>
        <Name>Ping Test</Name>
        <Widget>
          <WidgetId>ping-test</WidgetId>
          <Name>Run Ping Test</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>
      <Row>
        <Name>Wake-on-LAN</Name>
        <Widget>
          <WidgetId>wake-presentationPC</WidgetId>
          <Name>Wake Presentation PC</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
        <Widget>
          <WidgetId>wake-touchtablePC</WidgetId>
          <Name>Wake TouchTable PC</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>
      <Options/>
    </Page>
  </Panel>
</Extensions>
```

## UI Preview

![PoE Cycle UI](poe-cycle.png)

## Installation

1. Upload the `poe-cycle.js` macro script to your Cisco Webex device using the Macro Editor.
2. Create a UI panel using the demo XML configuration provided or integrate the macro into an existing control interface.

For detailed instructions on setting up the backend Flask API, refer to the [API Documentation](poe-flask-api/README.md).
