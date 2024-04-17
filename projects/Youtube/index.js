function toggleAdblocker() {
  chrome.storage.sync.get('adblocker', function(result) {
      const adblockerValue = result.adblocker || false;
      const updatedValue = !adblockerValue;

      chrome.storage.sync.set({ 'adblocker': updatedValue }, function() {});
  });
}

window.addEventListener('load', function() {
  chrome.storage.sync.get('adblocker', function(result) {
      const adblockerValue = result.adblocker || false;
      const toggleInput = document.getElementById('toggleSwitch');
      console.log(toggleInput);

      if (toggleInput) {
          toggleInput.checked = adblockerValue;
          toggleInput.addEventListener('click', toggleAdblocker);
      } else {
          console.log("toggleInput is not defined");
      }
  });
});