
// Old Google Fix
function toggleOldGoogle() {
  chrome.storage.sync.get('oldGoogle', function(result) {
      const oldGoogleValue = result.oldGoogle || false;
      const updatedValue = !oldGoogleValue;

      chrome.storage.sync.set({ 'oldGoogle': updatedValue }, function() {});
  });
}

window.addEventListener('load', function() {
  chrome.storage.sync.get('oldGoogle', function(result) {
      const oldGoogleValue = result.oldGoogle || false;
      const toggleInput = document.getElementById('oldGoogleSwitch');
      console.log(toggleInput);

      if (toggleInput) {
          toggleInput.checked = oldGoogleValue;
          toggleInput.addEventListener('click', toggleOldGoogle);
      } else {
          console.log("toggleInput is not defined");
      }
  });
});


// Pride Flag Fix
function togglePrideflag() {
  chrome.storage.sync.get('prideflag', function(result) {
      const prideflagValue = result.prideflag || false;
      const updatedValue = !prideflagValue;

      chrome.storage.sync.set({ 'prideflag': updatedValue }, function() {});
  });
}

window.addEventListener('load', function() {
  chrome.storage.sync.get('prideflag', function(result) {
      const prideflagValue = result.prideflag || false;
      const toggleInput = document.getElementById('prideSwitch');
      console.log(toggleInput);

      if (toggleInput) {
          toggleInput.checked = prideflagValue;
          toggleInput.addEventListener('click', togglePrideflag);
      } else {
          console.log("toggleInput is not defined");
      }
  });
});


// Youtube
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
      const toggleInput = document.getElementById('youtubeSwitch');
      console.log(toggleInput);

      if (toggleInput) {
          toggleInput.checked = adblockerValue;
          toggleInput.addEventListener('click', toggleAdblocker);
      } else {
          console.log("toggleInput is not defined");
      }
  });
});