chrome.storage.sync.get('oldGoogle', function(result) {
  if (result.oldGoogle){
      console.log("[Mumin tools] Old Google Fix is turned on")
      if (window.location.hostname.startsWith("www.google.com")) {
        let currentUrl = window.location.href;
        if (!currentUrl.includes("&udm=14")) {
            let newUrl = currentUrl.includes('?') ? `${currentUrl}&udm=14` : `${currentUrl}?udm=14`;
            window.location.href = newUrl;
        }
      }
  }else{
      console.log("[Mumin tools] Old Google Fix is disabled")
  }
});