document.addEventListener('DOMContentLoaded', () => {

    let button = document.getElementById('button')

    chrome.tabs.query({ currentWindow: true, active: true },
        tabs => {
            if (tabs[0].url.includes('youtube.com')) {
                button.disabled = false;
            } else {
                button.innerText = 'Extension Disabled';
                button.classList.remove('deactivate-button');
                button.classList.add('disabled-button');
                button.disabled = true;
            }
        }
    )

    chrome.storage.sync.get('activated', state => {
        if (state !== null) {
            if (state.activated) {
                chrome.storage.sync.set({ 'activated': true });
                button.classList.remove('deactivate-button');
                button.classList.add('activate-button');
                if (!button.disabled) {
                    button.innerText = 'Activate';
                }
            } else {
                chrome.storage.sync.set({ 'activated': false });
                button.classList.remove('activate-button');
                button.classList.add('deactivate-button');
                if (!button.disabled) {
                    button.innerText = 'Deactivate';
                }
            }
        }
    })

    const changeState = () => {
        chrome.storage.sync.get('activated', state => {
            if (state.activated) {
                chrome.storage.sync.set({ 'activated': false })
                button.classList.remove('activate-button');
                button.classList.add('deactivate-button');
                button.innerText = 'Deactivate'
                chrome.tabs.query({ currentWindow: true, active: true },
                    tabs => {
                        chrome.tabs.sendMessage(tabs[0].id, 'change')
                    }
                )
            } else {
                chrome.storage.sync.set({ 'activated': true });
                button.classList.remove('deactivate-button');
                button.classList.add('activate-button');
                button.innerText = 'Activate'
                chrome.tabs.query({ currentWindow: true, active: true },
                    tabs => {
                        chrome.tabs.sendMessage(tabs[0].id, 'change')
                    }
                )
            }
        })
    }
    button.addEventListener('click', changeState, false);
}, false)