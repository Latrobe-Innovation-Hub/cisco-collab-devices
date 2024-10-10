# Wake-on-LAN Flask API

This project is a Flask-based web API that allows you to send Wake-on-LAN (WOL) Magic Packets to wake up remote devices using their MAC address and IP address.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Systemd Service](#systemd-service)
- [Usage](#usage)
- [Logs](#logs)

## Installation

1. **Clone the Repository**:  
   Clone the repository to your server.

2. **Create a Virtual Environment**:  
   Create a Python virtual environment to isolate the dependencies.

   ```bash
   python3 -m venv myenv
   source myenv/bin/activate
   ```

3. **Install Dependencies**:  
   Install the required packages listed in `requirements.txt`.

   ```bash
   pip install Flask wakeonlan
   ```

4. **Create the Flask Application**:  
   The Flask application is located in `app.py`.

## API Endpoints

The API exposes the following endpoint:

### Wake-on-LAN Endpoint

#### `GET /wake-on-lan/<mac_address>/<ip_address>`

Sends a WOL Magic Packet to the given MAC address at the specified IP address.

- **URL Parameters**:
  - `mac_address`: The MAC address of the device to wake.
  - `ip_address`: The IP address to send the packet to.
  
- **Example Request**:
  ```bash
  curl http://<your-server-ip>:8050/wake-on-lan/00:11:22:33:44:55/192.168.1.255
  ```

- **Example Response**:
  ```json
  {
    "status": "Magic Packet sent successfully"
  }
  ```

- **Error Responses**:
  - 404 if the MAC address format is invalid.
  - 500 if there is an issue sending the Magic Packet.

## Systemd Service

To ensure the Flask application runs as a service on system boot, the `host_wol_service.service` is created.

### Service Configuration

The systemd service configuration (`host_wol_service.service`) is located in `/etc/systemd/system/`:

```ini
[Unit]
Description=Flask Application for Wake-on-LAN
After=network.target

[Service]
User=andy
Group=andy
WorkingDirectory=/home/andy/
Environment="PATH=/home/andy/myenv/bin"
ExecStart=/home/andy/myenv/bin/python /home/andy/app.py

[Install]
WantedBy=multi-user.target
```

### Managing the Service

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

## Usage

Once the service is running, you can make a request to the Flask API to send a Magic Packet:

```bash
curl http://<your-server-ip>:8050/wake-on-lan/<mac_address>/<ip_address>
```

For example:

```bash
curl http://192.168.3.12:8050/wake-on-lan/00:11:22:33:44:55/192.168.3.255
```

This will send a Magic Packet to the specified MAC address on the provided IP address.

## Logs

The logs for the Flask application can be viewed using `journalctl`:

```bash
sudo journalctl -u host_wol_service.service
```

This will show logs related to the Flask service, including when Magic Packets are sent and if there are any errors.
