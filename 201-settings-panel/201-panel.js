// Programmer: Andrew McDonald
// Date: 2024-08-23
// Version: 1.0

import xapi from 'xapi';

const SERVER_URL = 'http://192.168.3.58:1337/api';
const DEVICE_URLS = [
  'http://192.168.3.100/', // WALL PROJECTOR LEFT
  'http://192.168.3.101/', // WALL PROJECTOR RIGHT
  'http://192.168.3.128/', // FLOOR PROJECTOR 1
  'http://192.168.3.127/'  // FLOOR PROJECTOR 2
];

const DEFAULT_SOURCE_HDMI = '32';
const DEFAULT_SOURCE_HDBT = '56'; 
const CANVAS = '1';

const ACTION = ['on', 'off', 'input', 'preset'];
const CONTENT_TYPE = 'Content-Type:application/json';
const ACCEPT_TYPE = 'Accept:application/json';
const AUTHTOKEN = 'Authorization:WkFSRUFOIElORFVTVFJJRVM=';

var systemInfo = {
    softwareVersion: '',
    systemName: '',
    softwareReleaseDate: ''
};

function sendSystemInfo(){
  var message = {
    softwareVersion: systemInfo.softwareVersion,
    systemName: systemInfo.systemName,
    softwareReleaseDate: systemInfo.softwareReleaseDate
  };

  xapi.command('HttpClient Post', { 'Header': [CONTENT_TYPE, AUTHTOKEN] , 'Url':SERVER_URL, 'AllowInsecureHTTPS': 'True'}, JSON.stringify(message));
}

function recallPreset(number){
  var message = {
    command: 'Recall Preset',
    value: number,
    canvas: CANVAS
  };

  console.log("Sending POST request to:", SERVER_URL);
  console.log("Headers:", JSON.stringify({ContentType: CONTENT_TYPE, Authorization: AUTHTOKEN}));
  console.log("Body:", JSON.stringify(message));
  
  xapi.command('HttpClient Post', { 'Header': [CONTENT_TYPE, AUTHTOKEN] , 'Url':SERVER_URL, 'AllowInsecureHTTPS': 'True'}, JSON.stringify(message));
}

function setPower(number, action){
  console.log(`Number: ${number}, Action: ${action}`);
  var url = DEVICE_URLS[number-1] + 'api/v01/contentmgr/remote/power/' + action;
  
  xapi.command('HttpClient Get', { 'Header': [CONTENT_TYPE] , 'Url':url, 'AllowInsecureHTTPS': 'True'});
}

const DEFAULT_SOURCE_NAME_PART = "PC 2 (HDMI)"; // The source to toggle to
const TOGGLE_SOURCE_NAME_PART = "Camera 1"; // Adjust to your default or previous source name part
//let lastSource = '';

// -----

let lastSource = '';

let currentIndex = -1; // Start before the first index to include the "none" state in the cycle

// Updated predefined list of sources with correct names and connector IDs
const predefinedSources = [
    { id: '1', Name: 'Camera 1' },
    { id: '2', Name: 'Camera 2' },
    { id: '3', Name: 'PC 2 (HDMI)' },
    { id: '4', Name: 'PC 3 (HDMI)' },
    { id: '5', Name: 'PC 1 (HDMI)' },
];

function toggleDefaultInput() {
    // Increment the current index to move to the next source in the cycle
    currentIndex++;

    // If the current index exceeds the list of predefined sources, stop the presentation and reset the index
    if (currentIndex >= predefinedSources.length) {
        xapi.command('Presentation Stop')
        .then(() => {
            console.log('Presentation stopped. Cycling reset.');
        })
        .catch(error => {
            console.error(`Error stopping presentation: ${error}`);
        });

        currentIndex = -1; // Reset to start before the first index for the next cycle
        return;
    }

    // Start presenting from the current connector in the predefined list
    const connector = predefinedSources[currentIndex];
    xapi.command('Presentation Start', { ConnectorId: connector.id })
    .then(() => {
        console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
    })
    .catch(error => {
        console.error(`Error starting presentation from '${connector.Name}' with connector ID ${connector.id}: ${error}`);
    });
}

