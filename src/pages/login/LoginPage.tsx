import { firebase } from '../../firebase'
import { useState } from 'react'
import { Button } from 'components'

function LoginPage() {
  const [authError, setAuthError] = useState<Error | null>(null)

  const handleSignIn = async () => {
    const provder = new firebase.auth.GoogleAuthProvider()

    try {
      await firebase.auth().signInWithPopup(provder)
    } catch (error) {
      setAuthError(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-12">
      <h1 className="text-3xl font-bold ">Team Count App</h1>
      <Button variant="filled" color="blue" size="large" onClick={handleSignIn}>
        Sign in with Google
      </Button>

      {authError && (
        <div className="text-center">
          <p>Sorry, there was a problem</p>
          <p className="italic text-rose-500">{authError.message}</p>
        </div>
      )}
    </div>
  )
}

export { LoginPage }
