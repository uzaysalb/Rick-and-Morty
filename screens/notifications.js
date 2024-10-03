import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function(notification) {
    console.log("NOTIFICATION:", notification);
  },
});

export const showNotification = () => {
  PushNotification.localNotification({
    title: "Favori Karakter",
    message: "Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.",
  });
};
