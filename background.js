// background.js

// Set or reset the alarm when the user sets a new interval
function setReminderAlarm() {
    chrome.storage.sync.get(['reminderInterval'], (result) => {
      let interval = result.reminderInterval || 1; // Default to 1 minute if no value is set
      chrome.alarms.create('drinkWaterAlarm', { delayInMinutes: interval, periodInMinutes: interval });
    });
  }
  
  // Initialize the alarm when the extension is installed or reloaded
  chrome.runtime.onInstalled.addListener(() => {
    setReminderAlarm();
  });
  
  // Listen for changes in the reminder interval and update the alarm
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.reminderInterval) {
      chrome.alarms.clear('drinkWaterAlarm', setReminderAlarm); // Reset the alarm with new interval
    }
  });
  
  // Handle alarm event
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'drinkWaterAlarm') {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Reminder',
        message: 'Time to drink water!',
        priority: 2
      });
    }
  });
  