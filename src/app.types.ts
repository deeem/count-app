import { firebase } from './firebase'

export type User = {
  uid: string
  displayName: string | null
  photoURL: string | null
}

export type Room = {
  owner: User
  active: User
  counter: number
  created_at: firebase.firestore.Timestamp
}
