// background.js

const motivationalQuotes = [
  "Great job! Keep it up.",
  "You’re doing great! Drink more water.",
  "Hydration is key to a healthy body!",
  "Keep going! Your body loves water.",
  "Stay hydrated, stay healthy!",
  "Water is the best beauty treatment.",
  "Drink more water, feel the difference!",
  "Hydrate to dominate your day!"
];
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
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'water.jpg',
        title: 'Reminder',
        message: `Time to drink water! ${randomQuote}`,
        priority: 2
      });
    }
  });
  