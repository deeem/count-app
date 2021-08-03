import { db, firebase } from '../firebase'
import { useEffect, useState } from 'react'

function useAuth() {
  const [user, setUser] = useState<Partial<firebase.UserInfo> | null>(null)

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        }

        setUser(user)

        db.collection('users').doc(user.uid).set(user, { merge: true })
      } else {
        setUser(null)
      }
    })
  }, [])

  return user
}

export { useAuth }