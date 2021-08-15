import { firebase } from './firebase'

export type User = {
  uid: string
  displayName: string | null
  photoURL: string | null
}

export type TeamMateStatus = 'active' | 'ready' | 'away'

export type TeamMate = Partial<User> & {
  status: TeamMateStatus
}

export type Room = {
  owner: User
  active: User
  team: TeamMate[]
  counter: number
  created_at: firebase.firestore.Timestamp
}
