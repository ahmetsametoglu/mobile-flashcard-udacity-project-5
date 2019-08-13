import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export const getCardCountText = (cardCount: number): string => {
  switch (cardCount) {
    case 0:
      return "no card";
    case 1:
      return "1 card";
    default:
      return `${cardCount} cards`;
  }
};

export class NotificationHelper {
  static NOTIFICATION_KEY = "FlashCards:notifications";
  static createNotification = () => {
    return {
      title: "Test your self!",
      body: "don't forget to study with flashcards !",
      ios: {
        sound: true
      },
      android: {
        sound: true,
        priority: "high",
        sticky: false,
        vibrate: true
      }
    };
  };

  public static clearLocalNotification = () => {
    return AsyncStorage.removeItem(NotificationHelper.NOTIFICATION_KEY).then(
      Notifications.cancelAllScheduledNotificationsAsync
    );
  };

  public static setLocalNotification = () => {
    AsyncStorage.getItem(NotificationHelper.NOTIFICATION_KEY).then(data => {
      const today = new Date().toDateString();
      if (data === null || data !== today) {
        console.log("notification creating...");

        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          console.log("Permissions.NOTIFICATIONS status:", status);

          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(
              NotificationHelper.createNotification(),
              {
                time: tomorrow,
                repeat: "day"
              }
            );

            AsyncStorage.setItem(NotificationHelper.NOTIFICATION_KEY, today);
          }
        });
      }
    });
  };
}
