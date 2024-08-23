const xapi = require('xapi');

// Define the parameters for the request
const flaskApiUrl = 'http://192.168.3.12:8080/api/cycle_poe_port';
const pingUrl = 'http://192.168.3.12:8080/api/ping';
const payload = {
  auth_token: 'c974a5739df9626a4dc8e5d1ea5eabdab9ced3e3',
  switch_serial: 'Q2AY-FF32-BB92',
  port_number: '16'
};

// Single function to cycle the PoE port
function cyclePoEPort(url, data) {
  console.log('Sending PoE port cycle request with payload:', JSON.stringify(data));
  xapi.command('HttpClient Post', {
    Header: ["Content-Type: application/json"],
    Url: url,
    AllowInsecureHTTPS: true
  }, JSON.stringify(data))
  .then(response => {
    console.log('Request successful:', response.StatusCode, response.Body);
    xapi.command('UserInterface Message Alert Display', {
      Title: 'Success',
      Text: 'PoE port cycle request was successful.',
      Duration: 5
    });
  })
  .catch(error => {
    console.log('Request failed with error:', error.message);
    xapi.command('UserInterface Message Alert Display', {
      Title: 'Error',
      Text: `PoE port cycle request failed: ${error.message}`,
      Duration: 5
    });
  });
}

// Single function to test the /ping endpoint
function testPing(url) {
  xapi.command('HttpClient Get', {
    Header: ["Content-Type: application/json"],
    Url: url,
    AllowInsecureHTTPS: true
  })
  .then(response => {
    console.log('Ping request successful:', response.StatusCode, response.Body);
    xapi.command('UserInterface Message Alert Display', {
      Title: 'Success',
      Text: 'Ping request was successful.',
      Duration: 5
    });
  })
  .catch(error => {
    console.log('Ping request failed with error:', error.message);
    xapi.command('UserInterface Message Alert Display', {
      Title: 'Error',
      Text: `Ping request failed: ${error.message}`,
      Duration: 5
    });
  });
}

// Function to send a Wake-on-LAN request
function sendWakeOnLan(macAddress) {
  const wolUrl = `http://192.168.3.12:5001/send-wol/${macAddress}`;
  console.log('Sending Wake-on-LAN2 request to:', wolUrl);
  xapi.command('HttpClient Get', {
    Url: wolUrl,
    AllowInsecureHTTPS: true
  })
  .then(response => {
    console.log('WoL request successful:', response.StatusCode);
    xapi.command('UserInterface Message Alert Display', {
      Title: 'Success',
      Text: 'Wake-on-LAN request was successful.',
      Duration: 5
    });
  })
  .catch(error => {
    console.log('WoL request failed with error:', error.message);
    xapi.command('UserInterface Message Alert Display', {
      Title: 'Error',
      Text: `Wake-on-LAN request failed: ${error.message}`,
      Duration: 5
    });
  });
}

// Function to send a Reboot request
function sendReboot(roomCode, hostAddress) {
  const url = `http://192.168.3.12:8080/api/reboot/${roomCode}/${hostAddress}`;
  console.log('Sending reboot request to:', url);
  xapi.command('HttpClient Get', {
    Url: url,
    AllowInsecureHTTPS: true
  })
  .then(response => {
    console.log('Reboot request successful:', response.StatusCode);
    xapi.command('UserInterface Message Alert Display', {
      Title: 'Success',
      Text: 'Reboot request was successful.',
      Duration: 5
    });
  })
  .catch(error => {
    console.log('Reboot request failed with error:', error.message);
    xapi.command('UserInterface Message Alert Display', {
      Title: 'Error',
      Text: `Reboot request failed: ${error.message}`,
      Duration: 5
    });
  });
}

// Function to send a Shutdown request
function sendShutdown(roomCode, hostAddress) {
  const url = `http://192.168.3.12:8080/api/shutdown/${roomCode}/${hostAddress}`;
  console.log('Sending shutdown request to:', url);
  xapi.command('HttpClient Get', {
    Url: url,
    AllowInsecureHTTPS: true
  })
  .then(response => {
    console.log('Shutdown request successful:', response.StatusCode);
    xapi.command('UserInterface Message Alert Display', {
      Title: 'Success',
      Text: 'Shutdown request was successful.',
      Duration: 5
    });
  })
  .catch(error => {
    console.log('Shutdown request failed with error:', error.message);
    xapi.command('UserInterface Message Alert Display', {
      Title: 'Error',
      Text: `Shutdown request failed: ${error.message}`,
      Duration: 5
    });
  });
}

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.Type === 'pressed') {
    if (event.WidgetId === 'poe-cycle') { 
      console.log('Widget pressed: poe-test');
      // Trigger the function
      cyclePoEPort(flaskApiUrl, payload);
    } else if (event.WidgetId === 'ping-test') {
      console.log('Widget pressed: ping-test');
      // Trigger the function
      testPing(pingUrl);
    }
  }
});

