// frontend/utils/notifications.js
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// Ask for permission
export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Schedule notification
export async function scheduleReminder(task) {
  const reminderTime = new Date(task.startTime);
  reminderTime.setMinutes(reminderTime.getMinutes() - 15); // 15 minutes before

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '⏰ Upcoming Task Reminder',
      body: `${task.description} starts in 15 minutes!`,
    },
    trigger: reminderTime,
  });
}
