// Programmer: Farshad Zarean
// Date: 20230820
// Version: 1.0

import xapi from 'xapi';

const SERVER_URL = 'http://192.168.3.58:1337/api';
const DEVICE_URLS = [
  'http://192.168.3.138/',
  'http://192.168.3.151/'
];

const DEFAULT_SOURCE_HDBT = '56';
const CANVAS = '2';

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

  // Log the URL, Headers, and the JSON Message being sent
  console.log("Sending POST request to:", SERVER_URL);
  console.log("Headers:", JSON.stringify({ContentType: CONTENT_TYPE, Authorization: AUTHTOKEN}));
  console.log("Body:", JSON.stringify(message));
  
  xapi.command('HttpClient Post', { 'Header': [CONTENT_TYPE, AUTHTOKEN] , 'Url':SERVER_URL, 'AllowInsecureHTTPS': 'True'}, JSON.stringify(message));
}

function setPower(number, action){
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
    { id: '6', Name: 'PC2' },
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

function setPresentationSource(option) {
    if (option === 'default') {
        recallPreset(1);
        // Option to stop the presentation, assuming this is the "default non-choice"
        xapi.command('Presentation Stop')
            .then(() => {
                console.log('Presentation stopped.');
            })
            .catch(error => {
                console.error(`Error stopping presentation: ${error}`);
            });
    } else if (option === 'default') {
        recallPreset(2);
    } else if (option === 'PC 2 (HDMI)') {
        // Start presenting from the current connector in the predefined list
        recallPreset(4);
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

// Listen for button press event from the Extension Editor
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  // Replace 'set_screens_same' with your actual widget ID
  
});


xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.Type === 'pressed'){
    const BUTTON = (k) => { return event.WidgetId.indexOf(k) === 0 ? true : false; };
    const ID = () => event.WidgetId.match(/\d/)[0];

    if(event.WidgetId === 'webex_btn') { 
        //setPresentationSource('default');
        recallPreset(1);
        xapi.command('Presentation Stop')
          .then(() => {
            console.log('Presentation stopped.');
          })
          .catch(error => {
            console.error(`Error stopping presentation: ${error}`);
          });
        console.log(`webex_btn`);
    } else if (event.WidgetId === 'webex_btn2') {
        //setPresentationSource('default2');
        recallPreset(2);
        xapi.command('Presentation Stop')
          .then(() => {
            console.log('Presentation stopped.');
          })
          .catch(error => {
            console.error(`Error stopping presentation: ${error}`);
          });
        console.log(`webex_btn2`);
    } else if (event.WidgetId === "webex_btn_hybrid") {
        recallPreset(7);
        xapi.command('Presentation Stop')
          .then(() => {
            console.log('Presentation stopped.');
          })
          .catch(error => {
            console.error(`Error stopping presentation: ${error}`);
          });
        console.log(`webex_btn2`);
    } else if(event.WidgetId === 'widescreenPC_btn') { 
        setPresentationSource('PC 2 (HDMI)');
        const connector = predefinedSources[3];
        console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        xapi.command('Presentation Start', { ConnectorId: connector.id });
        recallPreset(4);
    } else if(event.WidgetId === 'widescreenPC_btn_sml') { 
        setPresentationSource('PC 2 (HDMI)');
        const connector = predefinedSources[3];
        console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        xapi.command('Presentation Start', { ConnectorId: connector.id });
        recallPreset(6);
    } else if(event.WidgetId === "stoppresentation_btn") {
        xapi.command('Presentation Stop')
          .then(() => {
              console.log('Presentation stopped. Cycling reset.');
          })
          .catch(error => {
              console.error(`Error stopping presentation: ${error}`);
          });
        // reset monitor roles to default and select default webex videowall preset
        xapi.Config.Video.Output.Connector[1].MonitorRole.set('First');
        xapi.Config.Video.Output.Connector[2].MonitorRole.set('Second');
        recallPreset(1);
    } else if(event.WidgetId === 'hdmi_btn') { 
        const connector = predefinedSources[2];
        console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if(event.WidgetId === 'HDMI_choice_btn') { 
        const connector = predefinedSources[2];
        console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        xapi.command('Presentation Start', { ConnectorId: connector.id });
        //recallPreset(2);
    } else if (event.WidgetId === 'pc1_btn') {
        const connector = predefinedSources[4];
        console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if(event.WidgetId === 'pc2_btn') { 
        const connector = predefinedSources[3];
        console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if(event.WidgetId === 'cam1_btn') { 
        const connector = predefinedSources[0];
        console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if(event.WidgetId === 'cam2_btn') { 
        const connector = predefinedSources[1];
        console.log(`Presentation started from '${connector.Name}' with connector ID ${connector.id}.`);
        xapi.command('Presentation Start', { ConnectorId: connector.id });
    } else if(event.WidgetId === 'codec_btn') { 
        setPresentationSource('default');
    } else if (event.WidgetId === "camera_def_btn") {
        console.log(`Selecting default camera presets 1, 2`);
        xapi.Command.Camera.Preset.Activate({ PresetId: '1' });
        xapi.Command.Camera.Preset.Activate({ PresetId: '2' });
    } else if (event.WidgetId === "camera_def_btn_audience") {
        console.log(`Selecting default camera presets 1`);
        xapi.Command.Camera.Preset.Activate({ PresetId: '1' });
    } else if (event.WidgetId === "camera_def_btn_projector_wall") {
        console.log(`Selecting default camera presets 2`);
        xapi.Command.Camera.Preset.Activate({ PresetId: '2' });
    } else if (event.WidgetId === "camera_def_btn_board_setup") {
        console.log(`Selecting default camera presets 3`);
        xapi.Command.Camera.Preset.Activate({ PresetId: '3' });
    } else if (event.WidgetId === "camera_def_btn_touch_wall") {
        console.log(`Selecting default camera presets 4`);
        xapi.Command.Camera.Preset.Activate({ PresetId: '4' });
    } else if (event.WidgetId === "flip-1") {
        xapi.Config.Video.Output.Connector[1].MonitorRole.set('First');
        xapi.Config.Video.Output.Connector[2].MonitorRole.set('Second');
        console.log(`flip 1`);
    } else if (event.WidgetId === "flip-2") {
        xapi.Config.Video.Output.Connector[1].MonitorRole.set('Second');
        xapi.Config.Video.Output.Connector[2].MonitorRole.set('First');
        console.log(`flip 2`);
    } else if (event.WidgetId === 'set_screens_same') {
        setScreensToSame();
        console.log(`setScreensToSame`);
    } else if(event.WidgetId === 'on_3_btn') { 
        setPower(1, ACTION[0]);
        setPower(2, ACTION[0]);
    } else if (event.WidgetId === 'off_3_btn') {
        setPower(1, ACTION[1]);
        setPower(2, ACTION[1]);
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

    if (BUTTON(ACTION[0])) { setPower(ID(), ACTION[0]); } 
    else if (BUTTON(ACTION[1])) { setPower(ID(), ACTION[1]); }
    else if (BUTTON(ACTION[2])) { toggleDefaultInput(); } // Updated to use the toggle function
    else if (BUTTON(ACTION[3])) { recallPreset(ID()); }
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

  xapi.Command.Camera.Preset.Activate({ PresetId: '1' });
  xapi.Command.Camera.Preset.Activate({ PresetId: '2' });
}

init();
