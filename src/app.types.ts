import { useAuthState } from 'react-firebase-hooks/auth'
import { firebase } from './firebase'

export type User = ReturnType<typeof useAuthState>[0]

export type Room = {
  owner: firebase.firestore.DocumentReference<firebase.User>
  active: firebase.firestore.DocumentReference<firebase.User>
  counter: number
  created_at: firebase.firestore.Timestamp
}
