import 'firebase/database'
import { firebase } from '../../firebase'
import { TeamMate } from 'app.types'

const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
}

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
}

export class PresenceSubscriber {
  private static instance: PresenceSubscriber

  private isSubscribed = false

  private constructor() {}

  public static getInstance(): PresenceSubscriber {
    if (!PresenceSubscriber.instance) {
      PresenceSubscriber.instance = new PresenceSubscriber()
    }

    return PresenceSubscriber.instance
  }

  public subscribe(
    team: TeamMate[],
    roomRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
    roomId: string
  ) {
    if (this.isSubscribed) return

    const uid = firebase.auth().currentUser?.uid
    const userStatusDatabaseRef = firebase
      .database()
      .ref(`/status/${uid}_${roomId}`)

    firebase
      .database()
      .ref('.info/connected')
      .on('value', (snapshot) => {
        if (snapshot.val() === false) {
          return
        }

        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(() => {
            userStatusDatabaseRef.set(isOnlineForDatabase)
          })
      })

    this.isSubscribed = true
  }
}
