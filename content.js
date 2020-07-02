chrome.runtime.onMessage.addListener(request => {
    this.window.location = "https://www.youtube.com/"
})

const executeActions = () => {
    let feed = document.getElementsByTagName('ytd-browse');
    console.log('feed length = ' + feed.length);
    if (feed.length !== 0) {
        for (item of feed) {
            if (this.window.location == "https://www.youtube.com/") {
                item.innerHTML = null;
            }
            // "<img src=\"chrome-extension://jgldfkjkbaapobhknpdkpeaibgcpenfg/forest2.jpg\" width=\"1438\" height=\"880\">";
        };
    }
    setTimeout(() => {
        let next = document.getElementsByTagName('ytd-watch-next-secondary-results-renderer');
        console.log('this is next ' + next.length);
        if (next.length !== 0) {
            for (item of next) {
                item.innerHTML = "<div style=\"display: flex; justify-content: center;\"><h1 style=\"font-size: 72px;\">Gotchu !</h1></div>";
            };
        }
    }, 1000)
}

window.addEventListener('load', () => {
    chrome.storage.sync.get('activated', state => {
        if (state !== null) {
            if (!state.activated) {
                executeActions();
            }
        }
    })
}, false)

