// Programmer: Farshad Zarean
// Date: 20230820
// Vesrion: 1.0

import xapi from 'xapi';

const SERVER_URL = 'http://192.168.3.58:1337/api';
const DEVICE_URLS = [
  'http://192.168.3.132/'
];

const DEFAULT_SOURCE_HDBT = '56';
const CANVAS = '3';

const ACTION = ['on', 'off', 'input', 'preset'];
const CONTENT_TYPE = 'Content-Type:application/json';
const ACCEPT_TYPE = 'Accept:application/json';
const AUTHTOKEN = 'Authorization:WkFSRUFOIElORFVTVFJJRVM=';

var systemInfo = {
    softwareVersion : '',
    systemName : '',
    softwareReleaseDate : ''
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
  
  xapi.command('HttpClient Post', { 'Header': [CONTENT_TYPE, AUTHTOKEN] , 'Url':SERVER_URL, 'AllowInsecureHTTPS': 'True'}, JSON.stringify(message));
}

function setPower(number, action){
  var url = DEVICE_URLS[number-1] + 'api/v01/contentmgr/remote/power/' + action;
  
  xapi.command('HttpClient Get', { 'Header': [CONTENT_TYPE] , 'Url':url, 'AllowInsecureHTTPS': 'True'});
}

function setDefaultInput(number){
  var url = DEVICE_URLS[number-1] + 'api/v02/contentmgr/remote/source';
  var message = {
    'source_id': DEFAULT_SOURCE_HDBT
  };
  
  xapi.command('HttpClient Put', { 'Header': [CONTENT_TYPE] , 'Url':url, 'AllowInsecureHTTPS': 'True'}, JSON.stringify(message));
}

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.Type === 'pressed'){
    const BUTTON = (k) => { return event.WidgetId.indexOf(k) === 0 ? true : false; };
    const ID = () => event.WidgetId.match(/\d/)[0];
    
    if (event.WidgetId === 'dark-mode-btn') {
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
    else if (BUTTON(ACTION[0])) { setPower(ID(), ACTION[0]); } 
    else if (BUTTON(ACTION[1])) { setPower(ID(), ACTION[1]); }
    else if (BUTTON(ACTION[2])) { setDefaultInput(ID()); }
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

  setTimeout( () => sendSystemInfo(), 2000);
}

init();
