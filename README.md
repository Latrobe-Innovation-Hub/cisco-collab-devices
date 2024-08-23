Here is a README that provides an overview for the whole repository:

---

# Cisco Room System Macros Collection

This repository contains a comprehensive set of macros and configurations tailored for managing and automating various Cisco room systems, including presentation spaces, boardrooms, and specialized environments. The goal of this collection is to streamline AV management, enable advanced system control, and provide easy-to-use interfaces for both users and administrators.

## Repository Structure

The repository is organized into different folders based on the use case or the specific room/environment. Below is an overview of the key components:

### 1. **201-settings-panel**
   Contains the macros and panel configurations for managing the 201 presentation space. This includes custom UI panels and automation scripts to handle video input sources, screen roles, and projectors.

### 2. **201b-settings-panel**
   Similar to the 201 space but adapted for the 201b environment, with specific configurations for its unique AV setup.

### 3. **201c-settings-panel**
   Tailored macros for the 201c space, including UI panels for controlling presentation sources, screen roles, and input connectors.

### 4. **202-settings-panel**
   Macros and configurations for the Optus 5G boardroom, including screen role management and input source switching.

### 5. **213-settings-panel**
   Configuration and control macros for the 213 space, focusing on screen roles, projectors, and presentation setups.

### 6. **autoshare-hdmi-macro**
   Contains a macro designed to automatically switch to an HDMI input when detected. This is useful for simplifying user experience in presentation rooms.

### 7. **debug-macros**
   A collection of debugging macros designed to capture and log system events, network states, and user interactions. These tools are essential for troubleshooting and optimizing system configurations.

### 8. **poe-cycle-macro**
   Includes a macro for cycling PoE (Power over Ethernet) ports on connected devices, allowing remote power management of AV equipment.

### 9. **rroll-web-macro**
   A fun and interactive web-based macro designed for engaging room experiences.

### 10. **screen-role-switching-macro**
   Provides a flexible way to manage screen roles and video outputs in multi-screen setups, enabling dynamic role switching during meetings or presentations.

### 11. **telehealthdemo-web-macro**
   A macro built for telehealth demonstrations, integrating remote control features and video input management for health care scenarios.

### 12. **README.md**
   The main repository readme file that provides high-level documentation and usage instructions.

## Key Features

- **Custom UI Panels:** Tailored touch panel interfaces for each environment with intuitive controls for managing AV equipment, presentations, and video conferencing.
- **Automated Input Switching:** Seamless switching between HDMI, cameras, and other inputs based on user interaction or device detection.
- **Screen Role Management:** Control over screen roles, including dynamic switching and synchronization across multi-screen setups.
- **Remote Power Management:** Ability to cycle PoE ports for connected devices directly from the touch panel interface.
- **Advanced Debugging Tools:** Macros for capturing and logging detailed system events, call states, and network conditions, making troubleshooting easier.
- **Interactive Demos:** Specialized macros for telehealth demos and other interactive scenarios, showcasing innovative use cases for Cisco room systems.

## Getting Started

1. **Clone the Repository:**
   ```
   git clone https://github.com/yourusername/cisco-room-system-macros.git
   ```

2. **Upload Macros and UI Panels:**
   Access the Cisco codec’s Macro Editor, upload the relevant `.js` macro files, and activate the corresponding UI panels.

3. **Configure Settings:**
   Modify the IP addresses, device URLs, and other parameters in the scripts to match your environment’s setup.

4. **Monitor and Control:**
   Use the touch panel interfaces to control AV settings, switch inputs, and monitor system behavior.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for feature requests, bug reports, or enhancements.