// -----

function setDefaultInput(number){
  var url = DEVICE_URLS[number-1] + 'api/v02/contentmgr/remote/source';
  var message = {
      'source_id': DEFAULT_SOURCE_HDBT
  };

  if(number > 2){
    message = {
      'source_id': DEFAULT_SOURCE_HDMI
    };
  }

  xapi.command('HttpClient Put', { 'Header': [CONTENT_TYPE] , 'Url':url, 'AllowInsecureHTTPS': 'True'}, JSON.stringify(message));
}

function setPresentationSource(option) {
    if (option === 'default-2') {
        recallPreset(1);
        // Option to stop the presentation, assuming this is the "default non-choice"
        //xapi.command('Presentation Stop')
        //    .then(() => {
        //        console.log('Presentation stopped.');
        //    })
        //    .catch(error => {
        //        console.error(`Error stopping presentation: ${error}`);
        //    });
    } else if (option === 'default-1') {
        recallPreset(5);
        // Option to stop the presentation, assuming this is the "default non-choice"
        //xapi.command('Presentation Stop')
        //    .then(() => {
        //        console.log('Presentation stopped.');
        //    })
        //    .catch(error => {
        //        console.error(`Error stopping presentation: ${error}`);
        //    });
    } else if (option === 'default') {
        recallPreset(1);
    } else if (option === 'PC 2 (HDMI)') {
        // Start presenting from the current connector in the predefined list
        recallPreset(2);

        // Start presenting from the current connector in the predefined list
        const connector = predefinedSources[3];
        xapi.command('Presentation Start', { ConnectorId: connector.id })
        .then(() => {
            console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        })
        .catch(error => {
            console.error(`Error starting presentation from '${connector.Name}' with connector ID ${connector.id}: ${error}`);
        });
    } else if (option === 'PC 2 (HDMI) and codec') {
        // Start presenting from the current connector in the predefined list
        recallPreset(4);

        // Start presenting from the current connector in the predefined list
        const connector = predefinedSources[3];
        xapi.command('Presentation Start', { ConnectorId: connector.id })
        .then(() => {
            console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        })
        .catch(error => {
            console.error(`Error starting presentation from '${connector.Name}' with connector ID ${connector.id}: ${error}`);
        });
    } 
}

//let currentIndex = -1; // Start before the first index to include the "none" state in the cycle

function toggleDefaultInputold() {
    xapi.config.get('Video Input Connector')
    .then(list => {
        // Increment the current index to move to the next source in the cycle
        currentIndex++;

        // If the current index exceeds the list of connectors, stop the presentation and reset the index
        if (currentIndex >= list.length) {
            xapi.command('Presentation Stop')
            .then(() => {
                console.log('Presentation stopped. Cycling reset.');
            })
            .catch(error => {
                console.error(`Error stopping presentation: ${error}`);
            });

            currentIndex = -1; // Reset to start before the first index for the next cycle
            return;
        }

        // Otherwise, start presenting from the current connector
        const connector = list[currentIndex];
        xapi.command('Presentation Start', { ConnectorId: connector.id })
        .then(() => {
            console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        })
        .catch(error => {
            console.error(`Error starting presentation from '${connector.Name}' with connector ID ${connector.id}: ${error}`);
        });
    })
    .catch(error => {
        console.error(`Error retrieving video input connectors: ${error}`);
    });
}

// When codec goes into standby state, set presentation mode to DIGITAL signage PC in AV rack
// can set the time for how long before standby state in codec settings: search "standby" and set "delay" value
//xapi.status.on("Standby State", () => {
//  setPresentationSource('PC 2 (HDMI)');
//});

