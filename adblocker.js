chrome.storage.sync.get('adblocker', function(result) {
    if (result.adblocker){
        console.log("[Mumin tools] Ad blocker is turned on")
        function removeElement(selector) {
            try{
                var adElement = document.querySelector(selector);
                if (adElement) {
                    adElement.remove();
                    console.log('[Mumin tools] Element removed: ', selector);
                }
            }catch(error){
                console.log("[Mumin tools] Error: ",error)
            }
        }
        const clear = (async ()  => {
        const defined = v => v !== null && v !== undefined;
        const timeout = setInterval(async () => {
            var adElement = document.querySelector('ytd-ad-slot-renderer');
            if (adElement) {
                var toBeRemoved = adElement.closest('ytd-rich-item-renderer');
                if (toBeRemoved) {
                    toBeRemoved.remove();
                }
            }
            removeElement('ytd-banner-promo-renderer'); // Remove top banner
            removeElement('ytd-player-legacy-desktop-watch-ads-renderer'); // Remove top banner while playing video 1
            removeElement('ytd-action-companion-ad-renderer'); // Remove top banner while playing video 2
            removeElement('ytd-ad-slot-renderer'); // Remove ads between videos
            const ad = [...document.querySelectorAll('.ad-showing')][0];
            if (defined(ad)) {
                const adOverlay = document.querySelector('.ytp-ad-player-overlay');
                if (adOverlay) {
                    try {
                        adOverlay.style.display = 'none';
                    } catch(error){
                        console.log("[Mumin tools] ad-overlay failed to be removed", error)
                    }
                }
                const video = document.querySelector('video');
                if (defined(video)) {
                    try {
                        video.muted = true;
                        video.currentTime = video.duration;
                        var skipButton = document.querySelector('.ytp-ad-skip-button');
                        var skipButtonModern = document.querySelector('.ytp-ad-skip-button-modern');
                        if (skipButton) {
                            skipButton.click();
                        } else if (skipButtonModern) {
                            skipButtonModern.click();
                        }
                        console.log("[Mumin tools] Ad removed")
                        video.muted = false;
                    } catch(error){
                        console.log("[Mumin tools] Ad skip failed", error)
                    }
                }
            }
        }, 50);
        return function() {
            clearTimeout(timeout);
        }
        })();
    }else{console.log("Ad blocker is disabled")}
});