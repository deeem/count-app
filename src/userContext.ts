import { User } from 'app.types'
import React from 'react'

export const UserContex = React.createContext<User>({
  uid: '',
  displayName: '',
  photoURL: '',
})
