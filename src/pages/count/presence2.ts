import 'firebase/database'
import { db, firebase } from '../../firebase'
import { setTeammateStatus } from './setTeammateStatus'
import { TeamMate, TeamMateStatus } from 'app.types'

const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
}

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
}

const isOfflineForFirestore = {
  state: 'offline',
  last_changed: firebase.firestore.FieldValue.serverTimestamp(),
}

const isOnlineForFirestore = {
  state: 'online',
  last_changed: firebase.firestore.FieldValue.serverTimestamp(),
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
    const userStatusFirestoreRef = firebase
      .firestore()
      .doc(`/status/${uid}_${roomId}`)

    console.log({ uid, userStatusDatabaseRef })

    firebase
      .database()
      .ref('.info/connected')
      .on('value', (snapshot) => {
        if (snapshot.val() === false) {
          userStatusFirestoreRef.set(isOfflineForFirestore)
          return
        }

        console.log('val', snapshot.val())
        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(() => {
            userStatusDatabaseRef.set(isOnlineForDatabase)
            userStatusFirestoreRef.set(isOnlineForFirestore)
          })
      })

    firebase
      .firestore()
      .collection('status')
      .where('state', '==', 'online')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(function (change) {
          const changedUserId = getUserIdFromStatusRefName(change.doc.id)

          if (change.type === 'added') {
            var msg = 'User ' + change.doc.id + ' is online.'
            console.log(msg)
            // ...
            setTeammateStatus(team, changedUserId, 'online', roomRef)
          }
          if (change.type === 'removed') {
            var msg = 'User ' + change.doc.id + ' is offline.'
            console.log(msg)
            // ...
            setTeammateStatus(team, changedUserId, 'offline', roomRef)
          }
        })
      })

    this.isSubscribed = true
  }
}

const getUserIdFromStatusRefName = (ruid: string) => {
  // ruid format:`${user}_${roomId}
  return ruid.split('_')[0]
}