// Event listener for widget actions
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.Type === 'pressed') {
    switch(event.WidgetId) {
      case 'poe-cycle':
        console.log('Widget pressed: poe-cycle');
        cyclePoEPort(flaskApiUrl, payload);
        break;
      case 'ping-test':
        console.log('Widget pressed: ping-test');
        testPing(pingUrl);
        break;
      case 'presentationPC':
        console.log(`Widget pressed within presentationPC: ${event.Value}`);
        switch(event.Value) {
          case 'wake-presentationPC':
            console.log('Widget pressed: wake-presentationPC');
            sendWakeOnLan("00:01:2E:A8:6C:3F");
            break;
          case 'reboot-presentationPC':
            console.log('Widget pressed: reboot-presentationPC');
            sendReboot('201', '192.168.3.16');
            break;
          case 'shutdown-presentationPC':
            console.log('Widget pressed: shutdown-presentationPC');
            sendShutdown('201', '192.168.3.16');
            break;
        }
      case 'touchtablePC':
        console.log(`Widget pressed within touchtablePC: ${event.Value}`);
        switch(event.Value) {
          case 'wake-touchtablePC':
            console.log('Widget pressed: wake-touchtablePC');
            sendWakeOnLan("00:01:2E:A5:9C:FC");
            break;
          case 'reboot-touchtablePC':
            console.log('Widget pressed: reboot-touchtablePC');
            sendReboot('201', '192.168.3.53');
            break;
          case 'shutdown-touchtablePC':
            console.log('Widget pressed: shutdown-touchtablePC');
            sendShutdown('201', '192.168.3.53');
            break;
        }
      // projector1 pc not waking up
      case 'projector1PC': //192.168.3.70
        console.log(`Widget pressed within projector1PC: ${event.Value}`);
        switch(event.Value) {
          case 'wake-projector1PC':
            console.log('Widget pressed: wake-projector1PC');
            sendWakeOnLan("00:01:2E:A5:B5:E6"); //00012EA5B5E6
            break;
          case 'reboot-projector1PC':
            console.log('Widget pressed: reboot-projector1PC');
            sendReboot('201', '192.168.3.23');
            break;
          case 'shutdown-projector1PC':
            console.log('Widget pressed: shutdown-projector1PC');
            sendShutdown('201', '192.168.3.23');
            break;
        }
      // projector2 pc not waking up
      case 'projector2PC': //192.168.3.68
        console.log(`Widget pressed within projector2PC: ${event.Value}`);
        switch(event.Value) {
          case 'wake-projector2PC':
            console.log('Widget pressed: wake-projector2PC');
            sendWakeOnLan("00:01:2E:A5:B5:D6"); //00012EA5B5D6
            break;
          case 'reboot-projector2PC':
            console.log('Widget pressed: reboot-projector2PC');
            sendReboot('201', '192.168.3.24');
            break;
          case 'shutdown-projector2PC':
            console.log('Widget pressed: shutdown-projector2PC');
            sendShutdown('201', '192.168.3.24');
            break;
        }
	  // projector2 pc not waking up
      case 'touchwallPC': //192.168.3.93
        console.log(`Widget pressed within touchwallPC: ${event.Value}`);
        switch(event.Value) {
          case 'wake-touchwallPC':
            console.log('Widget pressed: wake-touchwallPC');
            sendWakeOnLan("00-01-2E-A8-6C-6B"); //
            break;
          case 'reboot-touchwallPC':
            console.log('Widget pressed: reboot-touchwallPC');
            sendReboot('201C', '192.168.3.93');
            break;
          case 'shutdown-touchwallPC':
            console.log('Widget pressed: shutdown-touchwallPC');
            sendShutdown('201C', '192.168.3.93');
            break;
        }
	   // projector2 pc not waking up
       case '201CprojectorwallPC': //192.168.3.33
        console.log(`Widget pressed within 201CprojectorwallPC: ${event.Value}`);
        switch(event.Value) {
          case 'wake-201CprojectorwallPC':
            console.log('Widget pressed: wake-201CprojectorwallPC');
            sendWakeOnLan("00:01:2E:A8:6C:5B"); //
            break;
          case 'reboot-201CprojectorwallPC':
            console.log('Widget pressed: reboot-201CprojectorwallPC');
            sendReboot('201C', '192.168.3.33');
            break;
          case 'shutdown-201CprojectorwallPC':
            console.log('Widget pressed: shutdown-201CprojectorwallPC');
            sendShutdown('201C', '192.168.3.33');
            break;
        }
    }
  }
});
