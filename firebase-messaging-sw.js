// Notifications de la version web (Firebase Cloud Messaging).
// Le navigateur lance ce fichier en arrière-plan : il affiche les
// notifications quand le site est fermé, et ouvre le bon écran au toucher.
// La configuration ci-dessous n'est pas secrète (identifiants publics du site).

importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAcus4Ksm--wz4-f598HgqxxrmXqg6OfHU',
  authDomain: 'asvm-partenaires.firebaseapp.com',
  projectId: 'asvm-partenaires',
  storageBucket: 'asvm-partenaires.firebasestorage.app',
  messagingSenderId: '841108259787',
  appId: '1:841108259787:web:ab73399f75beaa87f5ac4e',
});

// Firebase affiche lui-même la notification (titre et texte envoyés).
firebase.messaging();

// Notification touchée : on ouvre (ou on remet devant) l'appli sur le bon écran.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const donnees = (event.notification.data && event.notification.data.FCM_MSG &&
    event.notification.data.FCM_MSG.data) || {};
  const base = self.registration.scope;
  const ecran = donnees.ecran === 'comptes' ? '#/admin/comptes' : '#/evenements';
  const adresse = base + ecran;
  event.waitUntil((async () => {
    const fenetres = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const f of fenetres) {
      if (f.url.startsWith(base)) {
        await f.focus();
        return f.navigate(adresse);
      }
    }
    return clients.openWindow(adresse);
  })());
});
