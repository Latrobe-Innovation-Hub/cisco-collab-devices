import xapi from 'xapi';

function openYouTubeVideo() {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // YouTube video URL

    xapi.command('UserInterface WebView Display', {
        Url: url,
        Title: 'rick roll',
    }).then(() => {
        console.log("rick roll video opened successfully.");
    }).catch((error) => {
        console.error(`Failed to open the rick roll video: ${error.message}`);
    });
}

function closeWebView() {
    xapi.command('UserInterface WebView Clear').then(() => {
        console.log("WebView cleared successfully.");
    }).catch((error) => {
        console.error(`Failed to close the WebView: ${error.message}`);
    });
}

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if (event.WidgetId === 'open_rick_roll' && event.Type === 'clicked') {
        openYouTubeVideo();
    } else if (event.WidgetId === 'close_rick_roll' && event.Type === 'clicked') {
        closeWebView();
    }
});
