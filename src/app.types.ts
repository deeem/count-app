import { useAuthState } from 'react-firebase-hooks/auth'

export type User = ReturnType<typeof useAuthState>[0]

export type Room = {
  active: any
  counter: number
  created_at: any
  owner: any
}
