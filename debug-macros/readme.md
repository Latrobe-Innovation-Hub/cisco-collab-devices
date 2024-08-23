# Cisco Codec Debugging Macro Collection

This repository contains a suite of debugging macros for Cisco video conferencing codecs. These tools allow you to monitor, diagnose, and troubleshoot various system events, network states, audio/video inputs, touch panel interactions, and more in real-time. The macros are designed to provide insights into how the system and its components are behaving during operation, making it easier to identify issues or optimize configurations.

## Available Debugging Macros

### 1. `audio-input-output-debugger.js`
This macro captures all audio-related events, including changes in input sources, output devices, volume adjustments, and mute states. It’s useful for diagnosing audio issues during calls or presentations.

**Captured Events:**
- Microphone status changes
- Speaker output status
- Volume level adjustments
- Mute/unmute states

### 2. `call-status-event-debugger.js`
This macro tracks all events related to call status, including incoming/outgoing calls, call connect/disconnect events, and protocol information (Webex, SIP, etc.).

**Captured Events:**
- Call connection/disconnection
- Protocol type (Webex, SIP, H323, etc.)
- Active call status
- Call failure diagnostics

### 3. `connector-debug.js`
Monitor input connectors to capture any changes related to connected devices, source status, and input modes. This is particularly useful when diagnosing HDMI and other video input issues.

**Captured Events:**
- Input source connection/disconnection
- Source status (OK, NotFound)
- Input mode changes
- Connector availability

### 4. `device-connectivity-and-diagnostic-debugger.js`
This macro tracks the overall connectivity and diagnostics of devices connected to the codec, including network interface status, device health checks, and connectivity diagnostics.

**Captured Events:**
- Device online/offline status
- Network interface changes
- Diagnostic errors
- Connectivity issues

### 5. `macro-event-debugger.js`
This tool logs all macro-related events, including macro start/stop events, errors during execution, and runtime diagnostics. It's helpful for debugging the macros themselves and ensuring smooth operation.

**Captured Events:**
- Macro start/stop events
- Macro execution errors
- Runtime diagnostics

### 6. `network-and-connectivity-debugger.js`
This macro captures network-related events such as IP configuration changes, packet loss, connection drops, and more. It’s essential for troubleshooting network stability and connectivity issues.

**Captured Events:**
- IP address assignment changes
- Network disconnection/reconnection
- Packet loss detection
- Network diagnostics

### 7. `presentation-and-video-debugger.js`
Track video and presentation-related activities, including source switches, presentation mode changes, and any issues that arise during content sharing.

**Captured Events:**
- Presentation start/stop events
- Video source changes
- Video resolution and quality diagnostics
- Content sharing issues

### 8. `system-status-and-alerts-debugger.js`
Monitor system-wide alerts and status changes, such as warnings, errors, and critical notifications. This macro is useful for maintaining overall system health.

**Captured Events:**
- System alerts (warnings, errors, critical)
- System health checks
- Power status changes
- Hardware diagnostics

### 9. `touch-panel-interaction-debugger.js`
Log every interaction with the touch panel, including button presses, screen navigation, and user input. It helps track how users interact with the interface, making it easier to diagnose interface issues.

**Captured Events:**
- Button presses
- Screen navigation
- User input actions
- UI interaction patterns

### 10. `ui-button-press-debugger.js`
This macro is specifically designed to capture standard UI button presses (like ‘Share’, ‘Cancel’, etc.) and log what actions they trigger. It's useful for replicating these actions in custom macros.

**Captured Events:**
- Share button presses
- Cancel button presses
- UI element interactions
- Screen transitions

## How to Use

1. **Upload the Macros:**
   - Log in to your Cisco codec.
   - Go to the Macro Editor.
   - Upload the desired `.js` macro files.

2. **Activate the Macros:**
   - Enable each macro in the Macro Editor.
   - Run them simultaneously to capture a comprehensive set of data across different components.

3. **Monitor the Logs:**
   - Open the console to view real-time logs and event data captured by the macros.
   - Analyze the output to diagnose issues or validate system behavior.

## Example Usage Scenarios

- **Troubleshooting HDMI issues** with the `connector-debug.js` macro.
- **Diagnosing call drop events** using `call-status-event-debugger.js`.
- **Monitoring user interaction patterns** via `ui-button-press-debugger.js` to replicate default UI behaviors.