// Function to set both screens to display the same content
function setScreensToSame() {
  // Set both connectors (screens) to the same role
  xapi.Config.Video.Output.Connector[1].MonitorRole.set('First')
    .then(() => {
      console.log("Connector 1 MonitorRole set to 'First'");
    })
    .catch((error) => {
      console.error("Error setting Connector 1 MonitorRole:", error);
    });

  xapi.Config.Video.Output.Connector[2].MonitorRole.set('First')
    .then(() => {
      console.log("Connector 2 MonitorRole set to 'First'");
    })
    .catch((error) => {
      console.error("Error setting Connector 2 MonitorRole:", error);
    });
}


xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  console.log(`what is pressed: ${event.Type}.`);
  if (event.Type === 'changed') {
    console.log(`what is pressed: ${event.WidgetId}.`);

    
    if (event.WidgetId === 'toggle-test' && event.Value === 'on') {
      console.log(`Toggle is ON`);
      setPower(1, ACTION[0]);
      setPower(2, ACTION[0]);
      xapi.command('Presentation Stop')
        .then(() => {
          console.log('Presentation stopped.');
        })
        .catch(error => {
          console.error(`Error stopping presentation: ${error}`);
        });
    } else if (event.WidgetId === 'toggle-test' && event.Value === 'off') {
      console.log(`Toggle is OFF`);
      setPower(1, ACTION[1]);
      setPower(2, ACTION[1]);
      xapi.command('Presentation Stop')
        .then(() => {
          console.log('Presentation stopped.');
        })
        .catch(error => {
          console.error(`Error stopping presentation: ${error}`);
        });
    }

    if (event.WidgetId === 'toggle-test2' && event.Value === 'on') {
      console.log(`Toggle is ON`);
      setPower(3, ACTION[0]);
    } else if (event.WidgetId === 'toggle-test2' && event.Value === 'off') {
      console.log(`Toggle is OFF`);
      setPower(3, ACTION[1]);
    }

    if (event.WidgetId === 'toggle-test3' && event.Value === 'on') {
      console.log(`Toggle is ON`);
      setPower(4, ACTION[0]);
    } else if (event.WidgetId === 'toggle-test2' && event.Value === 'off') {
      console.log(`Toggle is OFF`);
      setPower(4, ACTION[1]);
    }
  }

  if (event.Type === 'pressed') {
    console.log(`what is pressed: ${event.WidgetId}.`);
    const BUTTON = (k) => { return event.WidgetId.indexOf(k) === 0; };
    const ID = () => event.WidgetId.match(/\d/)[0];

    if (event.WidgetId === "on_3_btn") {
       console.log(`Turning wall projectors ON`);
      setPower(1, ACTION[0]);
      setPower(2, ACTION[0]);
    } else if (event.WidgetId === "off_3_btn") {
      console.log(`Turning wall projectors OFF`);
      setPower(1, ACTION[1]);
      setPower(2, ACTION[1]);
    } else if (event.WidgetId === "on_1_btn") {
      console.log(`Turning LEFT wall projector ON `);
      setPower(1, ACTION[0]);
    } else if (event.WidgetId === "off_1_btn") {
      console.log(`Turning LEFT wall projector OFF `);
      setPower(1, ACTION[1]);
    } else if (event.WidgetId === "on_2_btn") {
      console.log(`Turning RIGHT wall projector ON `);
      setPower(2, ACTION[0]);
    } else if (event.WidgetId === "off_2_btn") {
      console.log(`Turning RIGHT wall projector OFF `);
      setPower(2, ACTION[1]);
    } else if (event.WidgetId === "on_4_btn") {
      console.log(`Turning FLOOR projector 1 ON `);
      setPower(3, ACTION[0]);
    } else if (event.WidgetId === "off_4_btn") {
      console.log(`Turning FLOOR projector 1 OFF `);
      setPower(3, ACTION[1]);
    } else if (event.WidgetId === "on_5_btn") {
      console.log(`Turning FLOOR projector 2 ON `);
      setPower(4, ACTION[0]);
    } else if (event.WidgetId === "off_5_btn") {
      console.log(`Turning FLOOR projector 2 OFF `);
      setPower(4, ACTION[1]);
    } else if(event.WidgetId === "stoppresentation_btn") {
      xapi.command('Presentation Stop')
        .then(() => {
            console.log('Presentation stopped. Cycling reset.');
        })
        .catch(error => {
            console.error(`Error stopping presentation: ${error}`);
        });
    } else if(event.WidgetId === "webex_reset_btn") {
      xapi.command('Presentation Stop')
        .then(() => {
            console.log('Presentation stopped. Cycling reset.');
        })
        .catch(error => {
            console.error(`Error stopping presentation: ${error}`);
        });
      // reset monitor roles to default and put to default webex videowall
      xapi.Config.Video.Output.Connector[1].MonitorRole.set('First');
      xapi.Config.Video.Output.Connector[2].MonitorRole.set('Second');
      recallPreset(1);
    } 
    else if (event.WidgetId === "flip-1") {
      xapi.Config.Video.Output.Connector[1].MonitorRole.set('First');
      xapi.Config.Video.Output.Connector[2].MonitorRole.set('Second');
      console.log(`flip-1`);
    } else if (event.WidgetId === "flip-2") {
      xapi.Config.Video.Output.Connector[1].MonitorRole.set('Second');
      xapi.Config.Video.Output.Connector[2].MonitorRole.set('First');
      console.log(`flip-2`);
    } else  if (event.WidgetId === 'set_screens_same') {
      setScreensToSame();
      console.log(`setScreensToSame`);
    } else if (event.WidgetId === "camera_def_btn") {
      console.log(`Selecting default camera presets 1, 2`);
      xapi.Command.Camera.Preset.Activate({ PresetId: '1' });
      xapi.Command.Camera.Preset.Activate({ PresetId: '2' });
    } else if (event.WidgetId === 'hologramDemo_btn') {
      recallPreset(4);

        // Start presenting from the current connector in the predefined list
        const connector = predefinedSources[3];
        xapi.command('Presentation Stop')
        .then(() => {
          console.log('Presentation stopped.');
        })
        .catch(error => {
          console.error(`Error stopping presentation: ${error}`);
        });
    } else if (event.WidgetId === "single_offcentre_btn") {
      recallPreset(6);
    } else if (event.WidgetId === 'hologramDemo_btn_2') {
      recallPreset(7);

        // Start presenting from the current connector in the predefined list
        const connector = predefinedSources[3];
        xapi.command('Presentation Stop')
        .then(() => {
          console.log('Presentation stopped.');
        })
        .catch(error => {
          console.error(`Error stopping presentation: ${error}`);
        });
    } else if (event.WidgetId === 'webex_btn') { 
      setPresentationSource('default');
      console.log(`HERE7`);
    } else if (event.WidgetId === 'widescreenPC_btn') { 
      recallPreset(2);
      xapi.command('Presentation Start', { ConnectorId: 4});
      console.log(`HERE4`);
    } else if (event.WidgetId === 'holo-demo3_btn') { 
      recallPreset(2);
      xapi.command('Presentation Stop')
        .then(() => {
          console.log('Presentation stopped.');
        })
        .catch(error => {
          console.error(`Error stopping presentation: ${error}`);
        });
      console.log(`holo-demo3_btn`);
    } else if (event.WidgetId === 'webexSingle_btn') { 
      setPresentationSource('default-1');
      console.log(`HERE5`);
    } else if (event.WidgetId === 'default_btn') { 
      setPresentationSource('default-2');
      xapi.command("Standby Deactivate")
        .then(() => {
          console.log('The system is now awake.');
        })
        .catch((error) => {
          console.error(`Failed to wake the system: ${error}`);
        });
      console.log(`HERE6`);
    } else if (event.WidgetId === 'default_btn_hybrid') {
      recallPreset(8);
      //xapi.command('Presentation Stop')
      //  .then(() => {
      //    console.log('Presentation stopped.');
      //  })
      //  .catch(error => {
      //    console.error(`Error stopping presentation: ${error}`);
      //  });
      console.log(`default_btn_hybrid`);
    } else if (event.WidgetId === 'widescreenPCandcodec_btn') { 
      setPresentationSource('PC 2 (HDMI) and codec');
      //xapi.command('Presentation Stop')
      //  .then(() => {
      //    console.log('Presentation stopped.');
      //  })
      //  .catch(error => {
      //    console.error(`Error stopping presentation: ${error}`);
      //  });
      console.log(`HERE8`);
    } else if (event.WidgetId === 'PC_choice_btn') { 
      const connector = predefinedSources[3];
      console.log(`HERE9`);
      console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
      xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if (event.WidgetId === 'cam1_choice_btn') { 
      console.log(`HERE10`);
      const connector = predefinedSources[0];
      console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
      xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if (event.WidgetId === 'cam2_choice_btn') {
      console.log(`HERE11`); 
      const connector = predefinedSources[1];
      console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
      xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if (event.WidgetId === 'HDMI_choice_btn') { 
      console.log(`HERE12`);
      const connector = predefinedSources[2];
      console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
      xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if (event.WidgetId === 'hdmi_btn') { 
      console.log(`HERE13`);
      const connector = predefinedSources[2];
      console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
      xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if (event.WidgetId === 'pc1_btn') {
      console.log(`HERE14`);
      const connector = predefinedSources[4];
      console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
      xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if (event.WidgetId === 'pc2_btn') { 
      console.log(`HERE15`);
      const connector = predefinedSources[3];
      console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
      xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if (event.WidgetId === 'cam1_btn') { 
      console.log(`HERE16`);
      const connector = predefinedSources[0];
      console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
      xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if (event.WidgetId === 'cam2_btn') { 
      console.log(`HERE17`);
      const connector = predefinedSources[1];
      console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
      xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if (event.WidgetId === 'codec_btn') { 
      setPresentationSource('default');
    } else if (event.WidgetId === 'dark-mode-btn') {
      console.log('Dark mode button pressed');
      // Set the theme to night mode
      xapi.Config.UserInterface.Theme.Name.set('night')
        .then(() => {
          console.log('Theme set to night mode');
        })
        .catch((error) => {
          console.log('Error setting dark mode:', error.message);
        });
    } else if (event.WidgetId === 'light-mode-btn') {
      console.log('Light mode button pressed');
      // Set the theme to light mode
      xapi.Config.UserInterface.Theme.Name.set('light')
        .then(() => {
          console.log('Theme set to light mode');
        })
        .catch((error) => {
          console.log('Error setting light mode:', error.message);
        });
    }

    if (BUTTON(ACTION[2])) { toggleDefaultInput();console.log(`HERE16`);}
    //else if (BUTTON(ACTION[2])) { setDefaultInput(ID()); 
    //console.log(`HERE2`);} // Updated to use the toggle function
    else if (BUTTON(ACTION[3])) { recallPreset(ID()); console.log(`HERE18`);
    console.log(`HERE17`);}

  }
});


function init(){
  xapi.status.get('SystemUnit Software Version').then((value) => {
    systemInfo.softwareVersion = value;
  });

  xapi.config.get('SystemUnit Name').then((value) => {
    if(value === ''){
        xapi.status.get('SystemUnit Hardware Module SerialNumber').then((value) => {
          systemInfo.systemName = value;
        });
    }
    else{
      systemInfo.systemName = value;
    }
  });

  xapi.status.get('SystemUnit Software ReleaseDate').then((value) => {
    systemInfo.softwareReleaseDate = value;
  });

  xapi.config.set('HttpClient Mode', 'On');
  setTimeout(() => sendSystemInfo(), 2000);

  // set the default camera presets on script start
  xapi.Command.Camera.Preset.Activate({ PresetId: '1' });
  xapi.Command.Camera.Preset.Activate({ PresetId: '2' });
}

init();

