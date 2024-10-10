# Managing Users on PiVPN (WireGuard)

This README provides detailed instructions on how to manage users on two PiVPN servers configured to use WireGuard. Each server caters to a different VLAN within the DIH infrastructure, covering the steps for adding and removing users, generating QR codes for easy configuration, and methods for transferring the VPN configuration files.

## Server Details

### Server 1 (DIH Infrastructure VLAN)
- **SSH Username**: administrator
- **Server IP**: 192.168.3.12
- **VPN Protocol**: WireGuard
- **VPN Port**: 51820

### Server 2 (DIH Lab VLAN)
- **SSH Username**: administrator
- **Server IP**: 192.168.32.12
- **VPN Protocol**: WireGuard
- **VPN Port**: 51821

Both servers use the same credentials:
- **Password**: digital2023

## Prerequisites

Ensure you have SSH access to the appropriate PiVPN server. Administrative credentials are required for logging in and managing the VPN.

## Adding a New VPN User

### Steps for Both Servers
1. **Connect to the PiVPN Server**:
   Open a terminal or command prompt and connect via SSH:
   ```
   ssh administrator@<server-ip>
   ```
   Replace `<server-ip>` with the IP address of the server you are configuring (192.168.3.12 or 192.168.32.12). Enter the password when prompted.

2. **Add a New User**:
   Use the `pivpn add` command to create a new user profile:
   ```
   pivpn add
   ```
   Follow the prompts to complete the user creation. This will generate the necessary configuration files.

3. **Generate a QR Code for Easy Mobile Setup**:
   Generate a QR code for the new user to easily configure their mobile device:
   ```
   pivpn -qr [username]
   ```
   Show the QR code on your terminal screen, which the user can scan with a WireGuard-compatible app.

## Removing a VPN User

### Steps for Both Servers
1. **Connect to the PiVPN Server**:
   ```
   ssh administrator@<server-ip>
   ```

2. **Remove the User**:
   Remove a user by specifying their profile name with the `pivpn remove` command:
   ```
   pivpn remove
   ```
   Follow the prompts to select the user profile to remove.

## Viewing Current Connected Clients

To view a list of currently connected clients and their statuses, use:
```
pivpn -c
```

## Transferring VPN Configuration Files

After creating a VPN user and generating their configuration file, you can transfer the `.conf` file to the user's device using one of the following methods for both servers:

### Using the Samba Share

**Access for Windows**:
1. Open File Explorer.
2. In the address bar, enter `\\<server-ip>\share`.
3. When prompted, enter the username `administrator` and password `digital2023`.
4. Navigate to the shared folder and download the required `.conf` file.

**Access for macOS**:
1. Open Finder.
2. In the menu bar, select Go > Connect to Server.
3. Enter `smb://<server-ip>/share`.
4. Enter the username `administrator` and password when prompted.
5. Access the folder and download the `.conf` file.

**Access for Linux**:
1. Open your file manager or terminal.
2. Connect to the share with the command:
   ```
   smbclient //<server-ip>/share -U administrator
   ```
   Enter the password when prompted.
3. Use the `cd` and `get` commands to navigate and download the `.conf` file.

### Using SCP for Direct File Transfer
For direct file transfer, use SCP:
```
scp administrator@<server-ip>:/home/administrator/configs/username.conf /local/path
```
Replace `username.conf` with the actual user's config file name and `/local/path` with the path where you want to save the file on your local machine.

## Client-Side Setup

Clients will need the configuration file or the QR code to set up the VPN connection. Here are the setup steps for various operating systems:

### Windows
1. Download and install the WireGuard client from [WireGuard Download Page](https://www.wireguard.com/install/).
2. Import the `.conf` file provided by the server administrator or scan the QR code using the app.

### macOS
1. Install WireGuard from the App Store or the WireGuard website.
2. Open WireGuard, click on 'Add Tunnel', and either import the `.conf` file or scan the QR code.

### Linux
1. Install WireGuard using your distribution’s package manager (e.g., `sudo apt install wireguard` for Ubuntu).
2. Place the `.conf` file in `/etc/wireguard/` and activate the tunnel with `sudo wg-quick up [interface]`.

### iPhone/iOS
1. Download the WireGuard app from the App Store.
2. Tap on 'Add a Tunnel' and then 'Create from QR Code'. Scan the QR code provided by your administrator.

### Android
1. Download the WireGuard app from the Google Play Store.
2. Tap on the '+' button and choose 'Create from QR Code' to scan the QR code.
