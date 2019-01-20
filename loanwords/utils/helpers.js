import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

export const LOANWORDS_STORAGE_KEY = "@LoanWordsStorage:key";
export const LOANWORDS_CARDS_STATE_STORAGE_KEY = "@LoanWordsCardsState:key";
export const LOANWORDS_NOTIFICATION_KEY = "@LoanWordsStorage:notifications";

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(req => {
    return JSON.parse(req);
  });
}

export function getDeck(key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(req => JSON.parse(req))
    .then(json => {
      return json[key];
    });
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function saveCurrentCardsState(currState) {
  console.log("Saving state ...");
  return AsyncStorage.setItem(
    LOANWORDS_CARDS_STATE_STORAGE_KEY,
    JSON.stringify(currState)
  )
    .then(res => {
      console.log("Successfully saved state: " + JSON.stringify(res));
    })
    .catch(err => {
      console.log("Error: " + JSON.stringify(err));
    });
}

export function getSavedCardsState() {
  return AsyncStorage.getItem(LOANWORDS_CARDS_STATE_STORAGE_KEY).then(res =>
    JSON.parse(res)
  );
}

function createNotification() {
  return {
    title: "Ein neues Fremdwort wartet auf dich ...",
    body: "Öffne die App und lerne ein neues Wort!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "low",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(req => JSON.parse(req))
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(18);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
