import xapi from 'xapi';

function openTelehealthWebPage() {
    xapi.command('UserInterface WebView Display', {
        Url: 'https://google.com',
        Title: 'Telehealth Portal',
        //Header: 'Access the Telehealth Portal'
    }).then(() => {
        console.log("WebView opened successfully.");
    }).catch((error) => {
        console.error(`Failed to open the webpage: ${error.message}`);
    });
}

function openTelehealthWebPage2() {
    const username = 'telehealth';
    const password = 'latrobe';
    //const url = `https://${username}:${password}@telehealth.mywire.org`;
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    xapi.command('UserInterface WebView Display', {
        Url: url,
        Title: 'Telehealth Portal',
    }).then(() => {
        console.log("WebView opened successfully.");
    }).catch((error) => {
        console.error(`Failed to open the webpage: ${error.message}`);
    });
}

function closeTelehealthWebPage() {
    xapi.command('UserInterface WebView Clear').then(() => {
        console.log("WebView cleared successfully.");
    }).catch((error) => {
        console.error(`Failed to close the webpage: ${error.message}`);
    });
}

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if (event.WidgetId === 'open_telehealth' && event.Type === 'clicked') {
        openTelehealthWebPage2();
    } else if (event.WidgetId === 'close_telehealth' && event.Type === 'clicked') {
        closeTelehealthWebPage();
    }
});
