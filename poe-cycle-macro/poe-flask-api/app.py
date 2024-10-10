from flask import Flask, jsonify
from wakeonlan import send_magic_packet as smp, create_magic_packet
import logging
import re
import socket

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def is_valid_mac_address(mac_address):
    # Simple regex to check for valid MAC address format
    return re.match(r"([0-9A-Fa-f]{2}[:\-]){5}([0-9A-Fa-f]{2})", mac_address) is not None

def send_magic_packet_to_ip(mac, ip_address):
    packet = create_magic_packet(mac)
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(packet, (ip_address, 9))
    logger.info(f"Packet data: {packet}")
    logger.info(f"Sent to IP: {ip_address}")

@app.route('/wake-on-lan/<string:mac_address>/<string:ip_address>', methods=['GET'])
def wake_on_lan(mac_address, ip_address):
    # Validate the MAC address format
    if not is_valid_mac_address(mac_address):
        logger.info(f"MAC address is invalid: {mac_address}")
        return jsonify({'error': f'Invalid MAC address: {mac_address}'}), 404

    logger.info(f"Received MAC address: {mac_address} and IP address: {ip_address}")

    # Send the Magic Packet
    try:
        send_magic_packet_to_ip(mac_address, ip_address)
        logger.info(f"Magic Packet sent to {mac_address} at IP address {ip_address}")
        return jsonify({'status': 'Magic Packet sent successfully'}), 200
    except Exception as e:
        logger.error(f"Failed to send Magic Packet: {e}")
        return jsonify({'error': 'Failed to send Magic Packet'}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8050)
