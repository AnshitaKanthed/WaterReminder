// popup.js

// Load the current reminder interval from storage
chrome.storage.sync.get(['reminderInterval'], (result) => {
    document.getElementById('interval').value = result.reminderInterval || 1;
  });
  
  // Save the new reminder interval when the user clicks the button
  document.getElementById('setReminder').addEventListener('click', () => {
    const interval = parseInt(document.getElementById('interval').value, 10);
  
    if (interval > 0) {
      chrome.storage.sync.set({ reminderInterval: interval }, () => {
        chrome.alarms.clear('drinkWaterAlarm', () => {
          chrome.alarms.create('drinkWaterAlarm', { delayInMinutes: interval, periodInMinutes: interval });
        });
        alert('Reminder interval set to ' + interval + ' minute(s).');
      });
    } else {
      alert('Please enter a valid interval greater than 0.');
    }
  });
  